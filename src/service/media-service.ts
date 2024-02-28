import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createMediaValidation,
  getMediaValidation,
  updateMediaValidation,
} from "../validation/media-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  url: string;
  type: string;
  tour_Package_id: string;
}

// create media service
const createMedia = async (reqData: DataRegister) => {
  const media = validate(createMediaValidation, reqData);

  const countMedia = await prismaClient.media.count({
    where: {
      url: media.url,
    },
  });

  if (countMedia === 1) {
    throw new ResponseError(400, "Media already exists");
  }

  const result = await prismaClient.media.create({
    data: media,
  });
  return result;
};

// get media
const getMedia = async () => {
  const result = await prismaClient.media.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No media  found!");
  }
};

// get media by id
const getMediaById = async (id: string) => {
  const mediaId = validate(getMediaValidation, id);
  const media = await prismaClient.media.findUnique({
    where: { id: mediaId },
  });

  if (media) {
    return media;
  } else {
    throw new ResponseError(404, "No media found!");
  }
};

//update media
// type DataUpdate = {
//   title: string | null;
// };
const updateMedia = async (id: string, reqData: DataRegister) => {
  id = validate(getMediaValidation, id);
  const updateData = validate(updateMediaValidation, reqData);
  const mediaInDb = await prismaClient.media.findUnique({
    where: {
      id,
    },
  });
  if (!mediaInDb) {
    throw new ResponseError(404, "media not found!");
  } else {
    // const data = {} as DataRegister;

    // data.url = updateData.title || mediaInDb.url;
    // data.type = updateData.title || mediaInDb.type;
    // data.tour_Package_id = updateData.title || mediaInDb.tour_Package_id;

    const result = await prismaClient.media.update({
      where: {
        id,
      },
      data: updateData,
    });

    return result;
  }
};

//delete media

const deleteMedia = async (id: string) => {
  id = validate(getMediaValidation, id);

  const deleteMedia = await prismaClient.media.delete({
    where: {
      id,
    },
  });

  return deleteMedia;
};

export default {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};
