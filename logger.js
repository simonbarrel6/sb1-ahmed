import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'telegram_chatbot.log',
      level: 'info'
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'info'
    })
  ]
});

export default logger;