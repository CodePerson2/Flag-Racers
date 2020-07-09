const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const Http = require("http").Server(express);
const Socketio = require("socket.io")(Http);

var app = express()
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var position = {
    x: 200,
    y: 200
};

Socketio.on("connection", socket => {
  socket.emit("position", position);
});

Http.listen(3000, () => {
  console.log("Listening at :3000...");
});
