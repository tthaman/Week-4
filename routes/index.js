const { Router } = require("express");
const router = Router();
const tokenDAO = require('../daos/token');

router.use("/notes", async (req, res, next) => {
  if(isLoggedIn(req, res, next)) {
    next();
  } else {
    res.status(401).send('unauthorized');
  }
});

// router.use("/login", async (req, res, next) => {
//     next();
// });
//
// router.use("/login/password", async (req, res, next) => {
//   if(isLoggedIn(req)) {
//     next();
//   } else {
//     res.status(401).send('unauthorized');
//   }
// });


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
