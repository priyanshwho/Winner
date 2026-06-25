import { convertToModelMessages } from 'ai';

const sampleMessages: any[] = [
  { id: '1', role: 'user', content: 'hello' },
  { 
    id: '2', 
    role: 'assistant', 
    content: "I've drafted it.",
    toolInvocations: [
      {
        state: 'result',
        toolCallId: 'call_1',
        toolName: 'draft_email',
        args: { to: 'test@example.com', subject: 'hello', body: 'world' },
        result: { success: true }
      }
    ]
  },
  { id: '3', role: 'user', content: 'send it' }
];

console.log('Built-in convertToModelMessages:');
try {
  const result = convertToModelMessages(sampleMessages);
  console.log(JSON.stringify(result, null, 2));
} catch (err: any) {
  console.error('Error:', err.message);
}
