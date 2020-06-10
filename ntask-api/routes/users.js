module.exports = app => {
    const Users = app.db.models.Users;
    app.route('/user')
        .all(app.auth.authenticate())
        .get((req, res) => {
            console.log(req.user)
            Users.findByPk(req.user.id, {
                attributes: ['id', 'name', 'email']
            }).then(result => res.json(result))
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                })
        })
        .delete((req, res) => {
            Users.destroy({
                where: {
                    id: req.user.id
                }
            })
                .then(result => res.sendStatus(204))
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                });
        });

    app.post('/users', (req, res) => {
        Users.create(req.body)
            .then(result => res.json(result))
            .catch(err => {
                res.status(412).json({
                    msg: err.message
                })
            });
    });
}