import { Router } from "express";

import {
  filtersGeneral,
  filterTitle,
  pagination,
} from "../../controllers/Filter/filter.controller.js";

const router = Router();

// Routes

router.get("/filter", filtersGeneral);
router.get("/filter/title", filterTitle);
router.get("/pagination", pagination);

export default router;
