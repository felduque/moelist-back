import { Scan } from "../../models/Scan/scan.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createScan = async (req, res) => {
  try {
    const { name, url } = req.body;

    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/afiliados/" + img?.name;
    img?.mv(pathImage);
    let urlimg = (pathImage =
      "https://apix.moelist.online//afiliados/" + img?.name);
    if (!img)
      urlimg =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
    const scan = await Scan.create({
      name,
      image: urlimg,
      url,
    });
    res.status(201).json(scan);
  } catch (error) {
    console.log(error);
  }
};

export const getScans = async (req, res) => {
  try {
    const scans = await Scan.findAll();
    res.status(200).json(scans);
  } catch (error) {
    console.log(error);
  }
};

export const getScan = async (req, res) => {
  try {
    const { id } = req.params;
    const scan = await Scan.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(scan);
  } catch (error) {
    console.log(error);
  }
};

export const updateScan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;
    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/afiliados/" + img?.name;
    img?.mv(pathImage);
    let urlimg = (pathImage =
      "https://apix.moelist.online//afiliados/" + img?.name);
    if (!img)
      url =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
    const scan = await Scan.update(
      {
        name,
        image: urlimg,
        url,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json(scan);
  } catch {
    console.log(error);
  }
};

export const deleteScan = async (req, res) => {
  try {
    const { id } = req.params;
    const scan = await Scan.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(scan);
  } catch (error) {
    console.log(error);
  }
};
