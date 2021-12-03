export const uploadImage = async (
  picture: File,
  signature: string,
  timestamp: number
) => {
  const url = `https://api.cloudinary.com/v1_1/da91pbpmj/upload`;

  console.log("PICTURE: ", picture, signature, timestamp);
  const formData = new FormData();
  formData.append("file", picture);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", "446621691525293");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  const data = response.json();
  console.log("CLOUDINARY: ", data);
  return data;
};
