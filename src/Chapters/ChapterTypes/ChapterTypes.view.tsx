import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import * as PropTypes from "prop-types";
import * as React from "react";

import { CardBottomCorners, CardTopCorners } from "../../Card/Card.style";
import { PENDING, RIGHT, WRONG } from "./ChapterTypes.constants";
import { data } from "./ChapterTypes.data";
//prettier-ignore
import { Button, ButtonBorder, ButtonText, ChapterMonaco, ChapterCourse, ChapterGrid, ChapterStyled, ChapterH1, ChapterH2, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentWrapper, ChapterValidatorInside, ChapterValidatorTitle } from "../ChapterAbout/ChapterAbout.style";

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

type ChapterTypesViewProps = {
  validatorState: string;
  validateCallback: () => void;
};

export const ChapterTypesView = ({ validatorState, validateCallback }: ChapterTypesViewProps) => {
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
        <ChapterMonaco>
          <Editor
            height="440px"
            value={`// Type your solution below
`}
            language="pascal"
            theme="myCustomTheme"
            options={{
              lineNumbers: true,
              scrollBeyondLastLine: true,
              minimap: { enabled: false },
              scrollbar: { vertical: "hidden", verticalScrollbarSize: 0 },
              folding: true,
              readOnly: false,
              fontSize: 14,
              fontFamily: "Electrolize"
            }}
          />
        </ChapterMonaco>

        <ChapterValidator className={validatorState === RIGHT ? "ok" : "no"}>
          <CardTopCorners className={validatorState === RIGHT ? "ok" : "no"} />
          <CardBottomCorners className={validatorState === RIGHT ? "ok" : "no"} />
          <ChapterValidatorInside className={validatorState === RIGHT ? "ok" : "no"}>
            {validatorState === PENDING && (
              <ChapterValidatorContentWrapper>
                <ChapterValidatorTitle>AWAITING VALIDATION</ChapterValidatorTitle>
                <ChapterValidatorContent>Type your solution above and validate your answer</ChapterValidatorContent>
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
                <ChapterValidatorTitle>THANKS FOR TRYING THIS CHAPTER</ChapterValidatorTitle>
                <ChapterValidatorContent>
                  The diff editor is not available but will come soon :)
                </ChapterValidatorContent>
              </ChapterValidatorContentWrapper>
            )}
          </ChapterValidatorInside>
        </ChapterValidator>
      </ChapterGrid>
    </ChapterStyled>
  );
};

ChapterTypesView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired
};

ChapterTypesView.defaultProps = {
  validatorState: PENDING
};
