import React from "react";
import Listing from "../components/items/Listing";
import SiteLayout from "../components/siteLayout";
import { ModalEle } from "../components/modal2";
import { useGetItemsQuery } from "../generated/graphql";
import Form from "../components/items/Form";

function Items() {
  const [showModal, setShowModal] = React.useState<Boolean>(false);
  const [{ data, fetching }] = useGetItemsQuery();

  if (!data) {
    return <div>No Items In Database</div>;
  }

  if (fetching) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    <SiteLayout>
      <div className="ml-auto my-4" onClick={() => setShowModal(true)}>
        Create Item
      </div>
      <ModalEle
        title="Create Item"
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <Form />
      </ModalEle>
      {/* Header */}
      <div className="flex flex-row">
        <div style={{ width: "65px" }}></div>
        <div className="font-bold" style={{ width: "350px" }}>
          Name
        </div>
        <div className="font-bold" style={{ width: "100px" }}>
          Type
        </div>
        <div className="font-bold" style={{ width: "350px" }}>
          Source
        </div>
        <div className="font-bold" style={{ width: "100px" }}>
          Rarity
        </div>
        <div className="font-bold" style={{ width: "100px" }}>
          Price
        </div>
        <div className="font-bold" style={{ width: "100px" }}>
          Encumbrance
        </div>
      </div>

      {data.getItems.map((item) => {
        return <Listing item={item} />;
      })}
    </SiteLayout>
  );
}

export default Items;
