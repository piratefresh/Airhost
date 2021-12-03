import React from "react";
import SiteLayout from "../components/siteLayout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import {
  ConversationSnippetFragment,
  useCreateMessageMutation,
  useGetConversationsQuery,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import CurrentMessage from "../components/currentMessage";
import { useForm } from "react-hook-form";
import TextField from "../components/textField";
import ConversationSidebar from "../components/messages/ConversationSidebar/ConversationSidebar";
import { useReceiver } from "../context/messageContext";
import CreateConversation from "../components/messages/CreateConversation/createConversation";

interface CreateMsgProps {
  body: string;
}

const Messages: React.FC<{}> = ({}) => {
  useIsAuth();
  const { register, handleSubmit, errors, setError } = useForm();
  const [{ data: meData, fetching: fetchingMe }] = useMeQuery({
    pause: isServer(),
  });
  const [, createMessage] = useCreateMessageMutation();
  const [{ data: conversationData, fetching }] = useGetConversationsQuery();
  const {
    register: registerCreateConv,
    handleSubmit: handleSubmitCreateConv,
    errors: errorsCreateConv,
    setError: setErrorCreateConv,
    reset,
  } = useForm();
  const [currentConvo, setCurrentConvo] =
    React.useState<ConversationSnippetFragment>();

  const { state: receiverState, dispatch } = useReceiver();

  React.useEffect(() => {
    if (currentConvo?.participants) {
      let receiverUser = currentConvo.participants.filter(
        (user) => user.username !== meData?.me?.username
      );
      // .map((filteredUser) => filteredUser.username);
      dispatch({
        type: "setReceiver",
        payload: {
          username: receiverUser[0].username,
          id: receiverUser[0].id,
        },
      });
    } else {
    }
  }, [currentConvo]);

  if (!meData && fetchingMe) return <div>User not found</div>;

  const handleConversation = (conversation: ConversationSnippetFragment) => {
    console.log("current Conversation: ", currentConvo);
    setCurrentConvo(conversation);
  };

  const onSubmit = async (data: CreateMsgProps) => {
    if (currentConvo && receiverState) {
      console.log(receiverState);
      const { data: msgData } = await createMessage({
        input: {
          body: data.body,
          conversationId: currentConvo.id,
          receiverId: receiverState.receiver.id as number,
        },
      });
      if (msgData) {
        const currentConversation = conversationData?.getConversations.find(
          (x) => x.participants.includes(receiverState.receiver.id as any)
        );

        reset({});
        setCurrentConvo(currentConversation);
      }
    }
  };

  const handleUserKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)(); // this won't be triggered
      (e.target as HTMLInputElement).value = "";
    }
  };

  return (
    <SiteLayout>
      <pre>{JSON.stringify(currentConvo?.participants)}</pre>
      <div className="flex flex-col bg-gray-50 dark:bg-gray-800">
        <CreateConversation
          onChangeConversation={handleConversation}
        ></CreateConversation>
        {meData && meData.me ? (
          <div className="flex flex-row">
            <div className="sticky w-1/4">
              {conversationData ? (
                <ConversationSidebar
                  me={meData.me}
                  conversations={conversationData.getConversations}
                  onChangeConversation={handleConversation}
                ></ConversationSidebar>
              ) : (
                <div>Loading Conversations</div>
              )}
            </div>

            <div className="bg-white w-full">
              <div className="p-4 my-4">
                <div className="flex flex-row capitalize font-bold">
                  {receiverState.receiver
                    ? receiverState.receiver.username
                    : null}
                </div>
                {currentConvo ? (
                  <CurrentMessage
                    conversationId={currentConvo.id}
                    me={meData.me}
                  ></CurrentMessage>
                ) : (
                  <CurrentMessage me={meData.me}></CurrentMessage>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <TextField
                  label={
                    receiverState.receiver.username !== null
                      ? `Message ${receiverState.receiver.username}`
                      : ""
                  }
                  name="body"
                  register={register}
                  errorMsg={errors.body}
                  handleUserKeyPress={handleUserKeyPress}
                ></TextField>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </SiteLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Messages);
