import express from "express"
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson)
router.get("/Movie/:query", searchMovie)
router.get("/Tv/:query", searchTv)
router.get("/history", getSearchHistory)
router.delete("/history/:id", removeItemFromSearchHistory)

export default router;