import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce<Balance>(
      (previous, transaction) => {
        return {
          ...previous,
          [transaction.type]: previous[transaction.type] + transaction.value,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return { ...balance, total: balance.income - balance.outcome };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
