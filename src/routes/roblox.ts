import { Router } from "express";
import { getMessages } from "../services/robloxBridge";

const router = Router();

router.get("/messages", (req, res) => {
  const after = parseInt(req.query.after as string) || 0;

  const newMessages = getMessages(after);

  res.json(newMessages);
});

export default router;