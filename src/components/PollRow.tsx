import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import RippleOverlay from './RippleOverlay';
import _ from 'lodash';

const RowWrapper = styled.div<{
  checked: boolean;
  voted: boolean;
}>`
  border: 1.5px solid black;
  display: flex;
  justify-content: space-between;
  width: 200px;
  border-radius: 3px;
  position: relative;
  padding: 5px;
  margin: 8px 0;
  position: relative;
  overflow: hidden;
  transition: background 400ms;
  cursor: pointer;
  ${(p) =>
    !p.voted
      ? p.checked
        ? 'background-color: rgb(100, 100, 100); !important'
        : 'background-color: rgb(255, 255, 255);'
      : ''}
  background-color: rgb(255, 255, 255);
  ${(p) => (!p.voted ? '&:hover {background-color: rgb(150, 150, 150);}' : '')}
`;

const OptionsDisplay = styled.p`
  margin: 0;
`;

const Filler = styled.span<{
  width: number;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(p) => p.width}%;
  height: 105%;
  background-color: rgba(100, 100, 100, 0.5);
`;

export type PollRowTypes = {
  choice: string;
  setCheckedBox: React.Dispatch<React.SetStateAction<number | undefined>>;
  index: number;
  checked: boolean;
  voted: boolean;
  votes: number;
  totalVotes: number;
};

const PollRow = ({
  choice,
  setCheckedBox,
  index,
  checked,
  voted,
  votes,
  totalVotes,
}: PollRowTypes) => {
  const [renderOverlay, setRenderOverlay] = React.useState<
    Array<{
      left: number;
      top: number;
      diameter: number;
      renderStatus: boolean;
      id: string;
    }>
  >([]);
  const handleOnClick = (event: MouseEvent) => {
    setCheckedBox(index);
    const radius =
      Math.max(
        event.currentTarget.clientWidth,
        event.currentTarget.clientHeight
      ) / 2;
    const boundingClientRect = event.currentTarget.getBoundingClientRect();
    setRenderOverlay((prevRenderOverlay) => {
      const prevRenderOverlayCopy = JSON.parse(
        JSON.stringify(prevRenderOverlay)
      );
      prevRenderOverlayCopy.push({
        left: event.clientX - boundingClientRect.left - radius,
        top: event.clientY - boundingClientRect.top - radius,
        diameter: 2 * radius,
        renderStatus: true,
        id: _.uniqueId('overlay-'),
      });
      return prevRenderOverlayCopy;
    });
  };

  return (
    <RowWrapper checked={checked} onClick={handleOnClick} voted={voted}>
      {renderOverlay.map((overlayInfo) => {
        if (overlayInfo.renderStatus) {
          return (
            <RippleOverlay
              left={overlayInfo.left}
              top={overlayInfo.top}
              diameter={overlayInfo.diameter}
              setRenderOverlay={setRenderOverlay}
              overlayId={overlayInfo.id}
            />
          );
        }
      })}
      {voted ? (
        <>
          <OptionsDisplay>{votes}</OptionsDisplay>
          <OptionsDisplay>
            {((votes / totalVotes) * 100).toFixed(1)}%
          </OptionsDisplay>
          <Filler width={(votes / totalVotes) * 100} />
        </>
      ) : (
        <>
          <OptionsDisplay>{choice}</OptionsDisplay>
        </>
      )}
    </RowWrapper>
  );
};

export default PollRow;
