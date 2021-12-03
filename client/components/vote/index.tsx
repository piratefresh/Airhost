import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";

interface VoteProps {
  post: PostSnippetFragment;
}

const VoteSection: React.FC<VoteProps> = ({ post }) => {
  return <div>vote</div>;
};

export default VoteSection;
