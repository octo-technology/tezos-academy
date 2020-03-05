import Editor, { ControlledEditor, DiffEditor } from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import * as PropTypes from "prop-types";
import * as React from "react";

import { CardBottomCorners, CardTopCorners } from "../../Card/Card.style";
//prettier-ignore
import { Button, ButtonBorder, ButtonText, ChapterCourse, ChapterGrid, ChapterH1, ChapterH2, ChapterMonaco, ChapterStyled, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentWrapper, ChapterValidatorInside, ChapterValidatorTitle } from "../ChapterAbout/ChapterAbout.style";
import { PENDING, RIGHT, WRONG } from "./ChapterTypes.constants";
import { data } from "./ChapterTypes.data";

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

const MonacoEditor = ({ proposedSolution, proposedSolutionCallback }: any) => {
  return (
    <div>
      <ControlledEditor
        height="440px"
        value={proposedSolution}
        language="pascal"
        theme="myCustomTheme"
        onChange={(_, val) => proposedSolutionCallback(val)}
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
    </div>
  );
};

const MonacoDiff = ({ solution, proposedSolution }: any) => {
  return (
    <div>
      <DiffEditor
        height="440px"
        original={solution}
        modified={proposedSolution}
        language="pascal"
        // @ts-ignore
        theme="myCustomTheme"
        options={{
          lineNumbers: true,
          scrollBeyondLastLine: true,
          minimap: { enabled: false },
          scrollbar: { vertical: "hidden", verticalScrollbarSize: 0 },
          folding: true,
          readOnly: false,
          fontSize: 14,
          fontFamily: "Electrolize",
          renderSideBySide: false
        }}
      />
    </div>
  );
};

const Validator = ({ validatorState, validateCallback }: any) => (
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
          <ChapterValidatorTitle>MISSION FAILED</ChapterValidatorTitle>
          <ChapterValidatorContent>Checkout the solution above and try again</ChapterValidatorContent>
          <Button>
            <ButtonBorder />
            <ButtonText onClick={() => validateCallback()}>TRY AGAIN</ButtonText>
          </Button>
        </ChapterValidatorContentWrapper>
      )}
    </ChapterValidatorInside>
  </ChapterValidator>
);

const Content = () => (
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
);

type ChapterTypesViewProps = {
  validatorState: string;
  validateCallback: () => void;
  solution: string;
  proposedSolution: string;
  proposedSolutionCallback: (e: string) => void;
  showDiff: boolean;
};

export const ChapterTypesView = ({
  validatorState,
  validateCallback,
  solution,
  proposedSolution,
  proposedSolutionCallback,
  showDiff
}: ChapterTypesViewProps) => {
  return (
    <ChapterStyled>
      <ChapterCourse>
        <Content />
      </ChapterCourse>
      <ChapterGrid>
        <ChapterMonaco>
          {showDiff ? (
            <MonacoDiff solution={solution} proposedSolution={proposedSolution} />
          ) : (
            <MonacoEditor proposedSolution={proposedSolution} proposedSolutionCallback={proposedSolutionCallback} />
          )}
        </ChapterMonaco>
        <Validator validatorState={validatorState} validateCallback={validateCallback} />
      </ChapterGrid>
    </ChapterStyled>
  );
};

ChapterTypesView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired,
  solution: PropTypes.string,
  proposedSolution: PropTypes.string,
  showDiff: PropTypes.bool.isRequired,
  proposedSolutionCallback: PropTypes.func.isRequired
};

ChapterTypesView.defaultProps = {
  validatorState: PENDING,
  solution: "",
  proposedSolution: ""
};
