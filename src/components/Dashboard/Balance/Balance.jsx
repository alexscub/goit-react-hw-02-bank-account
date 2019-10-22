import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ income, expenses, balance }) => {
  return (
    <section className={styles.balance}>
      <span className={styles.balanceElement}>
        <span role="img" aria-label="Snowman">
          ⬆️
        </span>
        {income}$
      </span>
      <span className={styles.balanceElement}>
        <span role="img" aria-label="Snowman">
          ⬇️
        </span>
        {expenses}$
      </span>
      <span className={styles.balanceElement}>Balance: {balance}$</span>
    </section>
  );
};
Balance.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
