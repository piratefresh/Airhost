export const uploadImage = async (picture: File) => {
  const formData = new FormData();
  formData.append("file", picture);
  formData.append("upload_preset", "beersocial");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = response.json();
  console.log(data);
};
