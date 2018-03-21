const postFilter = (username, result) => {
  let newResult = []
  result.forEach(item => {
    const {
      id,
      author,
      title,
      category,
      permlink,
      net_votes,
      pending_payout_value,
      active_votes
    } = item

    let metadata = null
    let cover = null
    let isVoted = false

    try {
      metadata = JSON.parse(item.json_metadata)
    } catch (err) {}

    if (metadata && metadata.image) {
      cover = metadata.image[0]
    }

    if (username) {
      for (let i = 0; i < active_votes.length; i++) {
        const item = active_votes[i]
        if (item.voter === username) {
          isVoted = true
          break
        }
      }
    }

    const newItem = {
      id,
      author,
      category,
      cover,
      permlink,
      title,
      votes: net_votes,
      isVoted,
      pendingPayout: pending_payout_value.split(" ")[0] * 1
    }
    newResult.push(newItem)
  })
  return newResult
}

const filter = (type, username, result) => {
  switch (type) {
    case 'post':
      return postFilter(username, result)
      break
  
    default:
      return result
      break
  }
}

module.exports = filter