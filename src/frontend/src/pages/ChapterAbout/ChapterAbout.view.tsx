import Editor, { monaco } from '@monaco-editor/react'
import Markdown from 'markdown-to-jsx'
import { Dialog } from 'pages/Chapter/Chapter.components/Dialog/Dialog.controller'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { PENDING, RIGHT, WRONG } from './ChapterAbout.constants'
import { data } from './ChapterAbout.data'
//prettier-ignore
import { Button, ButtonBorder, ButtonText, ChapterAboutStyled, ChapterCourse, ChapterGrid, ChapterH1, ChapterH2, ChapterH3, ChapterStyled, ChapterValidator, ChapterValidatorContent, ChapterValidatorContentWrapper, ChapterValidatorInside, ChapterValidatorTitle } from "./ChapterAbout.style";

monaco
  .init()
  .then((monacoInstance) => {
    monacoInstance.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#42edf8', fontStyle: 'italic' },
        { token: 'keyword', foreground: '#FF5A00' },
        { token: 'number', foreground: '#00FF47' },
        { token: 'string', foreground: '#FA00FF' },
      ],
      colors: {
        'editor.foreground': '#F8F8F8',
        'editor.background': '#00000050',
        'editor.selectionBackground': '#DDF0FF33',
        'editor.lineHighlightBackground': '#FFFFFF08',
        'editorCursor.foreground': '#A7A7A7',
        'editorWhitespace.foreground': '#FFFFFF40',
      },
    })
  })
  .catch((error) => console.error('An error occurred during initialization of Monaco: ', error))

const MonacoReadOnly = ({ height, value }: any) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <Editor
        height={height}
        value={value}
        language="pascaligo"
        theme="myCustomTheme"
        options={{
          lineNumbers: false,
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
          folding: false,
          readOnly: true,
          fontSize: 14,
          fontFamily: 'Proxima Nova',
        }}
      />
    </div>
  )
}

type ChapterAboutViewProps = {
  validatorState: string
  validateCallback: () => void
}

export const ChapterAboutView = ({ validatorState, validateCallback }: ChapterAboutViewProps) => {
  return (
    <ChapterAboutStyled>
      <ChapterCourse>
        <Markdown
          children={data}
          options={{
            overrides: {
              h1: {
                component: ChapterH1,
              },
              h2: {
                component: ChapterH2,
              },
              h3: {
                component: ChapterH3,
              },
              code: {
                component: MonacoReadOnly,
              },
              dialog: {
                component: Dialog,
              },
            },
          }}
        />
      </ChapterCourse>
    </ChapterAboutStyled>
  )
}

ChapterAboutView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired,
}

ChapterAboutView.defaultProps = {
  validatorState: PENDING,
}
