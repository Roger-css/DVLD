import { useEffect } from "react";
type Props = {
  buttonRef: React.RefObject<HTMLButtonElement>;
  inputRef: React.RefObject<HTMLInputElement>;
};
export const useClickEnterToSearch = ({ inputRef, buttonRef }: Props) => {
  useEffect(() => {
    const onEnterEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        buttonRef.current?.click();
      }
    };
    const ref = inputRef.current;
    ref?.addEventListener("keypress", onEnterEvent);
    return () => {
      ref?.removeEventListener("keypress", onEnterEvent);
    };
  }, [inputRef, buttonRef]);
};
