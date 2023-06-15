import React from "react";

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  width?: string;
  isOpen: boolean;
}
export function Modal({ children, width, isOpen }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className={`relative bg-white rounded-lg p-6 ${width ?? "w-3/4"}`}>
        {children}
      </div>
    </div>
  );
}

interface ModalHeaderProps {
  children: JSX.Element | JSX.Element[];
}

export function ModalHeader({ children }: ModalHeaderProps) {
  if (Array.isArray(children)) {
    return (
      <div className="flex justify-between">
        <h1>{children[0]}</h1>
        <span>{children.filter((_, index) => index != 0)}</span>
      </div>
    );
  }
  return <h1>{children}</h1>;
}

interface ModalBodyProps {
  children: JSX.Element | JSX.Element[];
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className="mt-8">{children}</div>;
}
