import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useModal } from "react-modal-hook";
import {
  RegularUserFragment,
  useCreateConversationMutation,
  useGetUsersQuery,
  User,
} from "../../generated/graphql";
import { getUsers } from "../../utils/getUsers";
import { Autocomplete, DropdownMultipleCombobox } from "../autocomplete";
import InputField from "../inputField";
import TextField from "../textField";

type ModalProps = {
  label: string;
};

type InputProps = {
  receiverId: number | null;
  senderId: number | null;
};

interface IData {
  label: string | number;
  id: string | number;
  value: string;
}

interface IAutoComplete {
  data: IData;
}

type OptionType = {
  label?: string | number;
  value?: string | number;
};

interface IModalProps {
  show: Boolean;
  onClose: () => void;
  children?: ReactNode;
  title: string;
}

export const ModalEle = ({ show, onClose, children, title }: IModalProps) => {
  const [isBrowser, setIsBrowser] = React.useState<Boolean>(false);

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const handleCloseClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClose();
    },
    []
  );

  const escFunction = React.useCallback((event) => {
    if (event.keyCode === 27) {
      handleCloseClick(event);
    }
  }, []);

  const modalContent = show ? (
    <div className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75 cursor-pointer"
            onClick={handleCloseClick}
          ></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-32 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as HTMLDivElement
    );
  } else {
    return null;
  }
};

export const Modal = ({ label }: ModalProps) => {
  const [input, setInput] = React.useState<InputProps>({
    receiverId: null,
    senderId: null,
  });
  const [users, setUsers] = React.useState<OptionType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [{ data, error, fetching }] = getUsers(searchTerm);
  const { register, handleSubmit, errors, setError } = useForm();
  const [, createConversation] = useCreateConversationMutation();
  const onSubmit = async () => {
    console.log("Submit");
    createConversation({
      input: {
        receiverId: 7,
      },
    });
  };

  React.useEffect(() => {
    if (data && data.getUsers && data.getUsers.users) {
      setUsers(
        data.getUsers.users.map((user) => {
          return {
            value: user.id,
            label: user.username,
          };
        })
      );
      console.log("users: ", data.getUsers.users, "users state: ", users);
    }
  }, [searchTerm]);

  const handleSender = (senderId: number) => {
    setInput({
      ...input,
      senderId,
    });
  };

  const handleUsersQuery = (searchString: string) => {
    setSearchTerm(searchString);
  };

  const [showModal, hideModal] = useModal(() => (
    <div className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-32 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Start a Conversation
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="relative w-full">
                <DropdownMultipleCombobox></DropdownMultipleCombobox>
                {/* <Autocomplete></Autocomplete> */}
              </div>
              <button
                className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
                type="submit"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ));

  return <button onClick={showModal}>{label}</button>;
};
