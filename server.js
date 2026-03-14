const express = require("express");
const cors = require("cors");

const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api",searchRoutes);

app.listen(3000,()=>{
 console.log("Server running on port 3000");
});