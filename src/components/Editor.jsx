import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import PropTypes from "prop-types";

const Editor = ({ initialContent, setContent }) => {
  const editor = useBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      //   onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
      const blocks = editor.topLevelBlocks;
      //   setContent({});
      console.log("Content was changed:", blocks);
    },
  });

  return <BlockNoteView editor={editor} theme={"light"} />;
};

Editor.propTypes = {
  initialContent: PropTypes.object,
  setContent: PropTypes.func,
};

export default Editor;
