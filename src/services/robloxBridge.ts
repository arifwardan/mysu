let messages: {
  author: string;
  content: string;
  timestamp: number;
}[] = [];

export function addMessage(author: string, content: string) {
  messages.push({
    author,
    content,
    timestamp: Date.now(),
  });

  // Maksimal 100 pesan
  if (messages.length > 100) {
    messages.shift();
  }
}

export function getMessages(after: number) {
  return messages.filter((m) => m.timestamp > after);
}