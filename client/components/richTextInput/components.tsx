import React from "react";
import "css.gg/icons/css/format-bold.css";
import "css.gg/icons/css/format-italic.css";
import "css.gg/icons/css/format-underline.css";
import "css.gg/icons/css/code.css";

interface BaseProps {
  className: string;
  [key: string]: unknown;
  icon: string;
}
type OrNull<T> = T | null;

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: React.PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: React.Ref<OrNull<HTMLSpanElement>>
  ) => <span {...props} className="cursor-pointer text-gray-400" />
);

export const Icon = React.forwardRef(
  (
    { className, icon, format, ...props }: React.PropsWithChildren<BaseProps>,
    ref: React.Ref<OrNull<HTMLSpanElement>>
  ) => {
    let iconEle;
    if (icon === "format-bold") {
      iconEle = (
        <div
          {...props}
          className={`gg-format-bold`}
          style={{ marginTop: "-5px" }}
        ></div>
      );
    } else {
      iconEle = <div {...props} className={`gg-${icon}`}></div>;
    }
    return <>{iconEle}</>;
  }
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: React.PropsWithChildren<BaseProps>,
    ref: React.Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      className="flex flex-row justify-around items-center p-1 my-4 border border-gray-200 rounded-md"
    />
  )
);

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: React.PropsWithChildren<BaseProps>,
    ref: React.Ref<OrNull<HTMLDivElement>>
  ) => <Menu {...props} className="p-2 border border-gray-200" />
);
