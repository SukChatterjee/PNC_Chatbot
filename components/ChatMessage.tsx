
import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import { UserIcon, BotIcon } from './icons';

interface ChatMessageProps {
  message: Message;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-3 animate-pulse">
        <div className="flex-shrink-0">
            <BotIcon className="h-8 w-8 text-slate-400" />
        </div>
        <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-slate-300 rounded-full"></div>
            <div className="h-3 w-3 bg-slate-300 rounded-full animation-delay-200"></div>
            <div className="h-3 w-3 bg-slate-300 rounded-full animation-delay-400"></div>
        </div>
    </div>
);


const MessageContent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  const wrapperClasses = isUser ? 'flex justify-end' : 'flex';
  const messageClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none'
    : 'bg-slate-200 text-slate-700 rounded-bl-none';
  const icon = isUser ? <UserIcon className="h-8 w-8 text-slate-500" /> : <BotIcon className="h-8 w-8 text-blue-600" />;

  return (
    <div className={`w-full max-w-2xl mx-auto ${wrapperClasses}`}>
        <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="flex-shrink-0">{icon}</div>
            <div
                className={`p-4 rounded-xl shadow-sm prose prose-p:my-0 ${messageClasses}`}
                style={{ whiteSpace: 'pre-wrap' }}
            >
                <p>{message.text}</p>
            </div>
        </div>
    </div>
  );
};

export const ChatMessage = Object.assign(MessageContent, { Loading: LoadingIndicator });