import { formatDistanceToNow } from "date-fns";
import React from "react";
import {
  Message,
  useGetMessagesQuery,
  useNewMessageReceivedSubscription,
} from "../../generated/graphql";

interface CurrentMsgProps {
  conversationId?: number;
  me?: {
    id: number;
    username: string;
  };
}

const CurrentMessage: React.FC<CurrentMsgProps> = ({ conversationId, me }) => {
  const messagesLoaded = React.useRef<boolean>(false);
  const [{ data, fetching }] = useGetMessagesQuery({
    variables: {
      conversationId: conversationId ? conversationId : 0,
    },
  });
  const [{ data: newMessage }] = useNewMessageReceivedSubscription();
  const [messages, setMessages] = React.useState<any>();

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (data?.getMessages && conversationId) {
      setMessages(data.getMessages);
      console.log("GET MESSAGES: ", data.getMessages);
      messagesLoaded.current = true;
    }
  }, [data, conversationId]);

  React.useEffect(() => {
    if (messages && newMessage) {
      setMessages([...messages, newMessage.newMessageReceived]);
      console.log("UPDATED MESSAGES: ", messages);
    }
  }, [newMessage]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  React.useEffect(scrollToBottom, [data, newMessage]);

  if (!data && !fetching) return <div>No Messages</div>;

  const baseClasses = "flex flex-col my-4 rounded-md p-4 w-11/12";
  if (messages) {
    return (
      <div
        className="flex flex-col my-2 overflow-y-scroll"
        style={{ maxHeight: "550px", height: "550px" }}
      >
        {messages.map((message: Message) => {
          return (
            <div
              key={message.id}
              className={`${
                message.sender.id === me?.id
                  ? `bg-gray-100 mr-auto ${baseClasses}`
                  : `bg-blue-100 ml-auto ${baseClasses}`
              }`}
              ref={messagesEndRef}
            >
              {message.body}
              <div className="ml-auto">
                {formatDistanceToNow(new Date(message.updatedAt), {
                  includeSeconds: true,
                })}{" "}
                Ago
              </div>
              <div className="ml-auto">{message.sender.username}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="flex flex-col my-2 overflow-y-scroll"
        style={{ maxHeight: "550px", height: "550px" }}
      ></div>
    );
  }
};

export default CurrentMessage;
