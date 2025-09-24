import React from 'react';
import type { Tab } from '../types';
import { ChartBarIcon, ChatBubbleLeftRightIcon, EyeIcon } from './icons';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabConfig = {
    dashboard: { label: 'Analytics Dashboard', icon: ChartBarIcon },
    coach: { label: 'AI Coach', icon: ChatBubbleLeftRightIcon },
    transparency: { label: 'Transparency Center', icon: EyeIcon },
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex items-center space-x-2 border-b border-slate-200">
      {Object.keys(tabConfig).map((tabKey) => {
        const tab = tabConfig[tabKey as Tab];
        const isActive = activeTab === tabKey;
        return (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey as Tab)}
            className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-colors
              ${isActive
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};