## Database Structure

## Database Schema

  dataBase.png

## Data relationships

  - User is one-to-one with cart, one user can have one cart
  - Cart many-to-many with product, one cart can have many connections with many products, one
    product can have multiple connections to one or more carts
  - CartProduct many-to-many with carts and products


### product
```
| Key | Column      | Data Type                            |  Description                       |
|-----|----------------------------------------------------|------------------------------------|
| PK  | id          | INT AUTO_INCREMENT NOT NULL          | PK for product record              |
|     | title       | VARCHAR(255) NOT NULL                | Title of product                   |
|     | price       | DECIMAL(10, 2) NOT NULL              | Price of product                   |
|     | gender      | ENUM NOT NULL                        | Gender typs [male||female||unisex] |
|     | description | TEXT NOT NULL                        | Descriptin of product              |
|     | size        | INT  NOT NULL                        | Size of product                    |
|     | color       | VARCHAR(20) NOT NULL                 | Color of product                   |
|     | category    | VARCHAR(20) NOT NULL                 | Category of product                |
|     | image       | VARCHAR(1000) NOT NULL               | URL to CDN with image              | 
|     | sale        | BOOLEAN DEFAULT false                | Product on sale or not             |
|     | quantity    | INT NOT NULL                         | Quantity of available products     |
|     | createdAt   | TIMESTAMP DEFAULT CURRENT_TIMESTAMP  | Record creation date               |
|     | updatedAt   | TIMESTAMP DEFAULT CURRENT_TIMESTAMP  | Record update date                 |
|     |             | ON UPDATE CURRENT_TIMESTAMP                                               |
```

### user
```
| Key | Column       | Data Type                            | Description                    |
|-----| ------------ | ----------------------------------------------------------------------|
| PK  | id           | INT AUTO_INCREMENT NOT NULL          | PK for user record             |
|     | email        | VARCHAR(254) NOT NULL                | User email                     |
|     | userName     | VARCHAR(100) NOT NULL                | Name of user                   |
|     | password     | VARCHAR(100) NOT NULL                | Password of user               |
|     | isAdmin      | BOOLEAN DEFAULT FALSE                | Boolean value for admin status | 
|     | createdAt    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP  | Record creation date           |
|     | updatedAt    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP  | Record update date             |
|     |              | ON UPDATE CURRENT_TIMESTAMP          |                                |
```              

### cart

```
| Key | Column       | Data Type                             | Description              |
|-----| ------------ | -----------------------------------------------------------------|
| PK  | id           | INT AUTO_INCREMENT NOT NULL           | PK for user record       |
| FK  | userId       | INT                                   | User's id                |
|     | productList  | JSONB                                 | List of products in cart |
|     | createdAt    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP   | Record creation date     |
|     | updatedAt    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP   | Record update date       |
|     |              | ON UPDATE CURRENT_TIMESTAMP           |                          |

```

### cartProduct

```
| Key | Column       | Data Type                             | Description              |
|-----| ------------ | -----------------------------------------------------------------|
| PK  | id           | INT  AUTO_INCREMENT NOT NULL          |  PK for cartProduct      |
| FK  | cartId       | INT                                   |  FK of cart_id           |
| FK  | productId    | INT                                   |  FK of product_id        |
|     | quantity     | INT NOT NULL                          |  quantity of product     |
|     | createdAt    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP   | Record creation date     |
|     | updatedAt    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP   | Record update date       |
|     |              | ON UPDATE CURRENT_TIMESTAMP           |                          |
```

