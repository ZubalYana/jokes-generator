const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

bot.on('callback_query', async (callbackQuery) => {
    const { data, message } = callbackQuery;
    const chatId = message.chat.id;
    const messageId = message.message_id;

    const [action, jokeId] = data.split('_');

    if (action === 'verify') {
        try {
            const res = await axios.post('http://localhost:5000/verify', { jokeId });
            await bot.editMessageText(`✅ Joke verified:\n\n${res.data.joke.jokeText}`, {
                chat_id: chatId,
                message_id: messageId,
            });
        } catch (error) {
            console.error('Verification error:', error.message);
            await bot.sendMessage(chatId, '❌ Failed to verify the joke. It might already be verified or does not exist.');
        }
    }

    if (action === 'reject') {
        try {
            const res = await axios.post('http://localhost:5000/reject', { jokeId });
            await bot.editMessageText(`❌ Joke rejected:\n\n${res.data.joke?.jokeText || 'Joke removed.'}`, {
                chat_id: chatId,
                message_id: messageId,
            });
        } catch (error) {
            console.error('Rejection error:', error.message);
            await bot.sendMessage(chatId, '⚠️ Failed to reject the joke.');
        }
    }

    await bot.answerCallbackQuery(callbackQuery.id);
});

module.exports = bot;
