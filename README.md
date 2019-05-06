# loopback-deadlift

A minimal and clean Data Abstraction Layer to access Loopback models.

## Purpose
It enables the user to access loopback models in other server side applications. It is like the loopback's AngularJs SDK but for server side. Currently, the way it is done is to use the REST APIs exposed by loopback. This library is a wrapper over the these rest endpoints.
## Usage
```javascript
const backendUrl = "http://localhost:3000/api";
const deadlift = require("deadlift")(backendUrl);

let accessToken = "123"; // loopback's accessToken

let { 
  getInstances,
  deleteInstanceById,
  addInstance,
  updateInstance
} = deadlift(accessToken); // Exposes a set of functions with Authorization using loopbacks accessToken.

getInstances("book", {price:700}, lbCallback); 
// book.find({where:{price:700}}, ...)

deleteInstanceById("book",3, lbCallback); 
// book.destroyById(3, ...)

addInstance("book",{name: "Harry Potter", price: 400}, lbCallback)
// book.create({name: "Harry Potter", price: 400}, ...)

updateInstance("book", {id:3, genre:"Fiction",name: "Harry Potter", price:400}, lbCallback); 
// book.updateAll({id:3, genre:"Fiction",name: "Harry Potter", price:400}, ...)

function lbCallback(err, data) {
    console.log(err || data);
}
```


