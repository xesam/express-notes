const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./logger');

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(bodyParser.json())
        .use(morgan('common', {
            stream: {
                write: (message) => {
                    logger.info(message);
                }
            }
        }))
        .use(app.auth.initialize())
        .use((req, res, next) => {
            delete req.body.id;
            next();
        })
}