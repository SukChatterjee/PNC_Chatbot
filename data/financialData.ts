import type { FinancialData } from '../types';

export const financialData: FinancialData = {
  companyName: 'TechStart Solutions',
  lastUpdated: '22/09/2025',
  kpis: {
    monthlyRevenue: { title: 'Monthly Revenue', value: 45000 },
    monthlyExpenses: { title: 'Monthly Expenses', value: 35000 },
    netCashFlow: { title: 'Net Cash Flow', value: 10000 },
    cashReserves: { title: 'Cash Reserves', value: 85000 },
  },
  cashFlowForecast: [
    { month: 'Sep 2025', revenue: 45000, expenses: 32000, net: 13000 },
    { month: 'Oct 2025', revenue: 48000, expenses: 33000, net: 15000 },
    { month: 'Nov 2025', revenue: 55000, expenses: 34000, net: 21000 },
    { month: 'Dec 2025', revenue: 40000, expenses: 30000, net: 10000 },
    { month: 'Jan 2026', revenue: 35000, expenses: 29000, net: 6000 },
    { month: 'Feb 2026', revenue: 42000, expenses: 31000, net: 11000 },
    { month: 'Mar 2026', revenue: 50000, expenses: 32500, net: 17500 },
    { month: 'Apr 2026', revenue: 54000, expenses: 33000, net: 21000 },
    { month: 'May 2026', revenue: 58000, expenses: 34000, net: 24000 },
    { month: 'Jun 2026', revenue: 60000, expenses: 35000, net: 25000 },
    { month: 'Jul 2026', revenue: 52000, expenses: 32000, net: 20000 },
    { month: 'Aug 2026', revenue: 40000, expenses: 30000, net: 10000 },
  ],
  expenseBreakdown: [
    { name: 'Payroll', value: 20000 },
    { name: 'Rent', value: 5000 },
    { name: 'Utilities', value: 2000 },
    { name: 'Marketing', value: 4000 },
    { name: 'Supplies', value: 3000 },
    { name: 'Other', value: 1000 },
  ],
};