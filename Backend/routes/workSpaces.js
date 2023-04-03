import express from "express"
import { getWorkSpaceList } from "../controllers/workspaces.js"

export const router = express.Router()

router.get("/", getWorkSpaceList)
