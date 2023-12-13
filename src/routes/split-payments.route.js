import express from "express";

import { splitPayment } from "./split-payments.controller.js";

const router = express.Router();

router.post("/compute", splitPayment);

export default router;