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
import { lexicalEditorConfig} from "./config/lexicalEditorConfig";
import LexicalEditorTopBar from "./components/LexicalEditorTopBar";
import TreeViewPlugin from "./components/CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "./components/CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "./components/CustomPlugins/FloatingTextFormatPlugin";


const SaveLoadPlugin = ({ onChange, value,formKey }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // console.log("1::SaveLoadPlugin useEffect");
    if (value) {
      // console.log("2::SaveLoadPlugin useEffect");
      editor.update(() => {
        // console.log("3::SaveLoadPlugin useEffect",value);

        const editorState = editor.parseEditorState(JSON.parse(value));


        //editorState.read(() => {
        //  console.log(getEditorState(editorState),$getRoot().isEmpty())
        //});
        editor.setEditorState(editorState);
        editor.focus();

      });
    }
  }, [editor, value]);

  const getEditorState = (editorState) => ({
    text: $getRoot().getTextContent(false),
    stateJson: JSON.stringify(editorState)
  });

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        onChange(formKey,JSON.stringify(editorState.toJSON())); // Send JSON to parent
      }}
    />
  );

}

const LexicalEditorWrapper= ({onChange, value,formKey,label}) => {

  // console.log("LexicalEditorWrapper",formKey,value);

  return (
    <Box sx={{ width: "100%",  margin: "auto" }}>
      <Typography variant="h4" sx={{ color: 'text.secondary' }}>
        {label}
        </Typography>
      <LexicalComposer initialConfig={lexicalEditorConfig(formKey)}>
        <LexicalEditorTopBar />
        <Divider />
        <Box sx={{ position: "relative", background: "white",border: "1px solid #eee",borderRadius: "8px"}}>
          <RichTextPlugin 
            contentEditable={<MuiContentEditable />}
            placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
            ErrorBoundary={() => <div>Something went wrong.</div>}
          />
          {/* <OnChangePlugin onChange={onChange} /> */}

          <SaveLoadPlugin onChange={onChange} value={value} formKey={formKey} />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <ListPlugin />
          <LinkPlugin />
          {/* <ImagesPlugin captionsEnabled={true} /> */}
          <FloatingTextFormatToolbarPlugin />
        </Box>
      </LexicalComposer>
    </Box>
  );
}

export default LexicalEditorWrapper;