import React, { MouseEventHandler } from "react";

type CardProps = {
  as?: string | object;
  children?: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
};

// const Card: React.FC<CardProps> = ({ children, href }) => {
//   return (
//     <a href={href} className="rounded-md shadow-md my-8 relative">
//       {children}
//     </a>
//   );
// };

const Card = React.forwardRef<HTMLInputElement, CardProps>(
  ({ children, href, onClick }, ref: any) => (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className="rounded-md shadow-md my-8 relative"
    >
      {children}
    </a>
  )
);

export default Card;
