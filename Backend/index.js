require("dotenv").config();
const app = require("./app");
const PORT = 5070;

app.listen(PORT, function () {
  console.log("App is running at port 5070");
});

console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging