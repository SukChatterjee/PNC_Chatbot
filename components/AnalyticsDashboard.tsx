import React from 'react';
import type { FinancialData } from '../types';
import { CashFlowChart } from './CashFlowChart';
import { ExpenseChart } from './ExpenseChart';

interface AnalyticsDashboardProps {
  data: FinancialData;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-slate-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-800">12-Month Cash Flow Forecast</h3>
        <CashFlowChart data={data.cashFlowForecast} />
      </div>
      <div className="lg:col-span-2 bg-slate-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-800">Expense Breakdown</h3>
        <ExpenseChart data={data.expenseBreakdown} />
      </div>
    </div>
  );
};