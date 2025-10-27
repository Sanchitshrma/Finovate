const { model } = require("mongoose");
const { WatchlistSchema } = require("../schemas/WatchlistSchema");

const WatchlistModel = model("watchlist", WatchlistSchema);

module.exports = { WatchlistModel };
