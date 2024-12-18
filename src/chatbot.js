import TelegramBot from 'node-telegram-bot-api';
import logger from './utils/logger.js';
import { MessageHandler } from './handlers/messageHandler.js';
import { ApiService } from './services/apiService.js';

export class Chatbot {
  constructor(telegramToken, apiEndpoint) {
    this.bot = new TelegramBot(telegramToken, { polling: true });
    this.apiService = new ApiService(apiEndpoint);
    this.messageHandler = new MessageHandler(this.bot, this.apiService);
    
    logger.info('Initializing Chatbot');
    this.registerHandlers();
  }

  registerHandlers() {
    this.bot.onText(/\/start/, this.messageHandler.handleStart.bind(this.messageHandler));
    this.bot.onText(/\/help/, this.messageHandler.handleHelp.bind(this.messageHandler));
    this.bot.on('message', this.messageHandler.handleMessage.bind(this.messageHandler));
  }
}