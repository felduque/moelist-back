import { Router } from "express";
import {
  createScan,
  getScan,
  getScans,
  updateScan,
} from "../../controllers/Scan/scan.controller.js";
import veryToleken from "../../Helpers/valide.js";

const router = Router();

router.post("/scans", veryToleken, createScan);
router.get("/scan", getScans);
router.get("/scan/:id", getScan);
router.put("/scan/:id", veryToleken, updateScan);

export default router;
