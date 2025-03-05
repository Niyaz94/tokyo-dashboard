import { $getRoot, $getSelection,$getTextContent } from "lexical";
import { useEffect,useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { Box, Divider,Paper, Typography, Button  } from "@mui/material";
import { lexicalEditorConfig ,editorConfig} from "./config/lexicalEditorConfig";
import LexicalEditorTopBar from "./components/LexicalEditorTopBar";
import TreeViewPlugin from "./components/CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "./components/CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "./components/CustomPlugins/FloatingTextFormatPlugin";


const SaveLoadPlugin = ({ onChange, value,formKey }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value) {
      editor.update(() => {
        const editorState = editor.parseEditorState(JSON.parse(value));
        editor.setEditorState(editorState);
        editor.focus();

      });
    }
  }, [editor, value]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        onChange(formKey,JSON.stringify(editorState.toJSON())); // Send JSON to parent
      }}
    />
  );

}

const LexicalEditorWrapper= ({onChange, value,formKey}) => {

  // console.log("LexicalEditorWrapper",value);
  const [savedJson, setSavedJson] = useState(null);
  const [editorHtml, setEditorHtml] = useState("");

  const handleSave = () => {
    if (savedJson) {
      localStorage.setItem("editorContent", savedJson);
    }
  };
  const handleLoad = () => {
    const storedJson = localStorage.getItem("editorContent");
    if (storedJson) {
      setSavedJson(storedJson);
    }
  };
  const handleConvertToHtml = () => {
    const editor = document.querySelector(".editor-input");
    if (editor) {
      const dom = new DOMParser().parseFromString(editor.innerHTML, "text/html");
      setEditorHtml($generateHtmlFromNodes(dom));
    }
  };

  return (
    <Box sx={{ width: "100%",  margin: "auto" }}>
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <LexicalEditorTopBar />
      <Divider />
      <Box sx={{ position: "relative", background: "white" }}>
        <RichTextPlugin // #312D4B
          contentEditable={<MuiContentEditable />}
          placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
          // ErrorBoundary={LexicalErrorBoundary}
        />
        {/* <OnChangePlugin onChange={onChange} /> */}

        <SaveLoadPlugin onChange={onChange} value={value} formKey={formKey} />
        <HistoryPlugin />
        {/* <TreeViewPlugin /> */}
        <ListPlugin />
        <LinkPlugin />
        <ImagesPlugin captionsEnabled={true} />
        <FloatingTextFormatToolbarPlugin />
      </Box>
    </LexicalComposer>
    </Box>
  );
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

export default LexicalEditorWrapper;