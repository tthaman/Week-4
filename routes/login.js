const { Router } = require("express");
const router = Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userDAO = require('../daos/user');
const tokenDAO = require('../daos/token');

// Signup
router.post("/signup", async (req, res, next) => {
  const {email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('user/password is required');
  } else {
    try {
      let savedUser = await userDAO.getByEmail(email);
      if(!savedUser ) {
        const user = await userDAO.create(req.body);
        res.json(user);
      } else {
        res.status(409).send('User already exists!');
      }
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
});

// Password
router.post("/password", async (req, res, next) => {
  if (await isLoggedIn(req)) {
    const {password} = req.body;
    if (!password) {
      res.status(400).send('password is required');
    } else {
      try {
        // const savedUser = await userDAO.getById(req.userId);
        // if (savedUser) {
          const updatedUser = await userDAO.updateUserPassword(req.userId, password)
          res.json(updatedUser);
        // }
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  } else {
    res.status(401).send('unauthorized');
  }
});

// Login
router.post("/", async (req, res, next) => {
  const {email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('user/password is required');
  } else {
    try {
      const savedUser = await userDAO.getByEmail(email);
      if(!savedUser){
        res.status(401).send(`User with email ${email} does not exist`);
      } else if (!bcrypt.compareSync(password, savedUser.password)) {
        res.status(401).send("Passwords do not match");
      }else {
        const tokenData = await tokenDAO.create(
          {token: uuidv4() , userId: savedUser._id});
        res.body = {token: tokenData.token};
        res.json(res.body);
      }
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
});



// Logout
router.post("/logout", async (req, res, next) => {
  if (await isLoggedIn(req)) {
      try {
        const deletedToken = await tokenDAO.removeToken(req.token)
        res.json(deletedToken);
      } catch (e) {
        res.status(500).send(e.message);
      }
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

module.exports = router;
