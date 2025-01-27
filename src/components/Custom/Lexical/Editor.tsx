import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import { EditorState } from "lexical";
import { Box, Paper } from "@mui/material";

// import { RichTextPlugin as RichTextLexicalPlugin } from "@lexical/rich-text";
import Toolbar from "./Toolbar";

// Default editor theme
const theme = {
  paragraph: "editor-paragraph",
};

// Function to handle text changes
const handleChange = (editorState: EditorState) => {
  editorState.read(() => {
    console.log("Editor Content Changed:", editorState);
  });
};

const LexicalEditor: React.FC = () => {
  // Lexical Editor Config
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError(error: Error) {
      console.error("Lexical Editor Error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Paper elevation={3} sx={{ padding: 2, minHeight: 250 }}>

        <Toolbar />
        {/* <RichTextLexicalPlugin /> */}

        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Start typing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />

        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
      </Paper>
    </LexicalComposer>
  );
};

export default LexicalEditor;