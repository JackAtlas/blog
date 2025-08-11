'use client'

import MDEditor from '@uiw/react-md-editor'

export default function MarkdownPreview({
  source
}: {
  source?: string
}) {
  return (
    <>
      <MDEditor.Markdown source={source}></MDEditor.Markdown>
    </>
  )
}
