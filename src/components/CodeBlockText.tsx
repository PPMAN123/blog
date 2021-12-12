import React from 'react'

type CodeBlockTextProps = {
  displayLanguage: string
  children: JSX.Element
}

const CodeBlockText = ({displayLanguage, children, ...restProps}: CodeBlockTextProps) => {
  return (
    <pre {...restProps}>
      <div>
        {displayLanguage}
      </div>
      {children}
    </pre>
  )
}

export default CodeBlockText
