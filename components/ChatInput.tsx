
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask for financial advice..."
        disabled={isLoading}
        className="w-full bg-white border border-slate-300 rounded-full py-3 pl-6 pr-16 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        <SendIcon className="h-5 w-5" />
      </button>
    </form>
  );
};