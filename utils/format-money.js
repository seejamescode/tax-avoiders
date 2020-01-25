const formatMoney = amount => {
  const absAmount = Math.abs(amount);

  return `${amount < 0 ? "-" : ""}$${
    absAmount >= 1000000000
      ? `${Math.round((absAmount / 1000000000 + Number.EPSILON) * 10) /
          10} billion`
      : absAmount >= 1000000
      ? `${Math.round((absAmount / 1000000 + Number.EPSILON) * 10) /
          10} million`
      : absAmount >= 1000
      ? `${Math.round((absAmount / 1000 + Number.EPSILON) * 10) / 10}k`
      : absAmount
  }`;
};

export default formatMoney;
