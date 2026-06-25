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

const sampleMessages = [
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

console.log('Testing custom converter...');
const result = convertClientMessagesToCoreMessages(sampleMessages);
console.log('Result:', JSON.stringify(result, null, 2));
