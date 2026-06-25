import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load env before anything else
dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });

import { streamText, stepCountIs, tool } from 'ai';
import { getGoogleModel } from '../lib/ai';
import { getCorsairAiTools } from '../lib/ai-tools';
import { z } from 'zod';

function convertClientMessagesToCoreMessages(messages: any[]): any[] {
  const coreMessages: any[] = [];

  for (const m of messages) {
    if (m.role === 'user') {
      coreMessages.push({ role: 'user', content: m.content });
    } else if (m.role === 'system') {
      coreMessages.push({ role: 'system', content: m.content });
    } else if (m.role === 'assistant') {
      const hasToolCalls = m.toolInvocations && m.toolInvocations.length > 0;
      
      if (!hasToolCalls) {
        coreMessages.push({ role: 'assistant', content: m.content || '' });
      } else {
        const assistantContent: any[] = [];
        if (m.content) {
          assistantContent.push({ type: 'text', text: m.content });
        }
        
        for (const call of m.toolInvocations) {
          assistantContent.push({
            type: 'tool-call',
            toolCallId: call.toolCallId,
            toolName: call.toolName,
            args: call.args
          });
        }
        
        coreMessages.push({ role: 'assistant', content: assistantContent });
        
        const toolResults = m.toolInvocations
          .filter((t: any) => t.state === 'result' || t.result !== undefined)
          .map((t: any) => ({
            type: 'tool-result',
            toolCallId: t.toolCallId,
            toolName: t.toolName,
            result: t.result
          }));
          
        if (toolResults.length > 0) {
          coreMessages.push({ role: 'tool', content: toolResults });
        }
      }
    }
  }

  return coreMessages;
}

async function main() {
  // Dynamically import prisma to ensure the adapter pool connects correctly with env variables loaded
  const { prisma } = await import('../lib/db');

  const convId = 'chat-1782369935129';
  const userId = 'JYAmUlIotAqAFMpxxZNXkduxnh4EhmQA'; // Edu Sphere

  try {
    const dbMessages = await prisma.message.findMany({
      where: { conversationId: convId },
      orderBy: { timestamp: 'asc' }
    });

    console.log(`Found ${dbMessages.length} messages in database.`);
    
    // Map database messages to client-side format
    // Note: Since DB doesn't store toolInvocations directly, we simulate the client-side messages.
    // Wait! Let's mock a message history that actually has some toolCalls to test.
    const clientMessages = [
      { role: 'user', content: 'check if something is importnt' },
      { role: 'assistant', content: 'Looking at your recent emails, the most important one appears to be from Priyanshu Anand regarding a "Meeting tomorrow" at 1:00 PM. Would you like me to look into your calendar to see your schedule for tomorrow, or draft a reply to that email for you?' },
      { role: 'user', content: 'reply i dont want to come to you stupid meeting' },
      { 
        role: 'assistant', 
        content: "I've drafted a reply...",
        toolInvocations: [
          {
            state: 'result',
            toolCallId: 'call_draft_email_1',
            toolName: 'draft_email',
            args: { to: 'priyanshu82711@gmail.com', subject: 'Re: Meeting tomorrow', body: 'I won\'t be able to attend the meeting tomorrow.' },
            result: { success: true }
          }
        ]
      },
      { role: 'user', content: 'set a remainder for tommeror excersize' },
      {
        role: 'assistant',
        content: "I've drafted a calendar event...",
        toolInvocations: [
          {
            state: 'result',
            toolCallId: 'call_draft_calendar_1',
            toolName: 'draft_calendar_event',
            args: { title: 'Exercise', startTime: '2026-06-26T08:00:00', endTime: '2026-06-26T09:00:00' },
            result: { success: true }
          }
        ]
      },
      { role: 'user', content: 'mail priyanshu that to shift the meeting to 26th at 6' }
    ];

    const coreMessages = convertClientMessagesToCoreMessages(clientMessages);
    console.log('\nConverted Core Messages:');
    console.log(JSON.stringify(coreMessages, null, 2));

    console.log('\nRunning streamText simulation...');
    const model = await getGoogleModel();
    const rawAiTools = getCorsairAiTools(userId);
    const aiTools = {
      ...rawAiTools,
      draft_email: tool({
        description: 'Use this tool to draft an email when the user wants to send an email or message via Gmail.',
        inputSchema: z.object({
          to: z.string(),
          subject: z.string(),
          body: z.string(),
          threadId: z.string().optional()
        }),
        execute: async (args: any) => args
      }),
      draft_calendar_event: tool({
        description: 'Use this tool to draft a Google Calendar event.',
        inputSchema: z.object({
          title: z.string(),
          startTime: z.string(),
          endTime: z.string(),
          attendees: z.array(z.string()).optional()
        }),
        execute: async (args: any) => args
      })
    };

    const result = await streamText({
      model,
      system: 'You are ArgonAI, an AI-powered workspace assistant. CRITICAL: When the user wants to draft or send an email, you MUST call the "draft_email" tool to present a draft card. When the user wants to schedule, create, or book a calendar event, you MUST call the "draft_calendar_event" tool to present the event details.',
      messages: coreMessages,
      tools: aiTools,
      stopWhen: stepCountIs(10)
    });

    console.log('StreamText response:');
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\nDone!');

  } catch (err: any) {
    console.error('Error during simulation:', err.stack || err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
