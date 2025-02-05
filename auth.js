const passport = require('passport');
const LocalStrategy = require('passport-local');
const Person = require('./models/person')

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    //auth
    try {
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            return done(null, false, { message: 'Invalid username' });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Invalid Password' });
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;