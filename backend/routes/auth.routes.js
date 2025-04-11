const express = require('express');
const passport = require('passport');
const { handleOAuthSuccess } = require("../controllers/auth.controller");
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/signin', session: false }),
  handleOAuthSuccess
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin', session: false }),
  handleOAuthSuccess
);

module.exports = router;