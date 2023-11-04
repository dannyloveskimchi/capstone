const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const corsOptions = require("./Configs/corsOptions");

const { logger } = require("./Middleware/logger");
const errorHandler = require("./Middleware/errorHandler");

const appRoutes = require("./Routes/appRoutes");

const app = express();
const PORT = 5001;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(fileUpload())

app.use("/", appRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server initialized on port: http://localhost:${PORT}`);
});