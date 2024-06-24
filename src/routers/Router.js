import { Router } from "express";
import { getMainPage } from "../controllers/pages.controller.js";

const router = Router()

router.get("/", getMainPage)

export default router