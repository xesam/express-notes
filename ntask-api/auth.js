const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const options = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    const strategy = new Strategy(options, (payload, done) => {
        Users.findByPk(payload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
            .catch(error => done(error, null));
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};