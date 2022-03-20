import React, { useRef } from 'react';
import styled from 'styled-components';
import type { WindowLocation } from 'reach__router';
import { usePrevious } from '../hooks/usePrevious';
import { createPopper } from '@popperjs/core';
import Tooltip from './Tooltip';
import { NotificationType } from './Notification';
import { useNotificationContext } from '../context/NotificationContext';
import _ from 'lodash';

type CodeBlockTextProps = {
  title: string;
  displayLanguage: string;
  children: JSX.Element;
  location: WindowLocation<unknown>;
};

const Highlighter = styled.span`
  .highlighted-number {
    color: #ffff00 !important;
  }
  .react-syntax-highlighter-line-number:hover {
    color: #ffffff !important;
    cursor: pointer;
  }
  .highlighted-line {
    background: rgba(204, 255, 0, 0.25) !important;
  }
  .code-line {
    width: 100%;
    display: block;
  }
  .line-wrapper {
    display: flex;
  }
`;

const CodeBlockText = ({
  displayLanguage,
  location,
  title,
  children,
  ...restProps
}: CodeBlockTextProps) => {
  const [activateLine, setActivateLine] = React.useState<number>();
  const [currentLineContent, setCurrentLineContent] =
    React.useState<string>('');
  const prevActivateLine = usePrevious(activateLine);
  const urlSafeTitle = encodeURIComponent(title);
  const popper = useRef(null);
  const [showPopper, setShowPopper] = React.useState<boolean>(false);
  const { triggerNewNotification } = useNotificationContext();
  React.useEffect(() => {
    const codeBlockNumbers = document.querySelectorAll(
      `.${urlSafeTitle} .react-syntax-highlighter-line-number`
    );
    codeBlockNumbers.forEach((number) => {
      if (number.textContent) {
        const currentNumber = parseInt(number.textContent);
        number.id = `${urlSafeTitle}-${number.textContent}`;
        number.addEventListener('click', () => {
          const currentLine = document.querySelector(
            `.${urlSafeTitle} .row-${currentNumber}`
          );
          setShowPopper(true);
          createPopper(number, popper.current as unknown as HTMLElement, {
            placement: 'right',
          });
          if (
            currentLine &&
            currentLine.classList.contains('highlighted-line')
          ) {
            setActivateLine(-1);
          } else {
            setActivateLine(currentNumber);
          }
        });
      }
    });
    if (location.hash.includes(urlSafeTitle)) {
      setActivateLine(
        parseInt(
          location.hash.substring(
            location.hash.indexOf(urlSafeTitle) + urlSafeTitle.length + 1
          )
        )
      );
      const preSelectedLine = document.querySelector(location.hash);
      if (preSelectedLine) {
        setTimeout(() => {
          preSelectedLine.scrollIntoView();
        }, 500);
      }
    }
  }, []);

  React.useEffect(() => {
    document.body.onmouseup = () => {
      if (showPopper) {
        setShowPopper(false);
      }
    };
  }, [showPopper]);

  React.useEffect(() => {
    const codeLine = document.querySelector(
      `.${urlSafeTitle} .row-${activateLine}`
    );
    const prevCodeLine = document.querySelector(
      `.${urlSafeTitle} .row-${prevActivateLine}`
    );
    if (prevCodeLine) {
      prevCodeLine.classList.remove('highlighted-line');
      if (activateLine === -1) {
        history.replaceState(null, '', ' ');
        setShowPopper(false);
        triggerNewNotification({
          message: `You de-selected line ${prevCodeLine.classList[1].substring(
            prevCodeLine.classList[1].indexOf('-') + 1
          )} from file "${urlSafeTitle}"`,
          type: NotificationType.NEGATIVE,
          id: _.uniqueId('NotificationId'),
        });
      }
    }
    if (codeLine) {
      codeLine.classList.add('highlighted-line');
      triggerNewNotification({
        message: `You selected line ${activateLine} from file "${urlSafeTitle}"`,
        type: NotificationType.POSITIVE,
        id: _.uniqueId('NotificationId'),
      });
    }
    if (activateLine && activateLine !== -1) {
      window.history.pushState({}, '', `#${urlSafeTitle}-${activateLine}`);
    }
    let acc = '';
    codeLine?.childNodes.forEach((node) => {
      acc += node.textContent;
    });
    setCurrentLineContent(acc);
  }, [activateLine]);

  return (
    <pre {...restProps} className={urlSafeTitle}>
      <div>{displayLanguage}</div>
      <Highlighter>{children}</Highlighter>
      <Tooltip
        popperRef={popper}
        lineContent={currentLineContent}
        wrapperClassName={showPopper ? '' : 'hidden'}
        currentLine={activateLine ? activateLine : 0}
        fileName={urlSafeTitle}
      />
    </pre>
  );
};

export default CodeBlockText;
