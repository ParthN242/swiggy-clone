import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdCloudUpload } from "react-icons/md";

const FoodImage = ({ image, setImage }) => {
  const [imagePreview, setImagePreview] = useState("");

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(imageFile);
  };

  const deleteImgHandler = () => {
    setImage("");
  };

  useEffect(() => {
    if (image) {
      setImagePreview(image);
    }
  }, [image]);

  return (
    <>
      {image ? (
        // Image
        <div className="flex items-center justify-center gap-2 h-full">
          <img src={imagePreview} alt="img" className="h-full object-cover" />
          <button
            type="button"
            className="self-end bg-red-500 rounded-full p-5 mb-4 -ml-20"
            onClick={deleteImgHandler}
          >
            <MdDeleteOutline className="text-white text-xl" />
          </button>
        </div>
      ) : (
        // Default
        <label
          htmlFor="file-upload"
          className="flex flex-col gap-4 items-center justify-center h-full"
        >
          <MdCloudUpload className="text-3xl text-gray-500 " />
          <p className="text-lg font-semibold text-gray-400">
            Click here to upload
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG or GIF (MAX. 800x400px)
          </p>
          <input
            type="file"
            name="file-upload"
            id="file-upload"
            accept="image/*"
            className="hidden"
            onChange={(e) => uploadImage(e)}
          />
        </label>
      )}
    </>
  );
};

export default FoodImage;
