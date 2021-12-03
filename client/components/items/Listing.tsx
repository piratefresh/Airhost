import React from "react";
import { Maybe } from "../../generated/graphql";
import RarityNumber from "./RarityNumber";
import RarityText from "./RarityText";

const rowStyles = {
  backgroundImage: `url("./1atable.png")`,
  backgroundSize: "100% 73px",
  backgroundRepeat: "no-repeat",
  height: "73px",
};

type ItemType = {
  id: number;
  name: string;
  rarity: number;
  rarityText: string;
  price: number;
  description: string;
  type: string;
  source: string;
  encumbrance: number;
  createdAt: string;
  updatedAt: string;
  image?: Maybe<string> | undefined;
};

interface IListingProps {
  item: ItemType;
}

const Listing = ({ item }: IListingProps) => {
  const [isExpanded, setIsExpanded] = React.useState<Boolean>(false);

  const handleIsExpanded = () => {
    setIsExpanded((currentIsExpanded) => !currentIsExpanded);
  };

  if (item) {
    console.log(item);
  }
  return (
    <>
      <div className="flex justify-start p-4" style={rowStyles}>
        <div>
          <img
            className="w-10 h-10 rounded-sm"
            src={`${item.image ? item.image : "./weapon.jpg"}`}
          />
        </div>

        <div className="ml-2" style={{ width: "100%", maxWidth: "350px" }}>
          <div
            className="capitalize font-semibold"
            // style={{ marginTop: "-4px" }}
          >
            {item.name}
          </div>
          <div className="text-sm text-gray-400">
            <RarityText rarity={item.rarityText}></RarityText>
          </div>
        </div>

        <div style={{ width: "100px" }}>{item.type}</div>

        <div style={{ width: "350px" }}>{item.source}</div>
        <div style={{ width: "100px" }}>
          <RarityNumber rarity={item.rarity}></RarityNumber>
        </div>
        <div style={{ width: "100px" }}>{item.price}</div>
        <div style={{ width: "200px" }}>{item.encumbrance}</div>

        {!isExpanded ? (
          <div
            className="font-bold text-2xl text-blue-600 cursor-pointer"
            onClick={handleIsExpanded}
          >
            +
          </div>
        ) : (
          <div
            className="font-bold text-2xl text-blue-600 cursor-pointer"
            onClick={handleIsExpanded}
          >
            -
          </div>
        )}
      </div>
      {isExpanded ? (
        <div
          className="p-4 bg-white"
          style={{
            width: "calc(100% - 10px)",
            borderLeft: "1px solid #ECE9E9",
            borderRight: "1px solid #ECE9E9",
          }}
        >
          {item.description}
        </div>
      ) : null}
    </>
  );
};

export default Listing;
