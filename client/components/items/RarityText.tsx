import React from "react";

type RarityTextType = {
  rarity: String;
};

export default function RarityText({ rarity }: RarityTextType) {
  if (rarity === "Rare") {
    return <div className="text-green-500">{rarity}</div>;
  } else if (rarity === "Epic") {
    return <div className="text-purple-500">{rarity}</div>;
  } else if (rarity === "Legendary") {
    return <div className="text-orange-500">{rarity}</div>;
  } else {
    return <div className="text-gray-400">{rarity}</div>;
  }
}
