import Editor, { monaco } from "@monaco-editor/react";
import * as React from "react";

import { CardBottomCorners, CardTopCorners } from "../../Card/Card.style";
import { ShipSelector } from "../../ShipSelector/ShipSelector.controller";
//prettier-ignore
import { ChapterContent, ChapterValidatorContentWrapper,ChapterCourse, ButtonBorder, ButtonText, ChapterValidatorInside, ChapterContractGrid, ChapterContractStyled, ChapterH1, ChapterH2, ChapterValidator, ChapterValidatorTitle, ChapterValidatorContent, Button } from "./ChapterContract.style";
import { text1, code1, text2, code2 } from "./ChapterContract.data";

monaco
  .init()
  .then(monacoInstance => {
    monacoInstance.editor.defineTheme("myCustomTheme", {
      base: "vs-dark", // can also be vs-dark or hc-black
      inherit: true, // can also be false to completely replace the builtin rules
      rules: [
        { token: "comment", foreground: "ffa500", fontStyle: "italic underline" },
        { token: "comment.js", foreground: "008800", fontStyle: "bold" },
        { token: "comment.css", foreground: "0000ff" } // will inherit fontStyle from `comment` above
      ],
      colors: {
        "editor.foreground": "#F8F8F8",
        "editor.background": "#00000050",
        "editor.selectionBackground": "#DDF0FF33",
        "editor.lineHighlightBackground": "#FFFFFF08",
        "editorCursor.foreground": "#A7A7A7",
        "editorWhitespace.foreground": "#FFFFFF40"
      }
    });
  })
  .catch(error => console.error("An error occurred during initialization of Monaco: ", error));

export const ChapterContractView = () => {
  return (
    <ChapterContractStyled>
      <ChapterCourse>
        <ChapterH1>Chapter 2 : Functions</ChapterH1>
        <ChapterContent>{text1}</ChapterContent>
        <Editor
          height="70px"
          value={code1}
          language="pascal"
          theme="myCustomTheme"
          options={{
            lineNumbers: false,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden", verticalScrollbarSize: 0 },
            folding: false,
            readOnly: true,
            fontSize: 14,
            fontFamily: "Electrolize"
          }}
        />
        <br />
        <ChapterH2>Version Pragma</ChapterH2>
        <Editor
          height="120px"
          value={code2}
          language="pascal"
          theme="myCustomTheme"
          options={{
            lineNumbers: false,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden", verticalScrollbarSize: 0 },
            folding: false,
            readOnly: true,
            fontSize: 14,
            fontFamily: "Electrolize"
          }}
        />
        <ChapterContent>{text2}</ChapterContent>
      </ChapterCourse>
      <ChapterContractGrid>
        <ShipSelector />
        <ChapterValidator>
          <CardTopCorners />
          <CardBottomCorners />
          <ChapterValidatorInside>
            <ChapterValidatorContentWrapper>
              <ChapterValidatorTitle>AWAITING VALIDATION</ChapterValidatorTitle>
              <ChapterValidatorContent>Choose the ship 112342 to continue</ChapterValidatorContent>
              <Button>
                <ButtonBorder />
                <ButtonText>VALIDATE MISSION</ButtonText>
              </Button>
            </ChapterValidatorContentWrapper>
          </ChapterValidatorInside>
        </ChapterValidator>
      </ChapterContractGrid>
    </ChapterContractStyled>
  );
};
