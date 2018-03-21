const express = require("express")
const router = express.Router()

const api = require("./_api")

/* GET home page. */
router.get("/:sortBy", (req, res, next) => {
  const { username } = req.query
  const { sortBy } = req.params
  const params = {
    path: "get_discussions_by_" + sortBy,
    data: {
      tag: "art",
      limit: 12,
      truncate_body: 1
    },
    filterType: "post",
    username
  }
  api(params, (err, data) => {
    if (err) { res.json(err) }
    else { res.json(data) }
  })
})

module.exports = router
