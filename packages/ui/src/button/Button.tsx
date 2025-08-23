import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return <button style={{ padding: "8px 16px", backgroundColor: "red" }}>{children}</button>;
};