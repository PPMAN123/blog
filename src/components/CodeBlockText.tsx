import React from 'react'
import styled from 'styled-components'

type CodeBlockTextProps = {
  displayLanguage: string
  children: JSX.Element
}

const Highlighter = styled.span`
  .highlighted-number {
    color: #FFFF00 !important;
  }
  .react-syntax-highlighter-line-number:hover {
    color: #FFFFFF !important;
  }
  .highlighted-line span {
    color: #FFFF00 !important;
    background-color: #FFFFFF !important;
  }
`

const CodeBlockText = ({displayLanguage, children, ...restProps}: CodeBlockTextProps) => {

  React.useEffect(() => {
    const codeBlockNumbers = document.querySelectorAll('.react-syntax-highlighter-line-number')
    codeBlockNumbers.forEach((number) => {
      if (number.textContent){
        const currentNumber = parseInt(number.textContent)
        const hexNumber = currentNumber.toString(16)
        const codeLine = document.querySelector(`.row-${currentNumber}`)
        number.textContent = hexNumber
        if (hexNumber.includes('f')) {
          number.className += ' highlighted-number'
        }
        number.id = `L${number.textContent}`
        number.addEventListener('click', () => {
          console.log(codeLine)
          if (codeLine) {
            codeLine.className += ' highlighted-line'
          }
        })
      }
    })
  }, [])

  return (
    <pre {...restProps}>
      <div>
        {displayLanguage}
      </div>
      <Highlighter>
        {children}
      </Highlighter>
    </pre>
  )
}

export default CodeBlockText
