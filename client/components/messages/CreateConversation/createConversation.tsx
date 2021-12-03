import React from "react";
import { useForm } from "react-hook-form";
import { useReceiver } from "../../../context/messageContext";
import {
  useCreateConversationMutation,
  ConversationSnippetFragment,
} from "../../../generated/graphql";
import { DropdownMultipleCombobox } from "../../autocomplete";
import { ModalEle } from "../../modal2";
import TextField from "../../textField";

interface CreateConvoProps {
  onChangeConversation: (conversation: ConversationSnippetFragment) => void;
}
type FormData = {
  body: string;
};
function CreateConversation({ onChangeConversation }: CreateConvoProps) {
  const [showModal, setShowModal] = React.useState<Boolean>(false);
  const { state: receiverState } = useReceiver();
  const [
    _ConversationResult,
    createConversation,
  ] = useCreateConversationMutation();
  const {
    register: registerCreateConv,
    handleSubmit: handleSubmitCreateConv,
    errors: errorsCreateConv,
    setError: setErrorCreateConv,
  } = useForm();

  const onSubmitCreateConvo = async (data: FormData) => {
    console.log("receiver: ", receiverState.receiver);
    if (receiverState.receiver) {
      const response = await createConversation({
        input: {
          receiverId: receiverState.receiver.id as number,
          body: data.body,
        },
      });

      if (response && response.data) {
        onChangeConversation(response.data.createConversation);
        setShowModal(false);
      }
    }
  };

  return (
    <div className="text-lg mr-auto my-8 uppercase font-bold flex flex-col">
      Messages
      <div onClick={() => setShowModal(true)}>Send Message</div>
      <ModalEle
        title="Send Message"
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <h3
          className="text-lg leading-6 font-medium text-gray-900"
          id="modal-headline"
        >
          Start a Conversation
        </h3>
        <form
          onSubmit={handleSubmitCreateConv(onSubmitCreateConvo)}
          className="flex flex-col"
        >
          <div className="relative w-full">
            <DropdownMultipleCombobox></DropdownMultipleCombobox>
          </div>
          <TextField
            label="Body"
            name="body"
            register={registerCreateConv}
            errorMsg={errorsCreateConv.body}
          ></TextField>
          <button
            className="bg-yellow-400 p-2 rounded-md text-white font-medium my-4 text-lg"
            type="submit"
          >
            Create Conversation
          </button>
        </form>
      </ModalEle>
    </div>
  );
}

export default CreateConversation;
