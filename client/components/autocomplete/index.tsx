import { useCombobox, useMultipleSelection } from "downshift";
import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { useReceiver } from "../../context/messageContext";
import { getUsers } from "../../utils/getUsers";

type Item = any;
type SelectedUser = {
  username: string;
  id: number;
};
type DropdownMultipleComboboxProps = {
  onChangeUser?: (user: SelectedUser) => void;
};

export function DropdownMultipleCombobox({
  onChangeUser,
}: DropdownMultipleComboboxProps) {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [{ data, error, fetching }] = getUsers(searchTerm);
  const [inputValue, setInputValue] = React.useState<string | undefined>("");
  const [allItems, setAllItems] = React.useState<any>([]);
  const [inputSize, setInputSize] = React.useState<string>("");

  const { dispatch } = useReceiver();

  const inputRef = React.useRef();
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection();
  React.useEffect(() => {
    console.log(data);
    if (data) {
      const { getUsers } = data;
      if (getUsers) {
        console.log("users: ", getUsers.users);
        setAllItems(getUsers.users);
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (tabsRef.current) {
      let size = tabsRef.current.offsetWidth + 10;
      setInputSize(size.toString());
    }
  }, [tabsRef]);

  const itemToString = (item: any) => (item ? item.username : "");

  const getFilteredItems = (items: Array<Item>) => {
    console.log("fitlering items: ");
    return items.filter(
      (item: Item) =>
        selectedItems.indexOf(item) < 0 &&
        itemToString(item).toLowerCase().startsWith(inputValue?.toLowerCase())
    );
  };

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(allItems),
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue ? inputValue : "");
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem);
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        dispatch({ type: "setReceiver", payload: selectedItem });
      }
    },
  });
  // const placeholderText = () => {};
  // const placeholderText = selectedItems.length
  //   ? `${selectedItems.map((user: any) => user.username)}`
  //   : "elements";
  return (
    <div>
      <label {...getLabelProps()}>Send To</label>

      <div className="relative" {...getComboboxProps()}>
        <input
          className="border border-gray-400 p-2 rounded-md w-full"
          style={{ paddingLeft: inputSize + "px" }}
          ref={inputRef}
          // placeholder={placeholderText}
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
        />
        <div
          className="absolute selected-tabs"
          ref={tabsRef}
          style={{ top: "20%" }}
        >
          {selectedItems.map((selectedItem: any, index) => (
            <span
              key={`selected-item-${index}`}
              className="bg-gray-100 rounded-md p-1 ml-2 capitalize"
              {...getSelectedItemProps({ selectedItem, index })}
            >
              {selectedItem.username}
              <span
                className="cursor-pointer text-sm ml-2"
                onClick={() => removeSelectedItem(selectedItem)}
              >
                &#10005;
              </span>
            </span>
          ))}
        </div>
        {/* <button {...getToggleButtonProps()} aria-label={"toggle menu"}>
          &#8595;
        </button> */}
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(allItems).map((item: any, index: number) => {
            return (
              <li
                key={`${item.username}${index}`}
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                {...getItemProps({
                  item,
                  index,
                })}
              >
                {item.username}
                {item.secondary}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
