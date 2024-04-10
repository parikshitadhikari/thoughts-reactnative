import express from "express"
import { addThought } from "../controllers/thoughtController.js"

const router = express.Router()

router.post("/add", addThought)

export default router