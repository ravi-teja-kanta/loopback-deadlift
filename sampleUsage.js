const backendUrl = "http://localhost:3000/api";
const deadlift = require("./deadlift")(backendUrl);

let accessToken = "123";
let backend = deadlift(accessToken);

backend.getInstances("book", {price:700}, lbCallback);
// backend.deleteInstanceById("book",3,lbCallback);
// backend.addInstance("book",{name: "Harry Potter", price: 400}, lbCallback)
// backend.updateInstance("book", {id:3, genre:"Fiction",name: "Harry Potter", price:400}, lbCallback);
function lbCallback(err, data) {
    console.log(err || data);
}