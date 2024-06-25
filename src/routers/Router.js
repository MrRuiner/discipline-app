import { Router } from "express";
import { getRoutine, addRoutine } from "../controllers/addRoutine.controller.js";

export const router = Router();

router.get("/", getRoutine); 
router.post('/add', addRoutine)

export default router;