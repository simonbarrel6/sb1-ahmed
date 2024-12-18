export const cleanResponse = (response) => {
  if (!response) return '';
  
  let cleaned = response.trim();
  
  // Handle escaped newlines first
  cleaned = cleaned.replace(/\\n/g, '\n');
  
  // Remove [Ahmed] prefix with any following punctuation
  cleaned = cleaned.replace(/^\[Ahmed\][،,.:!؟\s]*/i, '');
  cleaned = cleaned.replace(/\[Ahmed\][،,.:!؟\s]*/gi, '');
  
  // Remove HTML entities
  cleaned = cleaned.replace(/&#x[0-9A-F]{4};/gi, '');
  
  // Convert Unicode emoji entities
  cleaned = cleaned.replace(/\\u[\dA-F]{4}/gi, match => 
    String.fromCharCode(parseInt(match.replace('\\u', ''), 16))
  );
  
  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  // Remove any remaining square brackets content
  cleaned = cleaned.replace(/\[[^\]]+\]/g, '');
  
  return cleaned;
};

export const isExitCommand = (text) => {
  const exitCommands = ['exit', 'quit', 'bye'];
  return exitCommands.includes(text.toLowerCase());
};

export const messages = {
  welcome: "Hello! I'm your friendly chatbot. Send me a message, and I'll respond appropriately.\nType /help to see available commands.",
  help: "Sure! Here are the things I can do:\n" +
        "- Respond to your messages based on an external API.\n" +
        "- Understand basic commands like /start and /help.\n" +
        "- You can type 'exit', 'quit', or 'bye' anytime to end the chat.",
  farewell: "Goodbye! Have a great day! 👋",
  error: "Sorry, I'm experiencing some issues right now. Please try again later.",
  timeout: "Sorry, the request timed out. Please try again.",
  unknownError: "Sorry, an unexpected error occurred.",
  noResponse: "I'm not sure how to respond to that."
};