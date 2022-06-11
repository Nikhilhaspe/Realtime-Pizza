
# Realtime Pizza Ordering System
The idea behind this application is to handle orders given by the customers 
to pizzeria online and managing realtime status between customers and admin 
(i.e. Pizzeria Owner) with the help of web sockets. 
Note that web page is responsive as well.

## Technical Overview
This is project built using **Node.js** and it uses the data stored in the database.
All menu information, users, orders are stored in the **MongoDB** database.

## Working of the website

### Customer side
This is how web site look like when **customer** visits web site.
![This is an image](/screenshots/customer.gif)

### Admin side
User interface for **admin** (i.e. Pizzeria Owner)
![This is an image](/screenshots/customer.gif)


## How to run this project?
* Install Node.js from official website. I recommend download LTS version.
* Install MongoDB Compass from official website.
* Create new database and import data to that database by using this [JSON](https://drive.google.com/file/d/1rUzOvYlVh_xO4ConfSuhRzt6cn8xUZIf/view) file.
* Clone this repository.
* Go to the terminal and enter yarn watch to run bundling of files.
* After that enter yarn dev to run development server.
* Finally, in any browser go to localhost (http://localhost:3000/).
* If you encounter any error during these steps see notes section below.

## Note
* Before running this project make sure that you have installed yarn and all the dependencies of the project.
* Make sure that you have configured database properally with given [JSON](https://drive.google.com/file/d/1rUzOvYlVh_xO4ConfSuhRzt6cn8xUZIf/view) file.
* This project can be converted to any other Online Food Ordering System as well.

## Future Work
* Adding UPI Payments support

## References
* [YouTube Explaination](https://www.youtube.com/playlist?list=PLXQpH_kZIxTVRmXQN9J0Az76te5mAreLV)

**Happy Development ❤️**
