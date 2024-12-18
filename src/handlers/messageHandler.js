import logger from '../utils/logger.js';
import { messages, isExitCommand } from '../utils/messageUtils.js';

export class MessageHandler {
  constructor(bot, apiService) {
    this.bot = bot;
    this.apiService = apiService;
  }

  async handleStart(msg) {
    await this.bot.sendMessage(msg.chat.id, messages.welcome);
    logger.info(`Sent welcome message to user ${msg.from.id}`);
  }

  async handleHelp(msg) {
    await this.bot.sendMessage(msg.chat.id, messages.help);
    logger.info(`Sent help message to user ${msg.from.id}`);
  }

  async handleMessage(msg) {
    if (!msg.text) return;
    if (msg.text.startsWith('/')) return;

    const userInput = msg.text;
    const userId = msg.from.id;
    const chatId = msg.chat.id;

    logger.info(`Received message from user ${userId}: ${userInput}`);

    if (isExitCommand(userInput)) {
      await this.bot.sendMessage(chatId, messages.farewell);
      logger.info(`User ${userId} ended the chat`);
      return;
    }

    try {
      const response = await this.apiService.sendMessage(userInput);
      // Double-check cleaning before sending
      const finalResponse = response.includes('[Ahmed]') ? 
        response.replace(/\[Ahmed\][،,.:!؟\s]*/gi, '') : response;
      
      await this.bot.sendMessage(chatId, finalResponse);
      logger.info(`Sent response to user ${userId}: ${finalResponse}`);
    } catch (error) {
      logger.error(`Error handling message from user ${userId}: ${error.message}`);
      await this.bot.sendMessage(chatId, messages.error);
    }
  }
}