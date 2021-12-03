import React from "react";

type RarityType = {
  rarity: Number;
};

export default function RarityNumber({ rarity }: RarityType) {
  if (rarity < 2) {
    return <div className="text-green-500">{rarity}</div>;
  } else if (rarity >= 2 && rarity < 5) {
    return <div className="text-purple-500">{rarity}</div>;
  } else if (rarity >= 5) {
    return <div className="text-orange-500">{rarity}</div>;
  } else {
    return <div className="text-gray-400">{rarity}</div>;
  }
}
