import { PropsWithChildren } from "react";

const TextError = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  if (children === null || children === undefined) return <div></div>;
  return (
    <div title={`${children}`} className={"text-red-600 " + className}>
      {children.toString().length > 50
        ? children.toString().substring(0, 50) + "..."
        : children}
    </div>
  );
};

export default TextError;
