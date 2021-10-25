const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");


const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Qlik Cloud Audition Project - Express API with Swagger",
//             version: "0.1.0",
//             description: "This is a simple CRUD API application made with Express and documented with Swagger",
//             license: {
//                 name: "MIT",
//                 url: "https://spdx.org/licenses/MIT.html",
//             },
//             contact: {
//                 name: "eugene wolfman",
//                 email: "j2006il@walla.co.il",
//             },
//         },
//         servers: [{
//             url: "http://localhost:3000/messages",
//         }, ],
//     },
//     apis: ["./routes/user.js"],
// };

// const specs = swaggerJsdoc(options);
// app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
// );


server.on("listening", onListening);
server.listen(port);