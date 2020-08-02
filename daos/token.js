const Token = require('../models/token');

//should be an async function that returns a string after creating a Token record
module.exports.create = async (tokenData) => {
  tokenData.userId = mongoose.Types.ObjectId(tokenData.userId)
  return await Token.create( tokenData)
};

//should be an async function that returns a userId string using the tokenString to get a Token record
module.exports.getUserIdFromToken = async (tokenString) => {
  return await Token.findOne( { token: tokenString })
};

//an async function that deletes the corresponding Token record
module.exports.removeToken = async (tokenString) => {
  return await Token.deleteOne({ token: tokenString });
};
