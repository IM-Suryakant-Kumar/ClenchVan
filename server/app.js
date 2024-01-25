require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const app = express();
// constant
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("tiny"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
	try {
		app.listen(PORT, () =>
			console.log(`Server is listening on port ${PORT}...`)
		);
	} catch (error) {
		console.log(error);
	}
};
start();
