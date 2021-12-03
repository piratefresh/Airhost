import React from "react";
import Link from "next/link";
import ThemeChanger from "../themeChanger";
import {
  useMeQuery,
  useLogoutMutation,
  useGetUnreadCountQuery,
  useNewUnreadMessageSubscription,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import InternalLink from "../InternalLink";
import s from "./Navbar.module.css";
import SubMenu from "./SubMenu";

interface Props {
  children?: React.ReactNode;
}

const NavBar: React.FC<Props> = () => {
  const [showSubMenu, setShowSubMenu] = React.useState<Boolean>(false);
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [
    { data: unreadCountData, fetching: countFetching },
  ] = useGetUnreadCountQuery({
    pause: isServer(),
    requestPolicy: "network-only",
  });
  const [{ data: subUnreadCountData }] = useNewUnreadMessageSubscription();

  React.useEffect(() => {
    if (subUnreadCountData) {
      console.log(subUnreadCountData);
    }
  }, [subUnreadCountData]);

  let body = null;
  if (fetching && countFetching) {
    <div>Loading...</div>;
  } else if (!data?.me) {
    body = (
      <>
        <Link href="/login">
          <a className="ml-8 font-medium text-gray-900 dark:text-white">
            Login
          </a>
        </Link>
        <Link href="/register">
          <a className="ml-8 font-medium text-gray-900 dark:text-white">
            Register
          </a>
        </Link>
      </>
    );
  } else {
    body = (
      <>
        <a className="ml-8 font-medium text-gray-900 dark:text-white">
          {data.me.username}
        </a>
        <a
          onClick={() => {
            logout();
          }}
          className="ml-8 font-medium text-gray-900 dark:text-white cursor-pointer"
        >
          Logout
        </a>
      </>
    );
  }

  return (
    <div className="mx-auto">
      <nav className="flex flex-row justify-center items-center bg-white border-gray-200 border-b z-10 sticky top-0 dark:border-gray-800">
        <div className="flex-shrink-0 flex items-center mx-auto">
          <Link href="/">
            <a className="text-2xl font-bold text-yellow-400 uppercase cursor-pointer">
              Sourcery
            </a>
          </Link>
          <Link href="/">
            <a className={s.link}>Home</a>
          </Link>
          <Link href="/create-post">
            <a className={s.link}>Create Post</a>
          </Link>
          <Link href="/items">
            <a className={s.link}>Items</a>
          </Link>
          <Link href="/monsters">
            <a className={s.link}>Monsters</a>
          </Link>
          <Link href="/npcs">
            <a className={s.link}>Npcs</a>
          </Link>
          <Link href="/npcs">
            <a
              onMouseEnter={() => setShowSubMenu(true)}
              onMouseLeave={() => setShowSubMenu(false)}
              className={s.link}
            >
              Creations
            </a>
          </Link>
          <Link href="/messages">
            <InternalLink>
              <a className={s.link}>Messages</a>
              {unreadCountData && unreadCountData.getUnreadCount ? (
                <div
                  className="text-center absolute top-0 bg-yellow-400 rounded-full h-6 w-6"
                  style={{ right: "-25px" }}
                >
                  {unreadCountData.getUnreadCount}
                </div>
              ) : null}
            </InternalLink>
          </Link>
          <Link href="/account-settings/basic-information" passHref>
            <a className={s.link}>Account Settings</a>
          </Link>
        </div>
        <div className="flex items-center ml-auto mr-4">
          <input
            className="block w-full border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white"
            placeholder="Search..."
          />
          {body}
          <ThemeChanger></ThemeChanger>
        </div>
      </nav>
      {showSubMenu ? (
        <div
          onMouseEnter={() => setShowSubMenu(true)}
          onMouseLeave={() => setShowSubMenu(false)}
          className="p-4"
          style={{ backgroundColor: "#222" }}
        >
          <div className="flex flex-row flex-wrap justify-around">
            <SubMenu
              imageSrc="/sources.jpg"
              menuLabel="Sources"
              menuHref="/sources"
            ></SubMenu>
            <SubMenu
              imageSrc="/characters.jpg"
              menuLabel="Characters"
              menuHref="/characters"
            ></SubMenu>
            <SubMenu
              imageSrc="/myitems.jpg"
              menuLabel="Items"
              menuHref="/creations/create-item"
            ></SubMenu>
            <SubMenu
              imageSrc="/monsters.jpg"
              menuLabel="Monsters"
              menuHref="/creations/create-monster"
            ></SubMenu>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
