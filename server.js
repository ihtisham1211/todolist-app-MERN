const express = require("express");
const connectToDb = require("./Database/db");
var cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
connectToDb();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/user", require("./routers/user"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/task", require("./routers/task"));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
    app.use(express.static('client/build'));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
