import fetch from 'node-fetch';
import logger from '../utils/logger.js';
import { cleanResponse } from '../utils/messageUtils.js';
import { messages } from '../utils/messageUtils.js';

export class ApiService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async sendMessage(userInput) {
    try {
      const encodedInput = encodeURIComponent(userInput);
      const url = `${this.apiEndpoint}?user_input=${encodedInput}`;
      logger.info(`Sending request to API: ${url}`);

      const response = await fetch(url, { timeout: 10000 });
      const rawResponse = await response.text();
      
      // Clean the response before any further processing
      const cleanedResponse = cleanResponse(rawResponse);
      
      // Log the raw response for debugging
      logger.debug(`Raw API response: ${rawResponse}`);
      // Log the cleaned response
      logger.info(`Processed response: ${cleanedResponse}`);
      
      return cleanedResponse || messages.noResponse;
      
    } catch (error) {
      if (error.type === 'request-timeout') {
        logger.error('Request timed out');
        return messages.timeout;
      }
      
      logger.error(`API error: ${error.message}`);
      return messages.unknownError;
    }
  }
}