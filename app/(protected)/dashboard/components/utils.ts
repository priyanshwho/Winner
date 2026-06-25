export function getMessageText(message: any): string {
  if (typeof message.content === "string") {
    return message.content;
  }
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("");
  }
  return message.content || "";
}

export function formatDateTimeLocal(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

export function cleanErrorMessage(message: string): string {
  if (!message) return '';
  if (message.includes('Account not found for tenant') && message.toLowerCase().includes('gmail')) {
    return 'You have to connect your Gmail first.';
  }
  if (message.includes('Account not found for tenant') && message.toLowerCase().includes('calendar')) {
    return 'You have to connect your Google Calendar first.';
  }
  if (message.includes('Account not found for tenant')) {
    return 'You have to connect your account integration first.';
  }
  return message;
}
