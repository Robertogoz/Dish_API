const Express = require('express');
const router = Express.Router();
const Dish = require('../models/Dish');
const tokenAuth = require('../middleware/tokenAuth');

router.get('/dishes',tokenAuth, (req,res) => {
    Dish.findAll().then(dishes => {
        dishes.forEach(dish => {
            let links = [
                {rel: 'self', method: 'GET', href: 'http://localhost:3333/dish/'+dish.id},
                {rel: 'delete', method: 'DELETE', href: 'http://localhost:3333/dish/'+dish.id},
                {rel: 'edit', method: 'PUT', href: 'http://localhost:3333/dish/'+dish.id}
            ]
            dish.dataValues.links = links;
        });
        res.status(200);
        res.json(dishes);
    });
});

router.get('/dish/:id',tokenAuth, (req,res) => {
    let id = req.params.id;

    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        Dish.findByPk(id).then(dish => {
            if(dish != undefined) {
                let links = [
                    {rel: 'get_all', method: 'GET', href: 'http://localhost:3333/dishes'},
                    {rel: 'delete', method: 'DELETE', href: 'http://localhost:3333/dish/'+dish.id},
                    {rel: 'edit', method: 'PUT', href: 'http://localhost:3333/dish/'+dish.id}
                ];
                dish.dataValues.links = links

                res.status(200)
                res.json(dish);
            } else {
                res.sendStatus(404);
            }
        });
    };
});

router.post('/dish',tokenAuth, (req,res) => {
    let {name, ingredients, price} = req.body;

    if(name == undefined) {
        res.status(400);
        res.json("Undefined dish name");
    } else if(ingredients == undefined) {
        res.status(400);
        res.json("Undefined dish ingredients");
    } else if(isNaN(price)) {
        res.status(400);
        res.json("The sended price is not a number");
    } else {
        Dish.create({
            name:name,
            ingredients:ingredients,
            price: price
        }).then(() => {
            res.status(200);
            res.json("Dish registered successful");
        });
    };
});

router.delete('/dish/:id',tokenAuth, (req,res) => {
    let id = req.params.id;

    if(isNaN(id)) {
        res.status(400);
        res.json("invalid ID: NaN");
    } else {
        Dish.findByPk(id).then(dish =>{
            if(dish == undefined) {
                res.status(404);
                res.json("This dish doesn't exist");
            } else {
                Dish.destroy({
                    where: {id:id}
                }).then(() => {
                    res.status(200);
                    res.json("Dish deleted successful");
                });
            }
        });
    };
});

router.put('/dish/:id',tokenAuth, (req,res) => {
    let id = req.params.id;
    let {name, ingredients, price} = req.body;

    if(name == undefined) {
        res.sendStatus(400);
    } else if(ingredients == undefined) {
        res.sendStatus(400);
    } else if(isNaN(price)) {
        res.sendStatus(400);
    } else {
        Dish.findByPk(id).then(dish => {
            if(dish == undefined) {
                res.status(404);
                res.json("This dish doesn't exist");
            } else {
                Dish.update({
                    name:name,
                    ingredients:ingredients,
                    price: price
                }, {
                    where: {id:id}
                }).then(() => {
                    res.sendStatus(200);
                });
            }
        });
    };
});


module.exports = router;