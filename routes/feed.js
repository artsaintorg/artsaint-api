const express = require("express")
const router = express.Router()

const api = require("./_api")

router.get("/:sortBy", (req, res, next) => {
  const { sortBy } = req.params
  const {
    username,
    tag,
    start_author,
    start_permlink
  } = req.query

  let dataParams = {
    tag: tag || "art",
    limit: 12,
    truncate_body: 1
  }

  // pagination
  if (start_author && start_permlink) {
    dataParams.start_author = start_author
    dataParams.start_permlink = start_permlink
    dataParams.limit++
  }

  const params = {
    path: "get_discussions_by_" + sortBy,
    data: dataParams,
    filterType: "post",
    username
  }

  api(params, (err, data) => {
    // remove first array for prevent double
    if (start_author && start_permlink) {
      data.shift()
    }
    if (err) { res.json(err) }
    else { res.json(data) }
  })
})

module.exports = router
