import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

class AllTransactionsService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): Transaction[] {
    return this.transactionRepository.all();
  }
}

export default AllTransactionsService;
