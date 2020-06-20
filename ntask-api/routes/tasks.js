module.exports = app => {
    const Tasks = app.db.models.Tasks;
    app.route('/tasks')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Tasks.findAll({
                UserId: req.user.id
            })
                .then(tasks => res.json(tasks))
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                });
        })
        .post((req, res) => {
            req.body.UserId = req.user.id;
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                });
        });

    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Tasks.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            }).then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            }).catch(err => {
                res.status(412).json({
                    msg: err.message
                })
            });
        })
        .put((req, res) => {
            Tasks.update(req.body, {
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            }).then(result => res.sendStatus(204))
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                });
        })
        .delete((req, res) => {
            Tasks.destroy({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            }).then(result => res.sendStatus(204))
                .catch(err => {
                    res.status(412).json({
                        msg: err.message
                    })
                });
        });
};
