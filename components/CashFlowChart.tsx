import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthlyData } from '../types';

interface CashFlowChartProps {
  data: MonthlyData[];
}

const formatCurrency = (value: number) => `$${(value / 1000)}k`;

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }} className="mt-6">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tickFormatter={formatCurrency} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)}
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
          />
          <Legend wrapperStyle={{ fontSize: "14px" }} />
          <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="net" name="Net Cash Flow" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};