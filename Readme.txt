API END-POINTS
---------------------------
1- GET all products (User-side)
   GET http://localhost:4600/api/products
   Description: Fetches all products for the user.

2 -POST register a user
   POST http://localhost:4600/api/register
   Description: Registers a new user.


3- POST login (User and Admin)
   POST http://localhost:4600/api/login
   Description: Logs in both user and admin.

4-POST add product to cart
  POST http://localhost:4600/api/:userid/cart
  Description: Adds a product to the user's cart (user ID passed in the URL).


5-GET individual cart of user
  GET http://localhost:4600/api/:userid/cart
  Description: Retrieves the individual cart for the user (user ID passed in the URL).


6-DELETE cart item
  DELETE http://localhost:4600/api/:userid/cart
  Description: Deletes a specific product from the user's cart (product ID passed in req.body, user ID passed in req.params).

7-GET admin's view of users' carts
  GET http://localhost:4600/api/admin/carts
  Description: Admin can view all users and their carted products.

8-POST send email notification to carted users (Admin)
  POST http://localhost:4600/api/admin/:userid/order
  Description: Admin sends an email notification to users who have items in their cart (user ID passed in req.params).

File cloning
-------------
->git clone https://github.com/anasask2001/Auxzon_Task.git

->save the file in a folder and follow below steps:- 


Backend start
--------------
->cd BACK-END
->npm install
->npm start

Frontend start
--------------
->cd FRONT-END
->npm install
->npm run dev
