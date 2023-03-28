import { Router } from "express";
import {
  createManhwa,
  deleteManhwa,
  getManhwas,
  getManhwasById,
  updateManhwa,
  lastManhwas,
} from "../../controllers/Manhwa/Manhwa.controller.js";
import veryToleken from "../../Helpers/valide.js";
const router = Router();

router.get("/manhwas", getManhwas);
router.get("/manhwa/:id", getManhwasById);
router.get("/lastmanhwas", lastManhwas);
router.post("/manhwa", veryToleken, createManhwa);
router.patch("/manhwa/:id", veryToleken, updateManhwa);
router.delete("/manhwa/:id", veryToleken, deleteManhwa);

export default router;
