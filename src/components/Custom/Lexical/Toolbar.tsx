import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined, StrikethroughS } from "@mui/icons-material";

const Toolbar: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = React.useState<string[]>([]);

  // Handle button click
  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
    newFormats.forEach((format:any) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    });
  };

  return (
    <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" sx={{ marginBottom: 1 }}>
      <ToggleButton value="bold" aria-label="bold">
        <FormatBold />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <FormatItalic />
      </ToggleButton>
      <ToggleButton value="underline" aria-label="underline">
        <FormatUnderlined />
      </ToggleButton>
      <ToggleButton value="strikethrough" aria-label="strikethrough">
        <StrikethroughS />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Toolbar;