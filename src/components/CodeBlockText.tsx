import React from 'react'
import styled from 'styled-components'
import type { WindowLocation } from 'reach__router'

type CodeBlockTextProps = {
  title: string;
  displayLanguage: string;
  children: JSX.Element;
  location: WindowLocation<unknown>;
}

const Highlighter = styled.span`
  .highlighted-number {
    color: #FFFF00 !important;
  }
  .react-syntax-highlighter-line-number:hover {
    color: #FFFFFF !important;
  }
  .highlighted-line {
    background: rgba(204,255,0,0.25) !important;
  }
  .code-line {
    width: 100%;
    display: block;
  }
  .line-wrapper {
    display: flex;
  }
`

const CodeBlockText = ({displayLanguage, location, title, children, ...restProps}: CodeBlockTextProps) => {
  const [prevCodeLine, setPrevCodeLine] = React.useState<Element>()
  const [activateLine, setActivateLine] = React.useState<number>()
  const urlSafeTitle = encodeURIComponent(title)
  React.useEffect(() => {
    const codeBlockNumbers = document.querySelectorAll(`.${urlSafeTitle} .react-syntax-highlighter-line-number`)
    codeBlockNumbers.forEach((number) => {
      if (number.textContent){
        const currentNumber = parseInt(number.textContent)
        number.id = `${urlSafeTitle}-${number.textContent}`
        number.addEventListener('click', () => {
          setActivateLine(currentNumber)
        })
      }
    })
    if (location.hash.includes(urlSafeTitle)) {
      setActivateLine(
        parseInt(location.hash.substring(location.hash.indexOf(urlSafeTitle)+urlSafeTitle.length+1))
        )
      const preSelectedLine = document.querySelector(location.hash)
      console.log(preSelectedLine)
      if (preSelectedLine) {
        setTimeout(() => {
          preSelectedLine.scrollIntoView()
        }, 500)
      }
    }
  }, [])

  React.useEffect(() => {
    const codeLine = document.querySelector(`.${urlSafeTitle} .row-${activateLine}`)
    if (prevCodeLine) {
      prevCodeLine.classList.remove('highlighted-line')
    }
    if (codeLine) {
      codeLine.classList.add('highlighted-line')
      setPrevCodeLine(codeLine)
    }
    if (activateLine){
      window.history.pushState({}, '', `#${urlSafeTitle}-${activateLine}`);
    }
  }, [activateLine])

  return (
    <pre {...restProps} className={urlSafeTitle}>
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
