const axios = require("axios")
const filter = require("./_filter")

const URL = "https://api.steemit.com/"

const api = ({ path, data, filterType, username }, callback) => {
  const params = {
    id: 1,
    jsonrpc: "2.0",
    method: "call",
    params: [
      "database_api",
      path,
      [data]
    ]
  }

  axios
    .post(URL, params)
    .then((res) => {
      if (res.error) {
        callback(err, null)
      } else {
        const filteredResult = filter(filterType, username, res.data.result)
        callback(null, filteredResult)
      }
    })
    .catch((err) => {
      callback(err, null)
    })
}

module.exports = api