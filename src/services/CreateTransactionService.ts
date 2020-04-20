import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const validType = type;
    const validValue = value;

    if (!(validType === 'income' || validType === 'outcome')) {
      throw Error('This type is not valid.');
    }

    if (validType === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (validValue >= balance.total) {
        throw Error("You don't have money");
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
