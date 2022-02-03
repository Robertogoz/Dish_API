const Express = require('express');
const router = Express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenAuth = require('../middleware/tokenAuth');

//secret jwt

var JWTSecret = "MasterKey";


router.post('/user', (req,res) => {
    let {name, email, password} = req.body;

    User.findOne({where: {email: email}}).then(user => {
        if(user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.sendStatus(200);
            }).catch(err => {
                res.sendStatus(400);
            })
        } else {
            res.sendStatus(400);
        }
    });
});

router.delete('/user/:id', tokenAuth,(req,res) => {
    let id = req.params.id;

    User.destroy({
        where: {id: id}
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
    });
});

router.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let {name, email, password} = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);

    User.update({name: name, email: email, password: hash}, {where: {id:id}}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
    });
});

router.post('/auth', (req,res) => {
    let {email, password} = req.body;

    if(email != undefined) {
        User.findOne({where: {email:email}}).then(user => {
            let correctPassword = bcrypt.compareSync(password, user.password);

            if(correctPassword) {
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn:'24h'}, (err, token) => {
                    if(err) {
                        res.sendStatus(500);
                    } else {
                        res.status(200);
                        res.json({token:token});
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;