import { NextApiRequest, NextApiResponse } from "next";

const cloudinary = require("cloudinary").v2;

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const timestamp: number = Math.round(new Date().getTime() / 1000);
  const signature: string = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
  res.statusCode = 200;
  res.json({ signature, timestamp });
  return { timestamp, signature };
};
