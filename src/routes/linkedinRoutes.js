import express from "express";
import {
  redirectToLinkedIn,
  linkedinCallback
} from "../controller/linkedinController.js";

const router = express.Router();

router.get("/linkedin", redirectToLinkedIn);
router.get("/linkedin/callback", linkedinCallback);

export default router;