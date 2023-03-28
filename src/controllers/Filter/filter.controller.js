import { Anime } from "../../models/Anime/anime.model.js";
import { Manga } from "../../models/Manga/manga.model.js";
import { Manhua } from "../../models/Manhua/manhua.model.js";
import { Manhwa } from "../../models/Manhwa/manhwa.model.js";
import { Op } from "sequelize";

export const filtersGeneral = async (req, res) => {
  let queries = req.query;
  let type = "Anime";

  let page = 1;
  let limit = 24;

  let searchQuery = {};

  if (queries.genres) {
    searchQuery.genres = {
      [Op.contains]: [queries.genres.split(",")],
    };
  }

  if (queries.limit) {
    limit = queries.limit;
  }

  if (queries.page) {
    page = queries.page;
  }

  if (queries.type) {
    type = queries.type;
  }

  if (queries.demography) {
    searchQuery.demography = queries.demography;
  }

  if (queries.status) {
    searchQuery.status = queries.status;
  }

  const { result, count } = await filterAndPaginateContent(
    type,
    searchQuery,
    page,
    limit
  );

  return res.json({ count, result });
};

export const filterTitle = async (req, res) => {
  const { title } = req.query;
  const anime = await Anime.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });
  const manga = await Manga.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });
  const manhua = await Manhua.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });
  const manhwa = await Manhwa.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });
  const result = anime.concat(manga, manhua, manhwa);
  res.json(result);
};

export const pagination = async (req, res) => {
  const { page, limit } = req.query;
  const anime = await Anime.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });
  const manga = await Manga.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });
  const manhua = await Manhua.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });
  const manhwa = await Manhwa.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });
  const result = anime.concat(manga, manhua, manhwa);
  res.json(result);
};

const filterAndPaginateContent = async (
  type = "Anime",
  filters,
  page,
  limit
) => {
  let searchFilters = {
    where: filters,
    offset: (page - 1) * limit,
    limit,
  };

  let result = [];
  let count = 0;

  switch (type) {
    case "Anime":
      const animes = await Anime.findAndCountAll(searchFilters);
      result = animes.rows;
      count = animes.count;

      break;
    case "Manga":
      const mangas = await Manga.findAndCountAll(searchFilters);
      result = mangas.rows;
      count = mangas.count;
      break;

    case "Manhua":
      const manhuas = await Manhua.findAndCountAll(searchFilters);
      result = manhuas.rows;
      count = manhuas.count;
      break;
    case "Manhwa":
      const manhwas = await Manhwa.findAndCountAll(searchFilters);
      result = manhwas.rows;
      count = manhwas.count;
      break;

    default:
      searchFilters.limit /= 4;

      const AllAnimes = await Anime.findAndCountAll(searchFilters);
      const AllMangas = await Manga.findAndCountAll(searchFilters);
      const AllManhwas = await Manhwa.findAndCountAll(searchFilters);
      const AllManhuas = await Manhua.findAndCountAll(searchFilters);

      console.log("animes", AllAnimes.count);
      console.log("mangas", AllMangas.count);
      console.log("manhwas", AllManhwas.count);
      console.log("manhuas", AllManhuas.count);

      console.log("animes regresa", AllAnimes.rows.length);
      console.log("mangas regresa", AllMangas.rows.length);
      console.log("manhwas regresa", AllMangas.rows.length);
      console.log("manhuas regresa", AllManhuas.rows.length);

      result = AllAnimes.rows.concat(
        AllMangas.rows,
        AllManhwas.rows,
        AllManhuas.rows
      );

      console.log("final total", result.length);

      count +=
        AllAnimes.count + AllMangas.count + AllManhuas.count + AllManhwas.count;

      break;
  }

  return { result, count };
};
