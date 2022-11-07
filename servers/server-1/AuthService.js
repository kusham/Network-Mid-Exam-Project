const axios = require('axios');

const getImageUrl = async (imageName) => {
  const response = await axios.get(
    `http://localhost:5001/image/getURL/${imageName}`
  );
  console.log(response.data.url)
  return response.data.url;
};

module.exports = getImageUrl;
