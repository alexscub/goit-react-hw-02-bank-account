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
    const { onDeposit, onWithdraw } = this.props;
    const handleOnDeposit = () => {
      onDeposit(+amount);
      this.setState({
        ...this.initialState,
      });
    };
    const handleOnWithdraw = () => {
      onWithdraw(+amount);
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
            onClick={handleOnDeposit}
          >
            Deposit
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleOnWithdraw}
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
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
};
