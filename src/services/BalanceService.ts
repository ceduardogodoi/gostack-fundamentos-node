import TransactionRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class BalanceService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): Balance {
    return this.transactionRepository.getBalance();
  }
}

export default BalanceService;
