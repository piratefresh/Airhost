import React from "react";

interface ComboBoxContextType {
  /** element refs */
  inputRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLElement>;

  /** list options */
  options: React.MutableRefObject<string[] | null>;
  makeHash: (i: string) => string;
  selected: string | null;
  expanded: boolean;

  /** event handlers */
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleOptionSelect: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;

  /** popover positions */
  position: any;
  inputSize: Bounds;
  listId: string;
  query: string;
  autocomplete: boolean;
}

export const ComboBoxContext = React.createContext<ComboBoxContextType | null>(
  null
);

export interface ComboBoxProps {
  onSelect?: (selected: string) => void;
  onQueryChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface ComboBoxOptionProps
  extends React.HTMLAttributes<HTMLLIElement> {
  value: number;
  label: string;
  handleOptionSelect: (value: number) => void;
}

export const Combobox: React.FC<ComboBoxProps> = ({
  children,
  onQueryChange,
}) => {
  return <div className="w-full">{children}</div>;
};

export interface ComboBoxInputProps extends React.HTMLAttributes<any> {
  "aria-label": string;
  component?: React.ReactType<any>;
  [key: string]: any;
}

export const ComboBoxInput: React.FunctionComponent<ComboBoxInputProps> = ({
  ...other
}) => {
  return (
    <input
      className="border border-gray-200 py-2 rounded-md w-full"
      placeholder={other.placeholder}
    />
  );
};

export interface ComboBoxListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  autoHide?: boolean;
}

export const ComboBoxList: React.FunctionComponent<ComboBoxListProps> = ({
  children,
  autoHide = true,
}) => {
  return <div className="bg-white absolute z-10 t-0 w-full">{children}</div>;
};

export const ComboBoxOption: React.FC<ComboBoxOptionProps> = ({
  value,
  children,
  label,
  handleOptionSelect,
}) => {
  const handleClick = React.useCallback(() => {
    handleOptionSelect(value);
  }, [value]);
  return (
    <div>
      {children || (
        <div data-value={value} onClick={handleClick}>
          {label}
        </div>
      )}
    </div>
  );
};

export interface ComboBoxOptionTextProps {
  value: string;
}

export default Combobox;
