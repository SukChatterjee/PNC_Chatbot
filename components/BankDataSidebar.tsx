import React from 'react';
import type { BankData } from '../types';
import { BanknotesIcon, ChartPieIcon, SwatchIcon, WalletIcon } from './icons';

interface BankDataSidebarProps {
  data: BankData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const BankDataSidebar: React.FC<BankDataSidebarProps> = ({ data }) => {
  return (
    <aside className="w-[350px] bg-gray-900/80 border-r border-gray-700/50 p-6 flex-shrink-0 overflow-y-auto">
      <h2 className="text-2xl font-bold text-center text-gray-200 mb-8">Financial Snapshot</h2>
      
      <div className="space-y-6">
        {/* Accounts */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
            <WalletIcon className="h-5 w-5 mr-2" />
            Accounts
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">{data.checkingAccount.name}</p>
              <p className="text-2xl font-semibold text-white">{formatCurrency(data.checkingAccount.balance)}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">{data.savingsAccount.name}</p>
              <p className="text-2xl font-semibold text-white">{formatCurrency(data.savingsAccount.balance)}</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
            <SwatchIcon className="h-5 w-5 mr-2" />
            Recent Transactions
          </h3>
          <ul className="space-y-2 text-sm">
            {data.recentTransactions.map(tx => (
              <li key={tx.id} className="flex justify-between bg-gray-800/50 p-2 rounded">
                <div>
                  <p className="text-gray-200">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
                <p className={`font-medium ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Investments */}
        <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                <ChartPieIcon className="h-5 w-5 mr-2" />
                Investments
            </h3>
            <div className="space-y-3">
                {data.investments.map(inv => (
                    <div key={inv.id} className="bg-gray-800/50 p-3 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-200">{inv.name}</p>
                            <p className="text-xs text-gray-400">{inv.type}</p>
                        </div>
                        <p className="text-lg font-semibold text-white">{formatCurrency(inv.value)}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </aside>
  );
};
