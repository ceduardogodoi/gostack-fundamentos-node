import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import AllTransactionsService from '../services/AllTransactionsService';
import BalanceService from '../services/BalanceService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = new AllTransactionsService(transactionsRepository);
    const balanceService = new BalanceService(transactionsRepository);

    const transactions = allTransactions.execute();
    const balance = balanceService.execute();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({ title, value, type });

    return response.json(transaction);
  } catch ($error) {
    return response.status(400).json({ error: $error.message });
  }
});

export default transactionRouter;
