import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Comment>;
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  getUsers?: Maybe<SearchUserResponse>;
  getConversations: Array<Conversation>;
  getMessages: Array<Message>;
  getUnreadCount: Scalars['Float'];
  hello: Scalars['String'];
  hollaYee: Scalars['String'];
  getItems: Array<Item>;
};


export type QueryGetCommentsArgs = {
  postId: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  searchTerm: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  conversationId: Scalars['Int'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['ID']>;
  childComments?: Maybe<Comment>;
  postId: Scalars['Float'];
  post: Post;
  item: Item;
  authorId: Scalars['Float'];
  author: User;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  points: Scalars['Float'];
  views: Scalars['Float'];
  authorId: Scalars['Float'];
  author: User;
  type: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  rarity: Scalars['Float'];
  rarityText: Scalars['String'];
  damage?: Maybe<Scalars['String']>;
  specials: Array<Quality>;
  crit?: Maybe<Scalars['String']>;
  range?: Maybe<Scalars['String']>;
  hp?: Maybe<Scalars['String']>;
  skill?: Maybe<Scalars['String']>;
  source: Scalars['String'];
  type: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  encumbrance: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
};

export type Quality = {
  __typename?: 'Quality';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  source: Scalars['String'];
  item: Item;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type SearchUserResponse = {
  __typename?: 'SearchUserResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  adminId: Scalars['Float'];
  admin: User;
  participants: Array<User>;
  messages?: Maybe<Array<Message>>;
  users: Array<User>;
  author: User;
};


export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  body: Scalars['String'];
  senderId: Scalars['Float'];
  receiverId: Scalars['Float'];
  conversationId: Scalars['Float'];
  readTime?: Maybe<Scalars['DateTime']>;
  sender: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  voteComment: Scalars['Boolean'];
  createComment: Comment;
  votePost: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createImageSignature: ImageSignature;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createConversation: Conversation;
  createMessage: Message;
  createItem: Item;
};


export type MutationVoteCommentArgs = {
  value: Scalars['Int'];
  commentId: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationVotePostArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateItemArgs = {
  input: ItemInput;
};

export type CommentInput = {
  text: Scalars['String'];
  postId: Scalars['Int'];
  parentCommentId?: Maybe<Scalars['String']>;
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CreateConversationInput = {
  receiverId: Scalars['Int'];
  body: Scalars['String'];
};

export type CreateMessageInput = {
  body: Scalars['String'];
  conversationId: Scalars['Float'];
  receiverId: Scalars['Float'];
};

export type ItemInput = {
  name: Scalars['String'];
  rarityText: Scalars['String'];
  rarity: Scalars['Float'];
  source: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  type: Scalars['String'];
  encumbrance: Scalars['Float'];
  image: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessageReceived: Message;
  newUnreadMessage: Scalars['Float'];
  updatedConversations: Conversation;
  welcome: Scalars['String'];
  newStuff: Scalars['String'];
};

export type CommentSnippetFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'createdAt' | 'updatedAt' | 'text' | 'points' | 'authorId' | 'parentCommentId'>
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text'>
  ), author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type ConversationSnippetFragment = (
  { __typename?: 'Conversation' }
  & Pick<Conversation, 'id' | 'updatedAt' | 'createdAt'>
  & { messages?: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'body' | 'updatedAt'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )>>, participants: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type ItemSnippetFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'name' | 'rarity' | 'rarityText' | 'price' | 'description' | 'type' | 'source' | 'encumbrance' | 'image' | 'createdAt' | 'updatedAt'>
);

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'points' | 'textSnippet' | 'text' | 'views' | 'image'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  input: CommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & CommentSnippetFragment
  ) }
);

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = (
  { __typename?: 'Mutation' }
  & { createConversation: (
    { __typename?: 'Conversation' }
    & ConversationSnippetFragment
  ) }
);

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = (
  { __typename?: 'Mutation' }
  & { createImageSignature: (
    { __typename?: 'ImageSignature' }
    & Pick<ImageSignature, 'signature' | 'timestamp'>
  ) }
);

export type CreateItemMutationVariables = Exact<{
  input: ItemInput;
}>;


