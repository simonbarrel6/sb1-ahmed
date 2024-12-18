import { Chatbot } from './src/chatbot.js';
import { TELEGRAM_TOKEN, API_ENDPOINT } from './src/config.js';
import logger from './src/utils/logger.js';

const chatbot = new Chatbot(TELEGRAM_TOKEN, API_ENDPOINT);
logger.info('Bot is running...');