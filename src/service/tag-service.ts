import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createTagValidation,
  getTagValidation,
  updateTagValidation,
} from "../validation/tag-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  title: string; 
}

// create tag service
const createTag = async (reqData: DataRegister) => {
  const tag = validate(createTagValidation, reqData);

  const countTag= await prismaClient.tag.count({
    where: {
      title: tag.title,
    },
  });

  if (countTag === 1) {
    throw new ResponseError(400, "Tag already exists");
  }

  const result = await prismaClient.tag.create({
    data: tag,
  });
  return result;
};

// get tags
const getTag = async () => {
  const result = await prismaClient.tag.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No tag  found!");
  }
};

// get tag by id
const getTagById = async (id: string) => {
  const tagId = validate(getTagValidation, id);
  const tag = await prismaClient.tag.findUnique({
    where: { id: tagId },
  });

  if (tag) {
    return tag;
  } else {
    throw new ResponseError(404, "No tag found!");
  }
};

//update tag
// type DataUpdate = {
//   title: string | null;
// };
const updateTag = async (id: string, reqData: DataRegister) => {
  id = validate(getTagValidation, id);
  const updateData = validate(updateTagValidation, reqData);
  const tagInDb = await prismaClient.tag.findUnique({
    where: {
      id,
    },
  });
  if (!tagInDb) {
    throw new ResponseError(404, "tag not found!");
  } else {
    const data = {} as DataRegister;

    data.title = updateData.title || tagInDb.title;

    const result = await prismaClient.tag.update({
      where: {
        id,
      },
      data: data,
    });

    return result;
  }
};

//delete tag

const deleteTag =async (id:string) => {
    id = validate(getTagValidation, id);

    const deleteTag = await prismaClient.tag.delete({
        where: {
          id,
        },
      })

      return deleteTag;


}



export default {
  createTag,
  getTag,
  getTagById,
  updateTag,
  deleteTag,
};
