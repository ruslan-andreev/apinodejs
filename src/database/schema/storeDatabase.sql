CREATE DATABASE IF NOT EXISTS storedb;
USE storedb;

CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT NOT NULL,
  email VARCHAR(254) NOT NULL,
  userName VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  isAdmin BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  gender ENUM('male', 'female', 'unisex') NOT NULL,
  description TEXT NOT NULL,
  size INT NOT NULL,
  color VARCHAR(20) NOT NULL,
  category VARCHAR(20) NOT NULL,
  image VARCHAR(1000) NOT NULL,
  sale BOOLEAN DEFAULT false,
  quantity INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT NOT NULL,
  userId INT NOT NULL,
  productList JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS cartProduct (
  id INT AUTO_INCREMENT NOT NULL,
  cartId INT,
  productId INT,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cartId) REFERENCES cart(id),
  FOREIGN KEY (productId) REFERENCES product(id)
);

INSERT INTO `user` (email, userName, password, isAdmin)
 VALUES 
  ('someemail@gmail.com', 'Alex', '1234', true),
  ('bod@gmail.com', 'Bob', 'qwerty', false),
  ('kate@gmail.com','Kate', '12kfbds34', false),
  ('example1@gmail.com', 'John', '1234', true),
  ('example2@yahoo.com', 'Emma', '5678', false),
  ('example3@hotmail.com', 'Mike', 'abcd', true),
  ('example4@gmail.com', 'Sarah', '9876', false),
  ('example5@yahoo.com', 'David', 'qwerty', false),
  ('example6@gmail.com', 'Lisa', 'password', false),
  ('example7@hotmail.com', 'Alexey', '98653', false),
  ('example8@yahoo.com', 'Jessica', 'abcd1234', false),
  ('example9@gmail.com', 'Ryan', 'password123', false),
  ('example10@hotmail.com', 'Emily', '987654', false);

INSERT INTO `product` (title, price, gender, description, size, color, category, image, sale, quantity)
VALUES
  ('Product 1', 19.99, 'male', 'Description 1', 10, 'Red', 'shirt', 'url1', false, 100),
  ('Product 2', 29.43, 'female', 'Description 2', 8, 'Blue', 'trousers', 'url2', true, 50),
  ('Product 3', 10.26, 'unisex', 'Description 3', 12, 'Green', 'accessories', 'url3', false, 80),
  ('Product 4', 5.99, 'male', 'Description 4', 15, 'Black', 'shirt', 'url4', false, 10),
  ('Product 5', 40.82, 'female', 'Description 5', 5, 'Dark', 'trousers', 'url5', true, 20),
  ('Product 6', 19.90, 'female', 'Description 6', 40, 'Grey', 'trousers', 'url6', true, 15),
  ('Product 7', 64.99, 'male', 'Description 7', 23, 'Blue', 'trousers', 'url7', false, 8),
  ('Product 8', 5.32, 'unisex', 'Description 8', 46, 'White', 'accessories', 'url8', false, 18),
  ('Product 9', 53.17, 'male', 'Description 9', 32, 'Grey', 'trousers', 'url9', true, 53),
  ('Product 10', 17.60, 'unisex', 'Description 10', 10, 'White', 'accessories', 'url10', false, 11);

INSERT INTO cart (userId, productList)
VALUES (1, '[{"product_id": 1, "quantity": 2}, {"product_id": 2, "quantity": 1}]'),
       (2, '[{"product_id": 3, "quantity": 3}]'),
       (3, '[{"product_id": 4, "quantity": 1}, {"product_id": 5, "quantity": 2}]'),
       (4, '[{"product_id": 7, "quantity": 3}, {"product_id": 8, "quantity": 7}]'),
       (5, '[{"product_id": 8, "quantity": 3}, {"product_id": 1, "quantity": 7}]');      

INSERT INTO cartProduct (cartId, productId, quantity)
VALUES (1, 1, 2),
       (1, 2, 1),
       (2, 3, 3),
       (3, 4, 1),
       (3, 5, 2),
       (4, 7, 3),
       (4, 8, 7),
       (5, 8, 3);


