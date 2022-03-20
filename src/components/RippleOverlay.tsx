import React, { SetStateAction } from 'react';
import styled from 'styled-components';

const RippleEffect = styled.span<{
  left: number;
  top: number;
  diameter: number;
}>`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  width: ${(p) => p.diameter}px;
  height: ${(p) => p.diameter}px;
  left: ${(p) => p.left}px;
  top: ${(p) => p.top}px;
  animation: ripple 600ms linear;
  transform: scale(0);
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

export type RippleOverlayTypes = {
  left: number;
  top: number;
  diameter: number;
  setRenderOverlay: React.Dispatch<
    SetStateAction<
      {
        left: number;
        top: number;
        diameter: number;
        renderStatus: boolean;
        id: string;
      }[]
    >
  >;
  overlayId: string;
};

export type PrevRenderOverlayCopyType = {
  left: number;
  top: number;
  diameter: number;
  renderStatus: boolean;
  id: string;
}[];

const RippleOverlay = ({
  left,
  top,
  diameter,
  setRenderOverlay,
  overlayId,
}: RippleOverlayTypes) => {
  React.useEffect(() => {
    setTimeout(() => {
      setRenderOverlay((prevRenderOverlay) => {
        const prevRenderOverlayCopy: PrevRenderOverlayCopyType = JSON.parse(
          JSON.stringify(prevRenderOverlay)
        );
        return prevRenderOverlayCopy.filter(
          (element) => element.id != overlayId
        );
      });
    }, 600);
  }, []);
  return <RippleEffect left={left} top={top} diameter={diameter} />;
};

export default RippleOverlay;
