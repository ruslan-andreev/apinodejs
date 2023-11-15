# API QUERIES

## Users

#### http://localhost:3500/api/users 

should return a list of users if exists

RESPONSE
```
[
    {"id":1,"email":"someemail@gmail.com","userName":"Alex","isAdmin":1},
    {"id":2,"email":"bod@gmail.com","userName":"Bob","isAdmin":0},
    {"id":3,"email":"kate@gmail.com","userName":"Kate","isAdmin":0},
    {"id":4,"email":"example1@gmail.com","userName":"John","isAdmin":1},
    {"id":5,"email":"example2@yahoo.com","userName":"Emma","isAdmin":0},
    {"id":6,"email":"example3@hotmail.com","userName":"Mike","isAdmin":1},
    {"id":7,"email":"example4@gmail.com","userName":"Sarah","isAdmin":0},
    {"id":8,"email":"example5@yahoo.com","userName":"David","isAdmin":0},
    {"id":9,"email":"example6@gmail.com","userName":"Lisa","isAdmin":0},
    {"id":10,"email":"example7@hotmail.com","userName":"Alexey","isAdmin":0},
    {"id":11,"email":"example8@yahoo.com","userName":"Jessica","isAdmin":0},
    {"id":12,"email":"example9@gmail.com","userName":"Ryan","isAdmin":0},
    {"id":13,"email":"example10@hotmail.com","userName":"Emily","isAdmin":0}
]
```

#### http://localhost:3500/api/users/id/2 

should return user by id if exists

RESPONSE
```
{"id":2,"email":"bod@gmail.com","userName":"Bob","isAdmin":0}
```

### signUp

#### http://localhost:3500/api/users/signUp

If  you need to add, update or delete products set "isAdmin": true 

METHOD POST
BODY
```
{
    "userName":"someName",
    "password": "12345678",
    "email": "someTestEmail",
    "isAdmin": true 
}
```
RESPONSE
```
{
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNvbWVOYW1lIiwiYWRtaW5QZXJtaXNzaW9uIjp0cnVlLCJleHBpcmF0aW9uVGltZSI6MTY5OTgyMjg2OX0.RTFWakJMZEdQbjFKZmltcEdxUWlUcGIvWmt3RktYN0xjSHVoK1VaQnVWbz0",
    "message": "User successfully created."
}
```

### signIn

#### http://localhost:3500/api/users/signIn

If jwtToken has expired you need to signIn with you userName and password

METHOD POST
BODY
```
{
    "userName":"someName",
    "password": "12345678"
}
```
RESPONSE
```
{
    "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlJ1c2xhbiIsImFkbWluUGVybWlzc2lvbiI6MSwiZXhwaXJhdGlvblRpbWUiOjE2OTk4MjM4NTh9.enBHZU1XSEVIT0I4ejNxbFRoM05YRVhxTWR1TWNBaEFvTVBEanJIY2dLOD0",
    "message": "User signed in successfully."
}
```

## Products

#### http://localhost:3500/api/products

should return a list of products if exists

RESPONSE
```
[
    {"id":1,"title":"Product 1","price":"19.99","gender":"male","description":"Description 1","size":10,    "color":"Red","category":"shirt","image":"url1","sale":0,"quantity":100},
    {"id":2,"title":"Product 2","price":"29.43","gender":"female","description":"Description 2","size":8,   "color":"Blue","category":"trousers","image":"url2","sale":1,"quantity":50},
    {"id":3,"title":"Product 3","price":"10.26","gender":"unisex","description":"Description 3","size":12,  "color":"Green","category":"accessories","image":"url3","sale":0,"quantity":80},
    {"id":4,"title":"Product 4","price":"5.99","gender":"male","description":"Description 4","size":15, "color":"Black","category":"shirt","image":"url4","sale":0,"quantity":10},
    {"id":5,"title":"Product 5","price":"40.82","gender":"female","description":"Description 5","size":5,   "color":"Dark","category":"trousers","image":"url5","sale":1,"quantity":20},
    {"id":6,"title":"Product 6","price":"19.90","gender":"female","description":"Description 6","size":40,  "color":"Grey","category":"trousers","image":"url6","sale":1,"quantity":15},
    {"id":7,"title":"Product 7","price":"64.99","gender":"male","description":"Description 7","size":23,    "color":"Blue","category":"trousers","image":"url7","sale":0,"quantity":8},
    {"id":8,"title":"Product 8","price":"5.32","gender":"unisex","description":"Description 8","size":46,   "color":"White","category":"accessories","image":"url8","sale":0,"quantity":18},
    {"id":9,"title":"Product 9","price":"53.17","gender":"male","description":"Description 9","size":32,    "color":"Grey","category":"trousers","image":"url9","sale":1,"quantity":53},
    {"id":10,"title":"Product 10","price":"17.60","gender":"unisex","description":"Description 10","size":10,   "color":"White","category":"accessories","image":"url10","sale":0,"quantity":11}
]
```

