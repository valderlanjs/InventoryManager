import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseControler";

const router = Router();

router.get("/", getExpensesByCategory);


export default router;