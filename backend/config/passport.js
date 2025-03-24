const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models/user.models');

const generateUsername = (name) => {
  const baseUsername = name.replace(/\s+/g, '').toLowerCase();
  return baseUsername.replace(/[^a-z0-9_]/g, '');
};

const ensureUniqueUsername = async (baseUsername) => {
  let username = baseUsername;
  let counter = 1;
  while (await User.findOne({ username })) {
    username = `${baseUsername}${counter}`;
    counter++;
  }
  return username;
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/github/callback`,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      let user = await User.findOne({ github: profile.username });
      if (!user && email) {
        user = await User.findOne({ email: email });
        if (user) {
          user.github = profile.username;
          user.profilePicture = profile.photos[0].value || user.profilePicture;
          await user.save();
        }
      }
      
      if (!user) {
        const userEmail = email || `${profile.id}@github.example.com`;
        const displayName = profile.displayName || profile.username;
        const baseUsername = generateUsername(displayName);
        const uniqueUsername = await ensureUniqueUsername(baseUsername);
        
        user = new User({
          name: displayName,
          username: uniqueUsername,
          email: userEmail,
          password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
          github: profile.username,
          profilePicture: profile.photos[0].value
        });
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      
      let user = await User.findOne({ $or: [{ email: email }, { googleId: profile.id }] });

      if (!user) {
        const baseUsername = generateUsername(profile.displayName);
        const uniqueUsername = await ensureUniqueUsername(baseUsername);
        
        user = new User({
          name: profile.displayName,
          username: uniqueUsername,
          email: email,
          password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
          googleId: profile.id,
          profilePicture: profile.photos[0].value
        });
        await user.save();
      } else if (!user.googleId) {
        user.googleId = profile.id;
        if (profile.photos && profile.photos[0] && !user.github) {
          user.profilePicture = profile.photos[0].value;
        }
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;