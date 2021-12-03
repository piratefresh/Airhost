import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../inputField";
import Select from "react-select";
import s from "./Items.module.css";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

function Form() {
  const { register, control, handleSubmit, errors, setError } = useForm();
  return (
    <div className="flex flex-col">
      <div className="font-bold border-b-2 border-blue-800 text-2xl">
        Create Item
      </div>
      <InputField
        label="Name"
        name="name"
        type="text"
        register={register}
        errorMsg={errors.name}
      ></InputField>
      <div>Base Item Type</div>
      <div className="flex flex-row justify-center my-4">
        <div className={s.itemTypeIcon}>
          <img src="./rune-sword.png" alt="" />
          <div className="font-bold">Weapon</div>
        </div>
        <div className={s.itemTypeIcon}>
          <img src="./chest-armor.png" alt="" />
          <div className="font-bold">Armor</div>
        </div>
        <div className={s.itemTypeIcon}>
          <img src="./fizzing-flask.png" alt="" />
          <div className="font-bold">Item</div>
        </div>
        <div className={s.itemTypeIcon}>
          <img src="./surfer-van.png" alt="" />
          <div className="font-bold">Vehicle</div>
        </div>
      </div>

      <div>Rarity</div>
      <Controller
        name="rarity"
        control={control}
        options={[
          { value: "uncommon", label: "Uncommon" },
          { value: "common", label: "Common" },
          { value: "rare", label: "Rare" },
          { value: "veryrare", label: "Very Rare" },
          { value: "legendary", label: "Legendary" },
          { value: "artifact", label: "Artifact" },
        ]}
        as={Select}
      />

      <div>Modifier</div>
      <div className="flex flex-row justify-center my-4">
        <div className={s.diceIcons}>
          <img src="./dice4.png" alt="" />
          <div className="font-bold">D4</div>
        </div>
        <div className={s.diceIcons}>
          <img src="./dice6.png" alt="" />
          <div className="font-bold">D6</div>
        </div>
        <div className={s.diceIcons}>
          <img src="./dice8.png" alt="" />
          <div className="font-bold">D8</div>
        </div>
        <div className={s.diceIcons}>
          <img src="./dice10.png" alt="" />
          <div className="font-bold">D10</div>
        </div>
        <div className={s.diceIcons}>
          <img src="./dice12.png" alt="" />
          <div className="font-bold">D12</div>
        </div>
        <div className={s.diceIcons}>
          <img src="./dice20.png" alt="" />
          <div className="font-bold">D20</div>
        </div>
      </div>
    </div>
  );
}

export default Form;
