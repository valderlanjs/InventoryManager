"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseControler_1 = require("../controllers/expenseControler");
const router = (0, express_1.Router)();
router.get("/", expenseControler_1.getExpensesByCategory);
exports.default = router;
