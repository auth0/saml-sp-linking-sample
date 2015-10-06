const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

function normalize(user) {
  return {
    user_id: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
    email: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
    provider: user['http://schemas.auth0.com/identities/default/provider']
  };
}

const issuer = 'urn:yvonne-test.auth0.com';
const entryPoint = 'https://yvonne-test.auth0.com/samlp/M7usYUzW6t7YlhpCBRoPPfDaPfyFfgXZ';

function strategyCallback(req, profile, done) {
  console.log(req);
  done(null, normalize(profile));
}

const loginStrategy = new SamlStrategy({
    issuer: issuer,
    path: '/login/callback',
    entryPoint: entryPoint,
    passReqToCallback: true
  },
  strategyCallback
);

function processUser(user, done) {
  done(null,user);
}

passport.use('saml', loginStrategy);
passport.serializeUser(processUser);
passport.deserializeUser(processUser);

module.exports = passport;