#### http://localhost:3500/api/products/id/1

should return product by id if exists

RESPONSE
```
{"id":1,"title":"Product 1","price":"19.99","gender":"male","description":"Description 1","size":10,"color":"Red","category":"shirt","image":"url1","sale":0,"quantity":100}
```
#### http://localhost:3500/api/products/category/shirt

should return a product by category if exists

RESPONSE
```
[
    {"id":1,"title":"Product 1","price":"19.99","gender":"male","description":"Description 1","size":10,"color":"Red","category":"shirt","image":"url1","sale":0,"quantity":100},
    {"id":4,"title":"Product 4","price":"5.99","gender":"male","description":"Description 4","size":15,"color":"Black","category":"shirt","image":"url4","sale":0,"quantity":10}
]
```

#### http://localhost:3500/api/products/?gender=female&sale=true

should return a product by query params if exists

RESPONSE
```
[
    {"id":2,"title":"Product 2","price":"29.43","gender":"female","description":"Description 2","size":8,"color":"Blue","category":null,"image":"url2","sale":1,"quantity":50},
    {"id":5,"title":"Product 5","price":"40.82","gender":"female","description":"Description 5","size":5,"color":"Dark","category":null,"image":"url5","sale":1,"quantity":20},
    {"id":6,"title":"Product 6","price":"19.90","gender":"female","description":"Description 6","size":40,"color":"Grey","category":null,"image":"url6","sale":1,"quantity":15}
]
```
### addProduct

#### http://localhost:3500/api/products/

To add product you need to specify your access jwtTocken in Authorization Headers 
and have access as administrator

METHOD POST
BODY
```
{
    "title": "new shirt", 
    "price": 300, 
    "gender": "male", 
    "description": "some description for a new product",
    "size": 40, 
    "color": "green", 
    "category": "shirt update" , 
    "image": "some URL", 
    "sale": false,
    "quantity": 10
}
```

### upDateProduct

#### http://localhost:3500/api/products/id/:id

To update product you need to specify id product and add your access jwtTocken in Authorization Headers
and have access as administrator

METHOD PUT
BODY
```
{
    "title": "updated product", 
    "price": 300, 
    "gender": "male", 
    "description": "some description after updated product",
    "size": 40, 
    "color": "green", 
    "category": "shirt update" , 
    "image": "some URL", 
    "sale": false,
    "quantity": 10
}
```
RESPONSE
```
{
    "massage": "Product updated success"
}
```
### deleteProduct

#### http://localhost:3500/api/products/id/:id

To delete product you need to specify id product and add your access jwtTocken in Authorization Headers
and have access as administrator

METHOD DEL
RESPONSE
```
{
    "message": "Product deleted"
}
```
## Carts

#### http://localhost:3500/api/carts

should return a list of carts if exists

RESPONSE
```
[
    {"cartId":1,"userId":1,"productList":[{"title":"Product 1","quantity":2},{"title":"Product 2","quantity":1},{"title":"Product 1","quantity":2},{"title":"Product 2","quantity":1}]},
    {"cartId":2,"userId":2,"productList":[{"title":"Product 3","quantity":3},{"title":"Product 3","quantity":3}]},
    {"cartId":3,"userId":3,"productList":[{"title":"Product 4","quantity":1},{"title":"Product 5","quantity":2},{"title":"Product 4","quantity":1},{"title":"Product 5","quantity":2}]},
    {"cartId":4,"userId":4,"productList":[{"title":"Product 7","quantity":3},{"title":"Product 8","quantity":7},{"title":"Product 7","quantity":3},{"title":"Product 8","quantity":7}]},
    {"cartId":5,"userId":5,"productList":[{"title":"Product 8","quantity":3},{"title":"Product 8","quantity":3}]}
]
```

#### http://localhost:3500/api/carts/id/2

should return a cart by user id if exists

RESPONSE
```
{"cartId":2,"userId":2,"productList":[{"title":"Product 3","quantity":3},{"title":"Product 3","quantity":3}]}
```
