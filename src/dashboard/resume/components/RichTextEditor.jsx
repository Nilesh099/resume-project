import { useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

function RichTextEditor({ onRichTextEditorChange, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);

  // Sync with external defaultValue changes
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const emitChange = (nextHtml) => {
    setValue(nextHtml);
    onRichTextEditorChange?.(nextHtml);
  };

  return (
    <div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => emitChange(e.target.value)}        
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
