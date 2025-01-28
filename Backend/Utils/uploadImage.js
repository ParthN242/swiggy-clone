const cloudinary = require("cloudinary").v2;
const uuid = require("uuid").v4;

const uploadImage = async (image) => {
  const result = await cloudinary.uploader.upload(
    `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
    {
      folder: "swiggy/food",
      resource_type: "auto",
      publicId: uuid(),
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return result;
};

module.exports = uploadImage;
