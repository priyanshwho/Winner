import { streamText, stepCountIs } from 'ai';
import { googleModel } from '@/lib/ai';
import { getCorsairAiTools } from '@/lib/ai-tools';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/db';

function getMessageText(message: any): string {
  if (typeof message.content === 'string' && message.content) {
    return message.content;
  }
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('');
  }
  return message.content || '';
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages, conversationId } = await req.json();

  // Ensure conversation exists and save the user message to keep database in sync
  if (conversationId && messages && messages.length > 0) {
    try {
      let conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            id: conversationId,
            userId: session.user.id,
            title: getMessageText(messages[0]).slice(0, 50) || 'New Conversation',
          },
        });
      }

      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'user') {
        await prisma.message.create({
          data: {
            conversationId,
            role: 'user',
            content: getMessageText(lastMessage),
          },
        });
      }
    } catch (err) {
      console.error('Failed to sync conversation/message to database:', err);
    }
  }

  const aiTools = getCorsairAiTools(session.user.id);
  const coreMessages = (messages || []).map((m: any) => ({
    role: m.role,
    content: getMessageText(m),
  }));

  const result = streamText({
    model: googleModel,
    system: `You are Atria, an AI-powered workspace assistant. 
You manage the user's Gmail and Google Calendar.
You can read their emails, draft responses, find calendar availability, and schedule meetings.
Be concise, helpful, and professional.

To fetch and modify emails and calendar events, you MUST use the "run_script" tool. 
The "run_script" tool takes a JavaScript code string to execute.
The "corsair" client variable is ALREADY in scope and pre-scoped to the user's tenant (do not call .withTenant).

Always use the local cache DATABASE (.db client) instead of the live API (.api client) when listing/querying to avoid rate limits, unless you specifically need to write/create a live event or send a live email.

OPERATIONS GUIDE:
1. List Gmail messages (cached DB):
   const messages = await corsair.gmail.db.messages.list({});
   return messages;
   // Each message data has structure: { id, data: { snippet, payload: { headers: [{name, value}] }, internalDate } }
   
2. Search Gmail messages:
   const messages = await corsair.gmail.db.messages.search({ data: { snippet: { contains: "searchTerm" } } });
   return messages;

3. List Calendar events (cached DB):
   const events = await corsair.googlecalendar.db.events.list({});
   return events;

4. Create Calendar event (live API):
   const result = await corsair.googlecalendar.api.events.create({
     event: {
       summary: "Meeting Title",
       start: { dateTime: new Date("2026-06-19T10:00:00").toISOString(), timeZone: "Asia/Kolkata" },
       end: { dateTime: new Date("2026-06-19T11:00:00").toISOString(), timeZone: "Asia/Kolkata" },
       attendees: [{ email: "guest@example.com" }]
     }
   });
   return result;

5. Send Email (live API):
   const emailLines = [
     "To: recipient@example.com",
     "Subject: Email Subject Line",
     "",
     "Email message body content."
   ];
   const emailContent = emailLines.join("\\r\\n");
   const base64Safe = Buffer.from(emailContent).toString('base64').replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
   const result = await corsair.gmail.api.users.messages.send({ message: { raw: base64Safe } });
   return result;

Always write return statements inside your "run_script" code, e.g.:
"return await corsair.gmail.db.messages.list({});"`,
    messages: coreMessages,
    tools: aiTools,
    stopWhen: stepCountIs(10),
    async onFinish({ text }) {
      if (conversationId && text) {
        try {
          await prisma.message.create({
            data: {
              conversationId,
              role: 'assistant',
              content: text,
            }
          });
        } catch (err) {
          console.error('Failed to save assistant message to database:', err);
        }
      }
    }
  });

  return result.toUIMessageStreamResponse();
}


