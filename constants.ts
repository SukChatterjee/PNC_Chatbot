import type { Message } from './types';
import { Sender } from './types';

export const initialBotMessage: Message = {
    id: Date.now(),
    text: "Welcome to your AI Coach. I have access to all the data on your Analytics Dashboard. Ask me for specific advice on improving cash flow, managing expenses, or planning for future growth.",
    sender: Sender.AI,
};