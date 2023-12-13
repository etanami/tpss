import express from "express";

import router from "./src/routes/split-payments.route.js";

const app = express();

app.use(express.json());

app.use("/split-payments", router);

export default app;
