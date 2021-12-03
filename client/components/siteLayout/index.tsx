import React from "react";
import NavBar from "../navbar";

interface SiteProps {
  children: React.ReactNode;
  noPadding?: Boolean;
}

const paddingClasses = `mt-6 sm:mt-0 sm:py-12 py-32 px-64`;
const noPaddingClasses = `mt-6 sm:mt-0`;

const SiteLayout: React.FC<SiteProps> = ({ noPadding, children }) => (
  <div className="antialiased">
    <NavBar></NavBar>
    <div className={!noPadding ? paddingClasses : noPaddingClasses}>
      {children}
    </div>
    <footer>
      <div className="flex flex-row bg-black p-4 text-white">
        <div className="flex items-center text-4xl text-yellow-400 w-2/3">
          SOURCERY
        </div>
        <div className="flex flex-col">
          <div className="text-sm">Quick Links</div>
          <ul className="text-lg">
            <li>Posts</li>
            <li>Items</li>
            <li>Monsters</li>
            <li>NPC's</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);

export default SiteLayout;
