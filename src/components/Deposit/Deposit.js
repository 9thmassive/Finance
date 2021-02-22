import React, { Component } from "react";
import PropTypes from "prop-types";
import DepositChild from "./DepositChild";

class Deposit extends Component {
  state = {
    APR: 0.05
  };

  componentDidMount() {
    this.calculateAPR();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.calculateAPR();
    }
  }

  calculateAPR = () => {
    const { amount } = this.props;

    if (200 < amount && amount < 1000) {
      this.setState({ APR: 0.05 });
    }
    if (1000 < amount && amount < 2000) {
      this.setState({ APR: 0.1 });
    }
    if (2000 < amount && amount < 5000) {
      this.setState({ APR: 0.15 });
    }
    if (5000 < amount && amount < 10000) {
      this.setState({ APR: 0.2 });
    }
  };

  calculateMonthlyRepayment = () => {
    const { amount, years } = this.props;

    const decimalFormat = this.state.APR + 1;
    const totalOwed = decimalFormat * amount;
    const monthlyRepayment = totalOwed / (years * 12);

    return <p>€{Math.round(monthlyRepayment)}</p>;
  };

  percentageAPR = () => {
    return <p>{this.state.APR * 100}%</p>;
  };

  render() {
    return (
      <div className="flex">
        <DepositChild func={this.percentageAPR()} text="possible rate" />
        <DepositChild
          func={this.calculateMonthlyRepayment()}
          text=" monthly reward"
        />
      </div>
    );
  }
}

Deposit.propTypes = {
  years: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired
};

export default Deposit;