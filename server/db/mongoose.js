const mongoose = require("mongoose");


mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
module.exports = {
	mongoose
};