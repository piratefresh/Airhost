import React from "react";
import Head from "next/head";
import SiteLayout from "../components/siteLayout";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import Card from "../components/card";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  variables: PostsQueryVariables;
  isLastPage: boolean;
  onLoadMore: (cursor: string) => void;
};

const Page = ({ variables, isLastPage, onLoadMore }: Props) => {
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>Create the first post</div>;
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!fetching && !data && <div>Create the first post</div>}
        {!data && fetching ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {data?.posts.posts.map((p) =>
              !p ? null : (
                <AnimatePresence>
                  <Link
                    href="/post/[id]"
                    as={`/post/${p.id}`}
                    key={p.id}
                    passHref
                  >
                    <Card>
                      <div className="bg-blue-900 bg-opacity-50 absolute z-10 h-full w-full"></div>
                      {/* <motion.figure className="image" layoutId="image">
                      <Image
                        src={p.image ? p.image : ""}
                        className=" h-full object-cover"
                        layout="responsive"
                        alt={p.title}
                        width={849}
                        height={564}
                      />
                    </motion.figure> */}
                      <motion.img
                        className="imagePost h-full object-cover"
                        src={p.image ? p.image : ""}
                        alt={p.title}
                        layoutId={`imagePost-${p.id}`}
                      />
                      {/* <img
                      className=" h-full object-cover"
                      src={p.image ? p.image : ""}
                      alt={p.title}
                    /> */}
                      <div className="text-base relative bottom-20 ml-8 text-white z-20 uppercase font-bold">
                        {p.title}
                      </div>
                      <div className="text-base relative bottom-20 ml-8 text-white z-20 uppercase font-bold">
                        {p.author.username}
                      </div>
                    </Card>
                  </Link>
                </AnimatePresence>
              )
            )}
          </div>
        )}

        {(isLastPage && fetching) || (isLastPage && data?.posts.hasMore) ? (
          <div>
            <button
              onClick={() => {
                if (data?.posts) {
                  onLoadMore(
                    data.posts.posts[data.posts.posts.length - 1].createdAt
                  );
                }
              }}
            >
              load more
            </button>
          </div>
        ) : null}
      </main>
    </>
  );
};

const limit = 15;

const Index = () => {
  const [pageVariables, setPageVariables] = React.useState([
    {
      limit,
      cursor: null as null | string,
    },
  ]);

  return (
    <SiteLayout>
      {pageVariables.map((variables, i) => {
        return (
          <Page
            key={"" + variables.cursor}
            variables={variables}
            isLastPage={i === pageVariables.length - 1}
            onLoadMore={(cursor) =>
              setPageVariables([...pageVariables, { cursor, limit }])
            }
          />
        );
      })}
    </SiteLayout>
  );
};

export default Index;
