import { Anime } from "../../models/Anime/anime.model.js";
import { Scan } from "../../models/Scan/scan.model.js";
import { User } from "../../models/User/user.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createAnime = async (req, res) => {
  try {
    const {
      title, // ✔️
      description, // ✔️
      status, // ✔️
      type, // ✔️
      episodes, // ✔️
      day, // ✔️
      rating,
      premiered, // ✔️
      duration, // ✔️
      genres, // ✔️
      studios, // ✔️
      producers, // ✔️
      demography, // ✔️
      source, // ✔️
      score,
      popularity,
      members,
      author, // ✔️
      artist, // ✔️
      favorites,
      season, // ✔️
      urlContent, // ✔️
      trailer,
      authorId,
      opening,
      scanId, // ✔️
    } = req.body;

    const img = req.files?.image; // ✔️
    let pathImage = __dirname + "/../../public/anime/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage =
      "https://apix.moelist.online//anime/img/" + img?.name);
    if (!img) url = "google.com";

    const anime = await Anime.create(
      {
        title,
        description,
        image: url,
        status,
        type,
        episodes,
        day,
        rating,
        premiered,
        duration,
        genres,
        studios,
        producers,
        demography,
        source,
        score,
        popularity,
        members,
        author,
        authorId,
        artist,
        favorites,
        season,
        trailer,
        opening,
        urlContent,
        scanId,
      },
      {
        includes: [
          {
            model: Scan,
            as: "scanId",
            attributes: ["id"],
          },
          {
            model: User,
            as: "authorId",
            attributes: ["id"],
          },
        ],
      }
    );

    res.status(200).json(anime);
  } catch (error) {
    console.log(error);
  }
};

export const lastAnime = async (req, res) => {
  try {
    const anime = await Anime.findAll({
      order: [["id", "DESC"]],
      limit: 4,
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "status",
        "type",
        "episodes",
        "day",
        "rating",
        "premiered",
        "duration",
        "genres",
        "studios",
        "producers",
        "demography",
        "source",
        "score",
        "popularity",
        "members",
        "author",
        "artist",
        "favorites",
        "season",
        "trailer",
        "opening",
        "urlContent",
        "contentType",
      ],
      include: [
        {
          model: Scan,
          as: "Scan",
          attributes: ["id", "name", "url", "image"],
        },
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "userName",
            "avatar",
            "paypal",
            "binanceId",
            "twitter",
          ],
        },
      ],
    });
    res.json(anime);
  } catch (error) {
    console.log(error);
  }
};

export const getAnimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findOne({
      where: { id },
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "status",
        "type",
        "episodes",
        "day",
        "rating",
        "premiered",
        "duration",
        "genres",
        "studios",
        "producers",
        "demography",
        "source",
        "score",
        "popularity",
        "members",
        "author",
        "artist",
        "favorites",
        "season",
        "trailer",
        "opening",
        "urlContent",
        "contentType",
      ],
      include: [
        {
          model: Scan,
          as: "Scan",
          attributes: ["id", "name", "url", "image"],
        },
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "userName",
            "avatar",
            "paypal",
            "binanceId",
            "twitter",
          ],
        },
      ],
    });
    res.json(anime);
  } catch (error) {
    console.log(error);
  }
};

export const updateAnime = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      type,
      episodes,
      day,
      rating,
      premiered,
      duration,
      genres,
      studios,
      producers,
      demography,
      source,
      score,
      popularity,
      members,
      author,
      artist,
      favorites,
      season,
      trailer,
      urlContent,
      opening,
    } = req.body;

    const img = req.files?.image;

    let pathImage = __dirname + "/../../public/anime/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online/anime/" + img?.name);
    if (!img) url = "google.com";

    const anime = await Anime.update(
      {
        title,
        description,
        image: url,
        status,
        type,
        episodes,
        day,
        rating,
        premiered,
        duration,
        genres,
        studios,
        producers,
        demography,
        source,
        score,
        popularity,
        members,
        author,
        artist,
        urlContent,
        favorites,
        season,
        trailer,
        opening,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json(anime);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnime = async (req, res) => {
  try {
    const { id } = req.params;
    const anime = await Anime.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(anime);
  } catch (error) {
    console.log(error);
  }
};

export const getAllInfo = async (req, res) => {
  try {
    const anime = await Anime.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "status",
        "type",
        "episodes",
        "day",
        "rating",
        "premiered",
        "duration",
        "genres",
        "studios",
        "producers",
        "demography",
        "source",
        "score",
        "popularity",
        "members",
        "author",
        "artist",
        "favorites",
        "season",
        "trailer",
        "opening",
        "urlContent",
        "contentType",
      ],
      include: [
        {
          model: Scan,
          as: "Scan",
          attributes: ["id", "name", "url", "image"],
        },
      ],
    });
    res.json(anime);
  } catch (error) {
    console.log(error);
  }
};
