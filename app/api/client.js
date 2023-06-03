const { default: axios } = require("axios");

const client = axios.create({
  baseURL: "https://elevenime-api.aditama.cloud",
});

export default client;
