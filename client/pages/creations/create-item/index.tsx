import React from "react";
import SiteLayout from "../../../components/siteLayout";
import { PrimaryButton } from "../../../components/items/Button";
import CreateItemForm from "../../../components/items/createItemForm";

const backgroundStyle = {
  background: `url("/bg-item4.png") no-repeat center, #f9f9f9`,
};

export default function CreateItem() {
  return (
    <SiteLayout noPadding>
      <div
        className="flex justify-center h-screen overflow-y-hidden"
        style={backgroundStyle}
      >
        <div
          className="justify-center bg-white shadow-md rounded-md mt-16"
          style={{
            height: "40vh",
            width: "40vw",
            borderImage: 'url("/borderink3.png") 4 / 4px repeat',
          }}
        >
          <div className="h-full">
            <h2 className="text-center font-bold text-xl mt-4 mb-2">
              Create an Item
            </h2>
            <div className="border-b-2 border-blue-500 mx-4"></div>
            <div className="flex flex-col h-2/4">
              <CreateItemForm></CreateItemForm>

              <div className="mx-auto mt-20">
                <PrimaryButton>Craft Item</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        {/* <Form /> */}
      </div>
    </SiteLayout>
  );
}
