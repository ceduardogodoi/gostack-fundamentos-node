import Transaction from '../models/Transaction';
import TransactionType from '../models/TransactionType';

interface TransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const balance = this.transactions.reduce(
      ($balance, transaction): Balance => {
        if (transaction.type === TransactionType.INCOME) {
          $balance.income += transaction.value;
        } else {
          $balance.outcome += transaction.value;
        }

        $balance.total = $balance.income - $balance.outcome;

        return $balance;
      },
      { income: 0, outcome: 0, total: 0 } as Balance,
    );

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (transaction.type === TransactionType.OUTCOME) {
      if (this.getBalance().total < transaction.value) {
        throw new Error(
          'Could not create an outcome transaction without a valid balance',
        );
      }
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
