import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  initialState = {
    transactions: [],
  };

  state = {
    ...this.initialState,
  };

  dateOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  componentDidMount() {
    
  }

  notify = message => toast(message);

  makeTransaction = (type, amount) => {
    const newTransaction = {
      date: new Date().toLocaleDateString('en-US', this.dateOptions),
      amount,
      type,
      id: shortid.generate(),
    };
    return newTransaction;
  };

  getBalance = () => {
    const { transactions } = this.state;
    return (
      this.getSumFromTransactions(transactions, 'Deposit') -
      this.getSumFromTransactions(transactions, 'Withdraw')
    );
  };

  handleTransaction = (transaction, amount) => {
    if (amount < 0) {
      this.notify('Введите положительное значение!');
      return;
    }
    if (!amount) {
      this.notify('Введите сумму для проведения операции!');
      return;
    }
    if (transaction === 'Withdraw' && amount > this.getBalance()) {
      this.notify('На счету недостаточно средств для проведения операции!');
      return;
    }
    const newTransaction = this.makeTransaction(transaction, amount);
    this.setState(prev => ({
      transactions: [...prev.transactions, newTransaction],
    }));
  };

  getSumFromTransactions = (transactions, type) =>
    transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => {
        let curSum = acc;
        curSum += transaction.amount;
        return curSum;
      }, 0);

  render() {
    const { transactions } = this.state;
    const income = this.getSumFromTransactions(transactions, 'Deposit');
    const expenses = this.getSumFromTransactions(transactions, 'Withdraw');
    return (
      <div>
        <ToastContainer />
        <Controls handleTransaction={this.handleTransaction} />
        <Balance income={income} expenses={expenses} />
        {!!transactions.length && <TransactionHistory items={transactions} />}
      </div>
    );
  }
}

export default Dashboard;
