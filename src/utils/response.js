const success = (response, data) => {
  response.send({
    status: "ok",
    data: data,
  });
};

const error = (response, message, status = 500) => {
  response.status(status);

  response.send({
    status: "failed",
    message: message,
  });
};

module.exports = { success, error };
