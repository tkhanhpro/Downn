// Shared library for common imports or functions
// Currently just re-exports axios for modularity
const axios = require('axios');

module.exports = {
  axios,
  // Add more utilities if needed, e.g., error handling functions
  handleError: (error) => {
    console.error(error);
    return 'Đã xảy ra lỗi!';
  }
};
