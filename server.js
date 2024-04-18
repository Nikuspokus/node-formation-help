const express = require("express");
const customerRoutes = require("./customer_routes");
const app = express();

//middlewares appelés dans l'ordre
app.use((req, res, next) => {
  console.log(`Log horaire à chaque requête: `, Date.now());
  next();
});

express.json();
// CSS, js
app.use(express.static("public"));

express.urlencoded();

app.use("/", customerRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("erreur du serveur");
});

app.use(
  "/employee/:id?isActive=true",
  (req, res, next) => {
    res.send("Id de l'employé: ", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("Type de requête: ", req.query.isActive);
    next();
  }
);

// middleware pour une authentification
function authMiddleware(req, res, next) {
  console.log("Requête authentification");
  next();
}

// middleware envoi de logs
function logMiddleware(req, res, next) {
  console.log("Requête envoi de logs");
  next();
}

const middlewares = [authMiddleware, logMiddleware];

app.get("/", middlewares, (req, res) => {
  res.send("Bonjour voici mon server Express");
});

const server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Le serveur écoute sur http://${host}:${port}`);
});
