import {
  dedupExchange,
  fetchExchange,
  ssrExchange,
  subscriptionExchange,
} from "urql";
import { cacheExchange, query } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  GetMessagesDocument,
  GetConversationsDocument,
  GetUnreadCountDocument,
  Conversation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";

const ws_url = "ws://localhost:4000/subscriptions";

const subscriptionClient = process.browser
  ? new SubscriptionClient(ws_url, {
      lazy: true,
      reconnect: true,
    })
  : null;

export const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      // If the OperationResult has an error send a request to sentry
      if (error) {
        if (error?.message.includes("Not Authenticated")) {
          Router.replace("/login");
        }
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      updates: {
        Mutation: {
          createPost: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "posts"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "posts", fi.arguments || {});
            });
          },
          createComment: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "getComments"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "getComments", fi.arguments || {});
            });
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            // cache.updateQuery({ query: MeDocument }, (data) => {
            //   data;
            // });
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            // cache.updateQuery({ query: MeDocument }, (data) => {
            //   data;
            // });
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          createConversation: (result: any, args, cache, info) => {
            const updatedConversationId = result.createConversation.id;
            cache.updateQuery(
              {
                query: GetConversationsDocument,
              },
              (data) => {
                let convoData = data as any;
                console.log("Create Conversation: ", result.createConversation);
                if (convoData !== null) {
                  const filterConvs = convoData.getConversations.filter(
                    (obj: Conversation) => obj.id !== updatedConversationId
                  );
                  console.log("fiter Conversation: ", filterConvs);
                  filterConvs.unshift(result.createConversation);
                  convoData.getConversations = filterConvs;
                  return convoData;
                } else {
                  return null;
                }
              }
            );
          },
        },
        Subscription: {
          getMessages: (result, args, cache, info) => {},
          newMessageReceived: (result: any, args, cache, info) => {
            const { conversationId } = result.newMessageReceived;
            console.log("message received");
            cache.updateQuery(
              {
                query: GetMessagesDocument,
                variables: {
                  conversationId: conversationId,
                },
              },
              (data) => {
                let msgData = data as any;
                if (msgData !== null) {
                  msgData.getMessages.push(result.newMessageReceived);
                  // msgData = [...msgData.getMessages, result.newMessageReceived];
                  console.log("Cache Messages: ", msgData);
                  return msgData;
                } else {
                  return null;
                }
              }
            );
          },
          newUnreadMessage: (result: any, args, cache, info) => {
            const newUnreadCount = result.newUnreadMessage;
            cache.updateQuery(
              {
                query: GetUnreadCountDocument,
              },
              (data) => {
                let oldUnreadCount = data as any;
                if (oldUnreadCount !== null) {
                  oldUnreadCount.getUnreadCount = newUnreadCount;
                  return oldUnreadCount;
                } else {
                  return null;
                }
              }
            );
          },
          updatedConversations: (result: any, args, cache, info) => {
            console.log("result: ", result.updatedConversations);
            const updatedConversation: Conversation[] = [
              result.updatedConversations,
            ];
            cache.updateQuery(
              {
                query: GetConversationsDocument,
              },
              (data) => {
                let queryData = data as any;
                console.log();
                if (queryData !== null) {
                  // const updatedData = queryData.getConversations.map(
                  //   (obj: Conversation) =>
                  //     updatedConversation.find((o) => o.id === obj.id) || obj
                  // );

                  const filterOldData = queryData.getConversations.filter(
                    (o: Conversation) => {
                      return updatedConversation.some((o2: Conversation) => {
                        return o.id !== o2.id;
                      });
                    }
                  );

                  console.log("filtered: ", filterOldData);

                  filterOldData.unshift(updatedConversation[0]);

                  console.log("Sorted Coversation: ", filterOldData);
                  queryData.getConversations = filterOldData;

                  return queryData;
                } else {
                  return null;
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient?.request(operation) as any;
      },
    }),
  ],
});
