const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		action: String
	},
	{
		timestamps: true
	}
);

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
