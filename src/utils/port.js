const port = process.env.PORT || 3001;
const log = (data) => console.log(data);
const logger = () => log(`🚀 Server is up on port: ${port}`);

module.exports = { port, logger };