export type CreateItemMutation = (
  { __typename?: 'Mutation' }
  & { createItem: (
    { __typename?: 'Item' }
    & ItemSnippetFragment
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'conversationId' | 'body' | 'id'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'authorId'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type VotePostMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VotePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'votePost'>
);

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'text' | 'id' | 'parentCommentId' | 'updatedAt'>
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'text'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = (
  { __typename?: 'Query' }
  & { getConversations: Array<(
    { __typename?: 'Conversation' }
    & ConversationSnippetFragment
  )> }
);

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = (
  { __typename?: 'Query' }
  & { getItems: Array<(
    { __typename?: 'Item' }
    & ItemSnippetFragment
  )> }
);

export type GetMessagesQueryVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'conversationId' | 'body' | 'createdAt' | 'updatedAt' | 'readTime' | 'id'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type GetUnreadCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUnreadCount'>
);

export type GetUsersQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers?: Maybe<(
    { __typename?: 'SearchUserResponse' }
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type NewMessageReceivedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageReceivedSubscription = (
  { __typename?: 'Subscription' }
  & { newMessageReceived: (
    { __typename?: 'Message' }
    & Pick<Message, 'conversationId' | 'body' | 'updatedAt' | 'createdAt' | 'id'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type NewUnreadMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewUnreadMessageSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'newUnreadMessage'>
);

export type UpdatedConversationsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdatedConversationsSubscription = (
  { __typename?: 'Subscription' }
  & { updatedConversations: (
    { __typename?: 'Conversation' }
    & ConversationSnippetFragment
  ) }
);

export const CommentSnippetFragmentDoc = gql`
    fragment CommentSnippet on Comment {
  id
  createdAt
  updatedAt
  text
  points
  authorId
  parentCommentId
  post {
    id
    title
    text
  }
  author {
    id
    username
  }
}
    `;
export const ConversationSnippetFragmentDoc = gql`
    fragment ConversationSnippet on Conversation {
  id
  updatedAt
  createdAt
  messages {
    id
    body
    sender {
      id
      username
    }
    updatedAt
  }
  participants {
    id
    username
  }
}
    `;
export const ItemSnippetFragmentDoc = gql`
    fragment ItemSnippet on Item {
  id
  name
  rarity
  rarityText
  price
  description
  type
  source
  encumbrance
  image
  createdAt
  updatedAt
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  points
  textSnippet
  text
  views
  image
  author {
    id
    username
    email
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCommentDocument = gql`
    mutation createComment($input: CommentInput!) {
  createComment(input: $input) {
    ...CommentSnippet
  }
}
    ${CommentSnippetFragmentDoc}`;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateConversationDocument = gql`
    mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useCreateConversationMutation() {
  return Urql.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument);
};
export const CreateImageSignatureDocument = gql`
    mutation CreateImageSignature {
  createImageSignature {
    signature
    timestamp
  }
}
    `;

export function useCreateImageSignatureMutation() {
  return Urql.useMutation<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>(CreateImageSignatureDocument);
};
export const CreateItemDocument = gql`
    mutation CreateItem($input: ItemInput!) {
  createItem(input: $input) {
    ...ItemSnippet
  }
}
    ${ItemSnippetFragmentDoc}`;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    conversationId
    body
    sender {
      id
      username
    }
    id
  }
}
    `;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    updatedAt
    title
    text
    points
    authorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VotePostDocument = gql`
    mutation VotePost($value: Int!, $postId: Int!) {
  votePost(value: $value, postId: $postId)
}
    `;

export function useVotePostMutation() {
  return Urql.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument);
};
export const GetCommentsDocument = gql`
    query GetComments($postId: Int!) {
  getComments(postId: $postId) {
    text
    id
    parentCommentId
    updatedAt
    post {
      title
      text
    }
    author {
      username
    }
  }
}
    `;

export function useGetCommentsQuery(options: Omit<Urql.UseQueryArgs<GetCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommentsQuery>({ query: GetCommentsDocument, ...options });
};
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useGetConversationsQuery(options: Omit<Urql.UseQueryArgs<GetConversationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConversationsQuery>({ query: GetConversationsDocument, ...options });
};
export const GetItemsDocument = gql`
    query getItems {
  getItems {
    ...ItemSnippet
  }
}
    ${ItemSnippetFragmentDoc}`;

export function useGetItemsQuery(options: Omit<Urql.UseQueryArgs<GetItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetItemsQuery>({ query: GetItemsDocument, ...options });
};
export const GetMessagesDocument = gql`
    query GetMessages($conversationId: Int!) {
  getMessages(conversationId: $conversationId) {
    conversationId
    body
    createdAt
    updatedAt
    readTime
    sender {
      id
      username
    }
    id
  }
}
    `;

export function useGetMessagesQuery(options: Omit<Urql.UseQueryArgs<GetMessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMessagesQuery>({ query: GetMessagesDocument, ...options });
};
export const GetUnreadCountDocument = gql`
    query GetUnreadCount {
  getUnreadCount
}
    `;

export function useGetUnreadCountQuery(options: Omit<Urql.UseQueryArgs<GetUnreadCountQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUnreadCountQuery>({ query: GetUnreadCountDocument, ...options });
};
export const GetUsersDocument = gql`
    query GetUsers($searchTerm: String!) {
  getUsers(searchTerm: $searchTerm) {
    users {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const NewMessageReceivedDocument = gql`
    subscription NewMessageReceived {
  newMessageReceived {
    conversationId
    body
    updatedAt
    createdAt
    sender {
      id
      username
    }
    id
  }
}
    `;

export function useNewMessageReceivedSubscription<TData = NewMessageReceivedSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageReceivedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageReceivedSubscription, TData>) {
  return Urql.useSubscription<NewMessageReceivedSubscription, TData, NewMessageReceivedSubscriptionVariables>({ query: NewMessageReceivedDocument, ...options }, handler);
};
export const NewUnreadMessageDocument = gql`
    subscription NewUnreadMessage {
  newUnreadMessage
}
    `;

export function useNewUnreadMessageSubscription<TData = NewUnreadMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewUnreadMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewUnreadMessageSubscription, TData>) {
  return Urql.useSubscription<NewUnreadMessageSubscription, TData, NewUnreadMessageSubscriptionVariables>({ query: NewUnreadMessageDocument, ...options }, handler);
};
export const UpdatedConversationsDocument = gql`
    subscription UpdatedConversations {
  updatedConversations {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useUpdatedConversationsSubscription<TData = UpdatedConversationsSubscription>(options: Omit<Urql.UseSubscriptionArgs<UpdatedConversationsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<UpdatedConversationsSubscription, TData>) {
  return Urql.useSubscription<UpdatedConversationsSubscription, TData, UpdatedConversationsSubscriptionVariables>({ query: UpdatedConversationsDocument, ...options }, handler);
};