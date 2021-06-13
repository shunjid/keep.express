const success = (response, data) => {
  response.send({
    status: "ok",
    data: data,
  });
};

const error = (response, message) => {
  response.send({
    status: "failed",
    message: message,
  });
};

module.exports = { success, error };
