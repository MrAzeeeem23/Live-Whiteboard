import express from "express"
import { getRoomId, joinRoom } from "../controllers/roomRoute.controller.js";
const router = express.Router();

router.get("/:roomId", getRoomId);
router.post('/join', joinRoom);

export default router;

