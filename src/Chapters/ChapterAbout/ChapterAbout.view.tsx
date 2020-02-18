import Editor, { monaco } from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import * as PropTypes from "prop-types";
import * as React from "react";

import { CardBottomCorners, CardTopCorners } from "../../Card/Card.style";
import { ShipSelector } from "../../ShipSelector/ShipSelector.controller";
import { PENDING, RIGHT, WRONG } from "./ChapterAbout.constants";
import { data } from "./ChapterAbout.data";
//prettier-ignore
import { Button, ButtonBorder, ButtonText, ChapterCourse, ChapterGrid, ChapterStyled, ChapterH1, ChapterH2, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentWrapper, ChapterValidatorInside, ChapterValidatorTitle } from "./ChapterAbout.style";

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

const MonacoReadOnly = ({ height, value }: any) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <Editor
        height={height}
        value={value}
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
    </div>
  );
};

type ChapterAboutViewProps = {
  validatorState: string;
  validateCallback: () => void;
};

export const ChapterAboutView = ({ validatorState, validateCallback }: ChapterAboutViewProps) => {
  return (
    <ChapterStyled>
      <ChapterCourse>
        <Markdown
          children={data}
          options={{
            overrides: {
              h1: {
                component: ChapterH1
              },
              h2: {
                component: ChapterH2
              },
              code: {
                component: MonacoReadOnly
              }
            }
          }}
        />
      </ChapterCourse>
      <ChapterGrid>
        <ShipSelector />
        <ChapterValidator className={validatorState === RIGHT ? "ok" : "no"}>
          <CardTopCorners className={validatorState === RIGHT ? "ok" : "no"} />
          <CardBottomCorners className={validatorState === RIGHT ? "ok" : "no"} />
          <ChapterValidatorInside className={validatorState === RIGHT ? "ok" : "no"}>
            {validatorState === PENDING && (
              <ChapterValidatorContentWrapper>
                <ChapterValidatorTitle>AWAITING VALIDATION</ChapterValidatorTitle>
                <ChapterValidatorContent>Choose the ship 020433 to continue</ChapterValidatorContent>
                <Button>
                  <ButtonBorder />
                  <ButtonText onClick={() => validateCallback()}>VALIDATE MISSION</ButtonText>
                </Button>
              </ChapterValidatorContentWrapper>
            )}
            {validatorState === RIGHT && (
              <ChapterValidatorContentWrapper>
                <ChapterValidatorTitle>MISSION SUCCESSFUL</ChapterValidatorTitle>
                <ChapterValidatorContent>Go on to the next mission</ChapterValidatorContent>
              </ChapterValidatorContentWrapper>
            )}
            {validatorState === WRONG && (
              <ChapterValidatorContentWrapper>
                <ChapterValidatorTitle>MISSION FAILED</ChapterValidatorTitle>
                <ChapterValidatorContent>Choose the ship 020433 and try again</ChapterValidatorContent>
                <Button>
                  <ButtonBorder />
                  <ButtonText onClick={() => validateCallback()}>TRY AGAIN</ButtonText>
                </Button>
              </ChapterValidatorContentWrapper>
            )}
          </ChapterValidatorInside>
        </ChapterValidator>
      </ChapterGrid>
    </ChapterStyled>
  );
};

ChapterAboutView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired
};

ChapterAboutView.defaultProps = {
  validatorState: PENDING
};
