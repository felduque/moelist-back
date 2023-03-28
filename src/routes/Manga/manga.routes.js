import { Router } from "express";
import {
  createManga,
  getMangaById,
  getMangas,
  updateManga,
  deleteManga,
  lastMangas,
} from "../../controllers/Manga/manga.controller.js";
import veryToleken from "../../Helpers/valide.js";
const router = Router();

router.get("/mangas", getMangas);
router.get("/lastmangas", lastMangas);
router.get("/manga/:id", getMangaById);
router.post("/manga", veryToleken, createManga);
router.patch("/manga/:id", veryToleken, updateManga);
router.delete("/manga/:id", veryToleken, deleteManga);
export default router;