/** User*/
CREATE PROCEDURE spGetAllUsers()
BEGIN
  SELECT id, email, userName, isAdmin 
  FROM user;
END;

CREATE PROCEDURE spGetUserById(id INT)
BEGIN
  SELECT id, email, userName, isAdmin
  FROM user
  WHERE user.id = id;
END;

CREATE PROCEDURE spGetUserByName(name VARCHAR(100))
BEGIN
  SELECT userName, password, isAdmin
  FROM  user
  WHERE user.userName = name;
END;

CREATE PROCEDURE spAddUser(email VARCHAR(254), userName VARCHAR(100), password VARCHAR(100), isAdmin BOOLEAN)
BEGIN
  INSERT INTO user (email, userName , password, isAdmin)
  VALUES (email, userName, password, isAdmin);
END;

/**Product*/
CREATE PROCEDURE spGetAllProducts()
BEGIN
  SELECT id, title, price, gender, description, size, color, category, image, sale, quantity
  FROM product;
END;

CREATE PROCEDURE spGetProductById(id INT)
BEGIN
  SELECT id, title, price, gender, description, size, color, category, image, sale, quantity
  FROM product
  WHERE product.id = id;
END;

CREATE PROCEDURE spAddProduct(title VARCHAR(255), price DECIMAL(10,2), gender ENUM('male', 'female', 'unisex'), description TEXT, size INT, color VARCHAR(20), category VARCHAR(20), image VARCHAR(1000), sale BOOLEAN, quantity INT)
BEGIN
  INSERT INTO product (title, price, gender, description, size, color, category, image, sale, quantity)
  VALUES (title, price, gender, description, size, color, category, image, sale, quantity);
END;

CREATE PROCEDURE spUpdateProductById(id INT, title VARCHAR(255), price DECIMAL(10,2), gender ENUM('male', 'female', 'unisex'), description TEXT, size INT, color VARCHAR(20), category VARCHAR(20), image VARCHAR(1000), sale BOOLEAN, quantity INT)
BEGIN
  UPDATE product
  SET product.title = title, product.price = price, product.gender = gender, product.description = description, product.size = size, product.color = color, product.category = category, product.image = image, product.sale = sale, product.quantity = quantity
  WHERE product.id = id;
END;

CREATE PROCEDURE spDeleteProductById(id INT)
BEGIN
  DELETE FROM product
  WHERE product.id = id;
END;

CREATE PROCEDURE spGetProductsByCategory(category VARCHAR(20))
BEGIN
  SELECT id, title, price, gender, description, size, color, category, image, sale, quantity
  FROM product
  WHERE product.category = category;
END;

CREATE PROCEDURE spGetProductsByQueryParams(gender ENUM('male', 'female', 'unisex'), category VARCHAR(20), sale BOOLEAN)
BEGIN
  SELECT id, title, price, gender, description, size, color, category, image, sale, quantity
  FROM product
  WHERE (gender IS NULL OR product.gender = gender)
    AND (category IS NULL OR product.category = category)
    AND (sale IS NULL OR product.sale = sale);
END;

/**Cart*/
CREATE PROCEDURE spGetAllCarts()
BEGIN
  SELECT c.id AS cartId, c.userId, JSON_ARRAYAGG(JSON_OBJECT('title', p.title, 'quantity', cp.quantity)) AS productList
  FROM cart AS c
  JOIN cartProduct AS cp ON c.id = cp.cartId
  JOIN product AS p ON cp.productId = p.id
  GROUP BY c.id, c.userId;
END;

CREATE PROCEDURE spGetCartByUserId(Id INT)
BEGIN
SELECT c.id AS cartId, c.userId, JSON_ARRAYAGG(JSON_OBJECT('title', p.title, 'quantity', cp.quantity)) AS productList
  FROM cart AS c
  JOIN cartProduct AS cp ON c.id = cp.cartId
  JOIN product AS p ON cp.productId = p.id
  WHERE c.userId = Id
  GROUP BY c.id, c.userId;
END;


