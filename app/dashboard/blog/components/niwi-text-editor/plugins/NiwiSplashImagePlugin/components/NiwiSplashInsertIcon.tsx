"use client";
import { SiUnsplash } from "react-icons/si";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import { INSERT_NIWI_SPLASH_IMAGE_COMMAND } from "../NiwiSplashImagePlugin";

type NiwiSplashInsertIconProps = {
  onClick?: () => void;
};

function NiwiSplashInsertIcon({ onClick }: NiwiSplashInsertIconProps) {
  const [editor] = useLexicalComposerContext();

  const onInsertNiwiSplash = useCallback(() => {
    onClick?.();
    editor.dispatchCommand(INSERT_NIWI_SPLASH_IMAGE_COMMAND, undefined);
  }, []);

  return (
    <>
      <button
        onClick={onInsertNiwiSplash}
        className="editor-side-right-actions-button"
        type="button"
      >
        <SiUnsplash className="w-[20px] h-[20px]" />
      </button>
    </>
  );
}
export default NiwiSplashInsertIcon;
