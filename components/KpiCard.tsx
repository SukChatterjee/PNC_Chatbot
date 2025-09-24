import React from 'react';

interface KpiCardProps {
  title: string;
  value: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: 'green' | 'red' | 'blue' | 'purple';
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const colorClasses = {
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
};

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{formatCurrency(value)}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};