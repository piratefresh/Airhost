import React from "react";
import { FieldErrors } from "react-hook-form";
// Import the Slate editor factory.
import {
  Editor,
  Transforms,
  createEditor,
  Node,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
// Import the Slate components and React plugin.
import { Editable, withReact, useSlate, Slate, ReactEditor } from "slate-react";
import { Toolbar, Icon, Button } from "./components";
import "css.gg/icons/css/chevron-down.css";
import "css.gg/icons/css/layout-list.css";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

interface RichTextInputProps {
  label?: string;
  name?: string;
  required?: Boolean;
  register?: any;
  errorMsg?: FieldErrors;
  placeholder?: string;
}

const BlockButtonFormats = ["heading-one", "heading-two"];
type BlockButtonFormats = typeof BlockButtonFormats[number];
const BlockButtonIcons = ["h1", "h2"] as const;
type BlockButtonIcons = typeof BlockButtonIcons[number];
interface BlockButtonProps {
  format: BlockButtonFormats;
  icon?: string;
  text?: string;
  setState?: React.Dispatch<React.SetStateAction<any>>;
}

const MarkButtonFormats = ["bold", "italic", "underline", "code"];
export type MarkButtonFormats = typeof MarkButtonFormats[number];
const MarkButtonIcons = ["bold", "italic", "underlined", "code"];
type MarkButtonIcons = typeof MarkButtonIcons[number];
interface MarkButtonProps {
  format: MarkButtonFormats;
  icon: MarkButtonIcons;
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  name,
  label,
  required,
  register,
  errorMsg,
  placeholder,
}) => {
  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );
  // Keep track of state for the value of the editor.
  const [value, setValue] = React.useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar>
        <MarkButton format="bold" icon="format-bold" />
        <MarkButton format="italic" icon="format-italic" />
        <MarkButton format="underline" icon="format-underline" />
        <MarkButton format="code" icon="code" />
        <DropdownBlock></DropdownBlock>
        <div className="border-l border-r border-gray-400">
          <BlockButton format="numbered-list" icon="layout-list" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </div>
      </Toolbar>
      <Editable spellCheck autoFocus className="bg-gray-100 p-4" />
    </Slate>
  );
};

const toggleBlock = (editor: ReactEditor, format: BlockButtonFormats) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: ReactEditor, format: MarkButtonFormats) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: ReactEditor, format: MarkButtonFormats) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor: ReactEditor, format: BlockButtonFormats) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} format={format}></Icon>
    </Button>
  );
};

const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} format={format}></Icon>
    </Button>
  );
};

const DropdownBlock = ({}) => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string>("Paragraph");
  let body;

  if (dropdown) {
    body = (
      <div className="bg-white p-4 rounded-md absolute top-8 shadow-sm">
        <BlockButton
          format="heading-one"
          text="Heading 1"
          setState={setSelected}
        />
        <BlockButton
          format="heading-two"
          text="Heading 2"
          setState={setSelected}
        />
        <BlockButton
          format="heading-two"
          text="Heading 3"
          setState={setSelected}
        />
      </div>
    );
  }
  return (
    <div className="relative">
      <div
        className="flex flex-row items-center cursor-pointer text-gray-400 border-l border-r border-gray-200 px-2"
        onClick={() => setDropdown(!dropdown)}
      >
        {selected}
        <i className="ml-2 gg-chevron-down"></i>
      </div>
      {body}
    </div>
  );
};

export default RichTextInput;
