require("dotenv").config();
const axios = require("axios");

const HEADERS = {
  "Content-Type": "application/json",
  "X-Auth-Email": process.env.CLOUDFLARE_EMAIL,
  "X-Auth-Key": process.env.CLOUDFLARE_GLOBAL_API_KEY
};

axios.get("https://ipinfo.io/ip").then(response => {
  let currentIP = response.data;

  axios
    .get(
      `https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_ID}/dns_records`,
      {
        params: {
          type: "A",
          name: process.env.TARGET_URL
        },
        headers: HEADERS
      }
    )
    .catch(errors => {
      console.log(errors.response.data);
    })
    .then(response => {
      const DNS_ID = response.data.result[0].id;

      axios
        .put(
          `https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_ID}/dns_records/${DNS_ID}`,
          {
            type: "A",
            name: process.env.TARGET_URL,
            content: currentIP.trim(),
            ttl: 1
          },
          {
            headers: HEADERS
          }
        )
        .catch(error => {
          console.log(error.response.data);
        })
        .then(() => {
          console.log("Sucessfully updated DNS");
        });
    });
});
