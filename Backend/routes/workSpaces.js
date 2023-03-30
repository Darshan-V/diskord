import { getWorkSpaceList } from "../controllers/workspaces.js"
import express from "express"
import "../models/workspaces.js"

export const router = express.Router()

router.get("/", getWorkSpaceList)
