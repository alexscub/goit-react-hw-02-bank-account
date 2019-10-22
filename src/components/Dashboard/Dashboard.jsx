import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  initialState = {
    balance: 0,
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

  notify = message => toast(message);

  makeTransaction = (type, amount) => {
    const newTransaction = {
      date: new Date().toLocaleDateString('en-US', this.dateOptions),
      amount,
      type,
      id: shortid.generate(),
    };
    this.setState(prev => ({
      balance: prev.balance + (type === 'Withdraw' ? -amount : amount),
      transactions: [...prev.transactions, newTransaction],
    }));
  };

  checkAmount = amount => {
    if (amount < 0) {
      this.notify('Введите положительное значение!');
      return false;
    }
    if (amount === 0) {
      this.notify('Введите сумму для проведения операции!');
      return false;
    }
    return true;
  };

  onDeposit = amount => {
    if (this.checkAmount(amount)) {
      this.makeTransaction('Deposit', amount);
    }
  };

  onWithdraw = amount => {
    if (this.checkAmount(amount)) {
      if (amount > this.state.balance) {
        this.notify('На счету недостаточно средств для проведения операции!');
        return;
      }
      this.makeTransaction('Withdraw', amount);
    }
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
    const { balance, transactions } = this.state;
    const income = this.getSumFromTransactions(transactions, 'Deposit');
    const expenses = this.getSumFromTransactions(transactions, 'Withdraw');
    return (
      <div>
        <ToastContainer />
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        <Balance balance={balance} income={income} expenses={expenses} />
        {!!transactions.length && <TransactionHistory items={transactions} />}
      </div>
    );
  }
}

export default Dashboard;
