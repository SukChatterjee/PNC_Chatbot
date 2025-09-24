export enum Sender {
  User = 'user',
  AI = 'ai',
}

export interface XaiData {
  recommendation: string;
  confidenceScore: number;
  modelInputs: string[];
  alternatives: string[];
}

export interface Message {
  id: number;
  text: string;
  sender: Sender;
  xaiData?: XaiData;
}

// New types for the financial dashboard
export interface Kpi {
  title: string;
  value: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface Expense {
  name: string;
  value: number;
}

export interface FinancialData {
  companyName: string;
  lastUpdated: string;
  kpis: {
    monthlyRevenue: Kpi;
    monthlyExpenses: Kpi;
    netCashFlow: Kpi;
    cashReserves: Kpi;
  };
  cashFlowForecast: MonthlyData[];
  expenseBreakdown: Expense[];
}

export type Tab = 'dashboard' | 'coach' | 'transparency';

// FIX: Add missing BankData and related types.
export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface BankAccount {
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  value: number;
}

export interface BankData {
  checkingAccount: BankAccount;
  savingsAccount: BankAccount;
  recentTransactions: Transaction[];
  investments: Investment[];
}
