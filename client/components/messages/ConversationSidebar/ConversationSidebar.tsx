import { formatDistanceToNow } from "date-fns";
import React from "react";
import {
  Conversation,
  ConversationSnippetFragment,
  RegularUserFragment,
  useGetConversationsQuery,
  useUpdatedConversationsSubscription,
} from "../../../generated/graphql";

type SidebarProps = {
  me: RegularUserFragment;
  onChangeConversation: (conversation: ConversationSnippetFragment) => void;
  conversations: ConversationSnippetFragment[];
};

function ConversationSidebar({
  me,
  onChangeConversation,
  conversations,
}: SidebarProps) {
  const [{ data: convData, fetching }] = useGetConversationsQuery();
  const [{ data: updatedConversationData }] =
    useUpdatedConversationsSubscription();

  React.useEffect(() => {
    if (updatedConversationData) {
      const updatedData = conversations.map(
        (obj: ConversationSnippetFragment) =>
          [updatedConversationData.updatedConversations].find(
            (o) => o.id === obj.id
          ) || obj
      );
      onChangeConversation(updatedData);
    }
  }, [updatedConversationData]);

  if (!fetching && !convData) return <div>No Conversations</div>;

  return (
    <div className="h-full w-full border-r border-gray-200">
      {conversations.map((conversation: ConversationSnippetFragment) => {
        return (
          <div
            className="border-t border-gray-200 cursor-pointer"
            key={conversation.id}
            data-id={conversation.id}
            onClick={() => onChangeConversation(conversation)}
          >
            <div className="flex flex-row">
              {conversation.participants
                .filter((user) => user.username !== me?.username)
                .map((filteredUser) => (
                  <div
                    className="flex flex-row items-baseline"
                    key={`${filteredUser.id}`}
                  >
                    <div className="font-bold capitalize">
                      {filteredUser.username}
                    </div>
                    {conversation.messages && conversation.messages[0] ? (
                      <div className="mx-1 text-sm">
                        {formatDistanceToNow(
                          new Date(conversation.messages[0].updatedAt),
                          { includeSeconds: true }
                        )}{" "}
                        ago
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>

            <div>
              {conversation.messages && conversation.messages[0] ? (
                <div>{conversation.messages[0].body}</div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ConversationSidebar;
