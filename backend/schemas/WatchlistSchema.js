const { Schema } = require("mongoose");

const WatchlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userdata", required: true },
  symbol: { type: String, required: true, uppercase: true },
  addedAt: { type: Date, default: Date.now },
});

// Create compound index to ensure one user can't add same symbol twice
WatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

module.exports = { WatchlistSchema };
