import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

class Controls extends Component {
  initialState = {
    amount: '',
  };

  state = {
    ...this.initialState,
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value,
    });
  };

  render() {
    const { amount } = this.state;
    const { handleTransaction } = this.props;
    const handleclick = e => {
      const transaction = e.target.name;
      handleTransaction(transaction, +amount);
      this.setState({
        ...this.initialState,
      });
    };
    return (
      <section className={styles.controls}>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="number"
            name="amount"
            value={amount}
            onChange={this.handleChange}
          />
          <button
            className={styles.button}
            type="button"
            onClick={handleclick}
            name="Deposit"
          >
            Deposit
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleclick}
            name="Withdraw"
          >
            Withdraw
          </button>
        </form>
      </section>
    );
  }
}

export default Controls;
Controls.propTypes = {
  handleTransaction: PropTypes.func.isRequired,
};
