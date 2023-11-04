const asyncHandler = require("express-async-handler");
const parse = require("pdf-parse")

const extract = asyncHandler(async (req, res) => {
    if (!req.files && !req.files.pdf) {
        return res.status(400).send({ message: "No file received on server's end", status: "error" });
    }

    const result = await parse(req.files.pdf);
    res.send(result.text);
});

module.exports = {
    extract
};