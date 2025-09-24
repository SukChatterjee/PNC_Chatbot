import React from 'react';

interface HeaderProps {
  companyName: string;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({ companyName, lastUpdated }) => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{companyName}</h1>
        <p className="text-slate-500 mt-1">Explainable AI Financial Analysis</p>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
         <div className="text-right">
            <p className="text-sm font-medium text-slate-600">Last Updated</p>
            <p className="text-sm text-slate-500">{lastUpdated}</p>
        </div>
      </div>
    </header>
  );
};