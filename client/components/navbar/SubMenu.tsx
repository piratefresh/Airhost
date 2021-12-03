import React from "react";
import Link from "next/link";

type Props = {
  imageSrc: string;
  menuLabel: string;
  menuHref: string;
};

function SubMenu({ imageSrc, menuLabel, menuHref }: Props) {
  return (
    <div className="relative h-40 w-64">
      <img
        className="object-cover rounded-lg cursor-pointer w-full h-full hover:scale-150"
        src={imageSrc}
        alt=""
      />
      <div className="absolute bg-black bg-opacity-30 w-full h-full top-0 left-0"></div>
      <Link href={menuHref}>
        <a
          className="absolute text-white font-bold text-xl z-10"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {menuLabel}
        </a>
      </Link>
    </div>
  );
}

export default SubMenu;
