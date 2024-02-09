import { PropsWithChildren } from "react";

const TextError = ({ children }: PropsWithChildren) => {
  if (children === null || children === undefined) return <div></div>;
  return (
    <div
      title={`${children}`}
      className="ml-2 text-sm text-red-600 max-w-52 TextError"
    >
      {children.toString().length > 50
        ? children.toString().substring(0, 50) + "..."
        : children}
    </div>
  );
};

export default TextError;
