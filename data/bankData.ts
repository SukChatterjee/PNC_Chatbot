import type { BankData } from '../types';
import { TransactionType } from '../types';

export const dummyBankData: BankData = {
  checkingAccount: {
    name: 'Business Checking',
    balance: 28450.75,
  },
  savingsAccount: {
    name: 'Business Savings',
    balance: 55200.00,
  },
  recentTransactions: [
    { id: 't1', date: '2024-07-21', description: 'Stripe Payout', amount: 4500.00, type: TransactionType.CREDIT },
    { id: 't2', date: '2024-07-20', description: 'Restaurant Depot', amount: 1230.50, type: TransactionType.DEBIT },
    { id: 't3', date: '2024-07-19', description: 'Payroll Run - Gusto', amount: 8500.00, type: TransactionType.DEBIT },
    { id: 't4', date: '2024-07-18', description: 'Amazon Web Services', amount: 350.00, type: TransactionType.DEBIT },
    { id: 't5', date: '2024-07-17', description: 'Square POS Deposit', amount: 2100.30, type: TransactionType.CREDIT },
  ],
  investments: [
    { id: 'i1', name: 'Vanguard 500 Index', type: 'Mutual Fund', value: 15000.00 },
    { id: 'i2', name: 'Short-Term Treasury Bills', type: 'Fixed Income', value: 10000.00 },
  ],
};
