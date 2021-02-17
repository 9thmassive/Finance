import React from "react";
import PropTypes from "prop-types";

const DepositChild = ({ func, text }) => {
  return (
    <span>
      {func} <small>{text}</small>
    </span>
  );
};

DepositChild.defaultProps = {
  func: () => <p>Missing numeric value</p>,
  text: "No value provided"
};

DepositChild.propTypes = {
  func: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default DepositChild;