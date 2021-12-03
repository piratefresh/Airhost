import s from "./Items.module.css";

function CreateItemForm() {
  return (
    <div className="p-4">
      <div className="font-bold">Base Item Type</div>
      <div className="flex flex-row justify-center my-4">
        <div className={s.itemTypeIcon}>
          <img src="/weapon4.webp" alt="" />
          <div className="font-bold">Weapon</div>
        </div>
        <div className={s.itemTypeIcon}>
          <img src="/armor2.webp" alt="" />
          <div className="font-bold">Armor</div>
        </div>
        <div className={s.itemTypeIcon}>
          <img src="/item1.webp" alt="" />
          <div className="font-bold">Item</div>
        </div>
        <div className={s.itemTypeIcon}>
          <img src="/vehicle1.png" alt="" />
          <div className="font-bold">Vehicle</div>
        </div>
      </div>
    </div>
  );
}

export default CreateItemForm;
