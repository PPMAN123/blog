import _ from 'lodash';
import React from 'react';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { useNotificationContext } from '../context/NotificationContext';
import { NotificationType } from './Notification';

const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }
  &::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
  z-index: -1;
  visibility: hidden;
  left: -4px;
`;

const TooltipWrapper = styled.div`
  .hidden {
    display: none;
  }
`;

const StyledMenu = styled(Menu)`
  && {
    border: none;
  }
`;

export type TooltipTypes = {
  popperRef: React.MutableRefObject<null>;
  lineContent: string;
  wrapperClassName: string;
  currentLine: number;
  fileName: string;
};

const Tooltip = ({
  popperRef,
  lineContent,
  wrapperClassName,
  currentLine,
  fileName,
}: TooltipTypes) => {
  const { triggerNewNotification } = useNotificationContext();
  const handleCopyLine = () => {
    navigator.clipboard.writeText(lineContent);
    triggerNewNotification({
      message: `You copied line ${currentLine} from file "${fileName}"`,
      type: NotificationType.POSITIVE,
      id: _.uniqueId('NotificationId'),
    });
  };
  const handleCopyPermaLink = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerNewNotification({
      message: `You copied the permalink for line ${currentLine} from file "${fileName}"`,
      type: NotificationType.POSITIVE,
      id: _.uniqueId('NotificationId'),
    });
  };
  return (
    <TooltipWrapper>
      <div ref={popperRef} className={`${wrapperClassName}`}>
        <StyledMenu vertical>
          <Menu.Item onClick={handleCopyLine}>Copy Line</Menu.Item>
          <Menu.Item onClick={handleCopyPermaLink}>Copy Permalink</Menu.Item>
          <Arrow data-popper-arrow></Arrow>
        </StyledMenu>
      </div>
    </TooltipWrapper>
  );
};

export default Tooltip;
