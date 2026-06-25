import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load local env files first before importing any module
const envFiles = ['.env.local', '.env', '.env.production'];
for (const file of envFiles) {
  const p = path.resolve(process.cwd(), file);
  if (fs.existsSync(p)) {
    dotenv.config({ path: p, override: true });
    if (process.env.DATABASE_URL) {
      console.log(`Loaded environment from ${file}. URL host: ${process.env.DATABASE_URL.split('@')[1] || 'unknown'}`);
      break;
    }
  }
}

async function main() {
  const { prisma } = await import('../lib/db');
  const { getGoogleModel } = await import('../lib/ai');
  const { getCorsairAiTools } = await import('../lib/ai-tools');
  const { streamText, stepCountIs, tool } = await import('ai');
  const { z } = await import('zod');

  // Find Edu Sphere user
  const user = await prisma.user.findFirst({
    where: { email: 'eduspherepu@gmail.com' }
  });

  if (!user) {
    console.error('User eduspherepu@gmail.com not found in DB!');
    return;
  }

  console.log(`Found user: ${user.name} (${user.id})`);

  // Let's check integration accounts
  const accounts = await prisma.corsairAccount.findMany({
    where: { tenantId: user.id },
    include: { integration: true },
  });
  console.log(`Found ${accounts.length} integration accounts:`, accounts.map(a => a.integration.name));

  const hasGmail = accounts.some((a) => a.integration.name === "gmail");
  const hasCalendar = accounts.some((a) => a.integration.name === "googlecalendar");

  const rawAiTools = getCorsairAiTools(user.id);
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

  const model = await getGoogleModel();

  console.log('Successfully loaded model and tools. Testing streamText call with empty/simple messages...');
  
  const result = await streamText({
    model,
    system: 'You are ArgonAI, an AI-powered workspace assistant.',
    messages: [{ role: 'user', content: 'hello' }],
    tools: aiTools,
    stopWhen: stepCountIs(10)
  });

  console.log('Stream response:');
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Error in main:', err.stack || err);
});
