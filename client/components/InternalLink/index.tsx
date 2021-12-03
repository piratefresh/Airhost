import React, { MouseEventHandler } from "react";

type InternalLinkProps = {
  as?: string | object;
  children?: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
};

const InternalLink = React.forwardRef<HTMLInputElement, InternalLinkProps>(
  ({ children, href, onClick }, ref: any) => (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className="relative font-medium text-gray-900 dark:text-white"
    >
      {children}
    </a>
  )
);

export default InternalLink;
