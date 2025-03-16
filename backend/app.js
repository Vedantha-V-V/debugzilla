const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRoutes = require("./routes/user.routes");
const submissionRoutes = require("./routes/submission.routes");
const aiReviewRoutes = require("./routes/ai.routes.js");
const executeRoutes = require("./routes/execution.routes");

app.use("/api", userRoutes);
app.use("/api", submissionRoutes);
app.use("/api", aiReviewRoutes);
app.use("/api", executeRoutes);

module.exports = { app };
