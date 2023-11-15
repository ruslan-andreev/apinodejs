#API Documentation fore clothing store

This API allows users to interact with the e-commerce application by
getting a list of products and products based on different parameters, add products
if you login as admin and have permissions,update current product by  product id or delete
product by product id.
Also you can get users list or get user by ID.

Content:

1. [Technical requirements](#Technical-requirements)
2. [Implementation details](#Implementation-details)
3. [Endpoints:](#Endpoints)
   - [Endpoints: products](#products)
   - [Endpoints: categories](#categories)
   - [Endpoints: users](#users)
   - [Endpoints: carts](#carts)
   - [Endpoints: users/signUp](#signUp)
   - [Endpoints: users/signIn](#signIn)
   

## Technical requirements <a name="Technical-requirements"></a>
- NodeJs
- Express
- MySql
- Docker


## Implementation details <a name="Implementation-details"></a>
  How to run project:
  - Instull Docker. 
  - Pull folder from GitHub: https://github.com/ruslan-andreev/apinodejs
  - Open console and run command "docker-compose up --build"

  Application will start on port http://localhost:3500

  Base URL http://localhost:3500/app/

  JSON example
```
  
  PRODUCT

  {
    "id":1,
    "title":"some title",
    "price":"some price number",
    "gender":"male || female",
    "description":"some description",
    "size": number,
    "color": string,
    "category": "some category",
    "image":"some img",
    "sale": true || false,
    "quantity": number
  }

  CART

  {
    "id":1,
    "userId": 1,
    "productList":[{productId:2,quantity:4},{productId:1,quantity:10},{productId:5,quantity:2}]
  }

  USER

  {
    "id":1,
    "email":'some@gmail.com',
    "userName":'Alex222',
    "password":'m38rmF$',
    "isAdmin": true || false 
  }

```

# Endpoints: <a name="Endpoints"></a>

## Endpoint `api/products`: <a name="products"></a>

- Request: `GET api/products` - get all products

  - Query Parameters:

  - Response:

```
  HTTP/1.1 200 OK
  Content-Type: application/json [
    {
      "id": 1,
      "title": "Some title",
      "price": "Some price USD",
      "gender": "male",
      "description": "Some description",
      "size": 10,
      "color": "some color"
      "category": "Some category",
      "image": "Some image URL",
      "sale": true || false
    },
    {
      "id": 2,
      "title": "Another title",
      "price": 19.99,
      "gender": "female",
      "description": "Another description",
      "size": 8,
      "color": "some color"
      "category": "Another category",
      "image": "Another image URL",
      "sale": true || false
    },
    ...
  ]

  404: error: "No products found" ;
  500: error: "Internal server error";
```

## Endpoint `api/products/:productId`: <a name="product-id"></a>

- Request: `GET api/products/:productId` - get the product specified by ID
  - Query Parameters:

  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `productID`| number | Yes      | The product ID |

  - Response:

```
  If the record with id === productID exists:

  HTTP/1.1 200 OK
    Content-Type: application/json
    {
      "id": 1,
      "title": "Some title",
      "price": 19.99,
      "gender": "male",
      "description": "Some description",
      "size": 10,
      "color": "some color"
      "category": "Some category",
      "image": "some url",
      "sale": true || false
    }

  404: error: "No products found";
  500: error: "Internal server error";

```

## Endpoint `api/products/?gender={gender}&category={category}$sale={true}`: <a name="product-id"></a>

- Request: `GET api/products/?gender={gender}&category={category}&sale={true}` - get the product          specified  by parmetrs
  - Query Parameters:

  | Parameter  | Type    | Required | Description                                     |
  |----------- |---------|----------|-------------------------------------------------|
  | `gender`   | string  | optional | gender:male or female                           |
  | `category` | string  | optional | category: accessories, shoes ...|
  | `sale`     | boolean | optional | sale: true                                      |

  - Response:

```
    HTTP/1.1 200 OK
      Content-Type: application/json

      {
        "gender": "male",
        "category": "shoes",
        "sale": true,
        "products": [
          {
            "id": 1,
            "title": "Some title",
            "price": "Some price USD",
            "gender": "male",
            "description": "Some description",
            "size": 10,
            "color": "some color",
            "category": "shoes",
            "image": "image URL",
            "sale": true || false
          },
          {
            "id": 2,
            "title": "Another title",
            "price": 19.99,
            "gender": "female",
            "description": "Another description",
            "size": 8,
            "color": "some color",
            "category": "shoed",
            "image": "image URL",
            "sale": true || false
          },
          ...
        ]
      }

  
    404: error: "No products found";
    500: error: "Internal server error";
```

## Endpoint `api/products/id/:productId`: <a name="add-product"></a>
-Request: `POST api/products/id/:productId` - add product
  - Query Parameters:

  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `productID`| number | Yes      | The product ID. |

  HTTP/1.1 201: massage: "Product updated success";
    Content-Type: application/json

  422: message: "Wrong data information";
  500: error: "Internal server error";


## Endpoint `api/products/id/:productId`: <a name="update-product"></a>

-Request: `PUT api/products/id/:productId` - update product
  - Query Parameters:

  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `productID`| number | Yes      | The product ID. |

  - Response:

```
  If the target resource does have a current representation and that representation is successfully modified

  HTTP/1.1 200 OK massage: "Product updated success
    Content-Type: application/json

    404: error: "Product not found";
    500: error: "Internal server error";
```


## Endpoint `api/products/id/:productId`: <a name="delete-product"></a>

-Request: `DELETE api/products/id/:productId` - delete product
   - Query Parameters:

  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `productID`| number | Yes      | The product ID. |

  - Response:

  ```
  If the record with id === productID exists

  HTTP/1.1 200: message: "User deleted";
    Content-Type: application/json

    500: error: "Internal server error";
  ```

## Endpoint `api/products/category/:category`: <a name="categories"></a>

- Request: `GET api/products/category/:category` - get products in a specific category

  - Query Parameters:
  
  | Parameter  | Type   | Required | Description                  |
  |------------|--------|----------|------------------------------|
  | `category` | string | Yes      | shirt, trousers, accessories |

  - Response:

```
  HTTP/1.1 200 OK
  Content-Type: application/json [
    {
      "id": 1,
      "title": "Some title",
      "price": "Some price USD",
      "gender": "male",
      "description": "Some description",
      "size": 10,
      "color": "some color",
      "category": "Some category",
      "image": "Some image URL",
      "sale": true || false
    },
    {
      "id": 2,
      "title": "Another title",
      "price": 19.99,
      "gender": "male",
      "description": "Another description",
      "size": 8,
      "color": "some color",
      "category": "Some category",
      "image": "Some image URL",
      "sale": true || false
    },
    ...
  ]

  404: error: "Product not found";
  500: error: "Internal server error";
```
## Endpoint `api/users/`: <a name="users"></a>

- Request: `GET api/users/` - get all users

  - Query Parameters:

  - Response:

```
  HTTP/1.1 200 OK
    Content-Type: application/json 
      [
        {
          "id":1,
          "email":"some@gmail.com",
          "username":"Alex22"',
          "isAdmin": true || false
        },
        {
          "id":2,
          "email":"someOther@gmail.com",
          "username":"Bob122",
          "isAdmin": true || false
        },
        ...
      ]

  404: error: "Users not found";
  500: error: "Internal server error";
```

## Endpoint `api/users/id/:userId`: <a name="user-id"></a>

- Request: `GET api/users/id/:userId` - get the user specified by ID

  - Query Parameters:

  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `userID`   | number | Yes      | The user ID.    |

  - Response:

```
  If the record with id === userID exists:

  HTTP/1.1 200 OK
    Content-Type: application/json
    {
      "id":1,
      "email":"some@gmail.com",
      "username":"Alex222",
      "isAdmin": true || false
    }

  404: error: "User not found";
  500: error: "Internal server error";

```

## Endpoint `api/carts/`: <a name="carts"></a>

- Request: `GET api/carts/` - get all carts

  - Query Parameters:

  - Response:

```
  HTTP/1.1 200 OK
    Content-Type: application/json 

      [
        {
          id:1,
          date:2023-09-10,
          products:[{productId:2,quantity:4},{productId:1,quantity:10},{productId:5,quantity:2}]
        },
        {
          id:2,
          date:2023-10-10,
          products:[{productId:1,quantity:5},{productId:5,quantity:1}]
        }
        ...
      ]
  404: error: "Carts not found";
  500: error: "Internal server error";
```
## Endpoint `api/carts/id/:userId`: <a name="carts-id"></a>

- Request: `GET api/carts/id/:userId` - get the cart specified by userID

  - Query Parameters:

  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `userID`   | number | Yes      | The user ID.    |

  - Response:

```
  If the record with id === userID exists:

  HTTP/1.1 200 OK
    Content-Type: application/json
    {
      "id": 1,
      "UserId": 1,
      "productList": [{"productId":2,"quantity":4},{"productId":1,"quantity":10},{"productId":5,"quantity":2}]
    }

  404: error: "Cart not found";
  500: error: "Internal server error";

```

## Endpoint `api/users/signUp`: <a name="signUp"></a>

- Request: `POST api/users/signUp` - signUp

  - Query Parameters:
  
  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `name`     | string | Yes      | userName        |
  | `password` | string | Yes      | userPasword     |

  - Response:

  ```
  If name not exists in database

  HTTP 1.1 200 OK
  Content-Type: application/json
  { 
    jwtToken,
    message: 'User successfully created.'
  }
  
  If name already exists in database

  HTTP 1.1 401 ERROR
  Content-Type: application/json

  { 
    error: 'User already exists'
  }

  ```


## Endpoint `api/users/signIn`: <a name="signIn"></a>

- Request: `POST api/users/signIn` - signIn

  - Query Parameters:
  
  | Parameter  | Type   | Required | Description     |
  |----------- |--------|----------|-----------------|
  | `name`     | string | Yes      | userName        |
  | `password` | string | Yes      | userPasword     |

  - Response:

  ```
  If user name === userName && password === userPassword

  HTTP/1.1 201 CREATED
  Content-Type: application/json
  {
    token: "jwtToken",
    message: 'User signed in successfully.'
  }

  If user name !== userName || password !== userPassword

  HTTP/1.1 401 Not Found
  Content-Type: application/json
  {
    error: "Invalid login or password"
  }
  ```
