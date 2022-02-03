# DISH_API

A RESTful API for restaurant dishes with login system using JWT 

### How to use

* Install node.js v16 and MySQL server

* Clone this repository

* Run `Create database rest;` in MySQL terminal

* Go to `database/database` in this directory and change `your_password` for you MySQL server password 

* Run on terminal `npm install`

* Run node app.js

### Endpoints

#### POST /user

This endpoint will create a user in your DB

##### Parameter

none

##### Response

* Ok! 200
Your account was created successful

* Bad Request 400

You will get this error if you try to create an account and the email used is already registered

#### POST /auth

This endpoint do login process and response a token to JWT session

>You need to use this endpoint to can use the under endpoints

##### Form body example

```
{
    "email": "your@email.com",
    "password": "your_password"
}
```

##### Responses

* Ok! 200
response example: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnb3pqdW5pb3JAaG90bWFpbC5jb20iLCJpYXQiOjE2NDM4NjI2OTEsImV4cCI6MTY0Mzk0OTA5MX0.VZQOlrHuVjsydox6AgB50a_5GBSzoA1I-XJv8hmSB-k"
}
```

* Bad request

You will receive this error if you don't send a email in login form

* Unathorized 401

You will receive this error if you try to log in with a invalid account

#### GET /dishes

This endpoint will response all dishes registered in DB

##### Parameters

none

##### Responses

* OK! 200 
example(my favorites dishes in pt-br hehe): 

```
[
    {
        "id": 1,
        "name": "Macarrao a bolonhesa",
        "ingredients": "Fetucinne, molho vermelho, patinho moido e condimentos",
        "price": 30,
        "createdAt": "2022-01-25T19:43:31.000Z",
        "updatedAt": "2022-01-25T20:55:48.000Z",
        "links": [
            {
                "rel": "self",
                "method": "GET",
                "href": "http://localhost:3333/dish/1"
            },
            {
                "rel": "delete",
                "method": "DELETE",
                "href": "http://localhost:3333/dish/1"
            },
            {
                "rel": "edit",
                "method": "PUT",
                "href": "http://localhost:3333/dish/1"
            }
        ]
    },
    {
        "id": 2,
        "name": "Virado a Paulista",
        "ingredients": "Arroz, tutu de feijao, bisteca, linguiça, ovo, banana empanada, couve e condimentos",
        "price": 40,
        "createdAt": "2022-01-25T20:23:19.000Z",
        "updatedAt": "2022-01-25T20:23:19.000Z",
        "links": [
            {
                "rel": "self",
                "method": "GET",
                "href": "http://localhost:3333/dish/2"
            },
            {
                "rel": "delete",
                "method": "DELETE",
                "href": "http://localhost:3333/dish/2"
            },
            {
                "rel": "edit",
                "method": "PUT",
                "href": "http://localhost:3333/dish/2"
            }
        ]
    }
]
```

#### GET /dish/:id

This endpoint will response a specific dish registered in DB

##### Parameters

the dish's id that you want to response

##### Responses

* OK! 200 

Response example:

```
{
    "id": 1,
    "name": "Macarrao a bolonhesa",
    "ingredients": "Fetucinne, molho vermelho, patinho moido e condimentos",
    "price": 30,
    "createdAt": "2022-01-25T19:43:31.000Z",
    "updatedAt": "2022-01-25T20:55:48.000Z",
    "links": [
        {
            "rel": "get_all",
            "method": "GET",
            "href": "http://localhost:3333/dishes"
        },
        {
            "rel": "delete",
            "method": "DELETE",
            "href": "http://localhost:3333/dish/1"
        },
        {
            "rel": "edit",
            "method": "PUT",
            "href": "http://localhost:3333/dish/1"
        }
    ]
}
```

* Bad Request 400 

You will receive this error if you send a NaN id as parameter

* Not Found 404

You'll receive this error if you send a non-registered id as parameter

#### POST /dish/:id

This endpoint will register a dish in your DB

##### Form body example

```
{
    "name": "Dish's name",
    "ingredients": "dish's ingredients",
    "price": "dish price(number)"
}
```

##### Responses

* OK! 200
response example:

`"Dish registered successful"`

* Bad Request 400
You will receive this response in 3 situations: 
    * you send "name" as undefined
    * you send "ingredients" as undefined
    * you send a Nan "price"

#### Delete /dish/:id

This endpoint will delete a registered dish using your id to delete it

##### Parameter

Dish id that you want to delete

##### Response

* OK! 200
response example: 
`"Dish deleted successful"`

* Bad request 400
You will receive this error if you send a NaN id as parameter

* Not found 404
You will receive this error if you send a non-registered id as parameter


#### PUT /dish/:id

This endpoint will edit a registered dish using your id to edit it

##### Form body example

```
{
    "name": "Dish's name",
    "ingredients": "dish's ingredients",
    "price": "dish price(number)"
}
```

##### Responses

* Ok! 200

If you receive this response, you edited that dish successful

* Bad Request 400
You will receive this error in 3 situations: 
    * you send "name" as undefined
    * you send "ingredients" as undefined
    * you send a Nan "price"

* Not found 404
You will receive this error if you try to edit a non-registered dish



