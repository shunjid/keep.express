const attributeValidator = ({ requested, allowed }) => {
  return new Promise((resolve) => {
    const isValidOperation = requested.every((update) =>
      allowed.includes(update)
    );

    resolve(isValidOperation);
  });
};

module.exports = { attributeValidator };
