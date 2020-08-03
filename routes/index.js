const { Router } = require("express");
const router = Router();
const tokenDAO = require('../daos/token');

router.use("/notes", async (req, res, next) => {
  if(await isLoggedIn(req)) {
    next();
  } else {
    res.status(401).send('unauthorized');
  }
});

async function isLoggedIn(req) {
  let isLoggedIn = false;
  const {authorization} = req.headers;
  if (authorization) {
    const aToken = authorization.toString().split('Bearer ')[1]
    if (aToken && aToken !== "undefined") {
      const token = await tokenDAO.getUserIdFromToken(aToken) ;
      if (token) {
        req.token = aToken;
        req.userId = token.userId;
        isLoggedIn = true;
      }
    }
  }
  return isLoggedIn;
}



//isLoggedIn(req, res, next) - should check if the user has a valid token and if so make
// req.userId = the userId associated with that token. The token will be coming in as a
// bearer token in the authorization header (i.e. req.headers.authorization = 'Bearer 1234abcd')
// and you will need to extract just the token text. Any route that says "If the user is logged in"
// should use this middleware function.
//Error handling - router.use(error, req, res, next) - Can be used to handle errors where the
// provided note id is not a valid ObjectId. This can be done without middleware though.


router.use("/login", require('./login'));
router.use("/notes", require('./notes'));

module.exports = router;
