import express from "express";
import { memoController } from "./app";
import { isLoggedInAPI } from "./guard";

export const memoRoutes = express.Router();

memoRoutes.get("/", memoController.getMemos);
memoRoutes.post("/", memoController.postMemos);
memoRoutes.put("/:id", isLoggedInAPI, memoController.updateMemo);
memoRoutes.delete("/:id", isLoggedInAPI, memoController.deleteMemo);
