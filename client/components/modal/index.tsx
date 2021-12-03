import React from "react";
import ReactDOM, { createPortal } from "react-dom";

interface RefObject {
  open: () => void;
  close: () => void;
}

type ModalProps = {
  defaultOpened?: boolean;
  fade?: boolean;
  children?: React.ReactNode;
  ref: React.Ref<RefObject>;
};

export function Modal(
  { children, fade = false, defaultOpened = false }: ModalProps,
  ref: React.Ref<RefObject>
) {
  let mountNode = React.useRef<HTMLDivElement | null>(null);
  let modalNode = React.useRef<HTMLElement | null>(null);
  let shadowNode = React.useRef<ShadowRoot | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultOpened);
  React.useLayoutEffect(() => {
    modalNode.current = document.createElement("modal-root");
  }, []);

  const close = React.useCallback(() => setIsOpen(false), []);

  React.useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = React.useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  React.useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={close}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          role="button"
          className="modal-close"
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalNode as any
  );
}

export default React.forwardRef(Modal);
