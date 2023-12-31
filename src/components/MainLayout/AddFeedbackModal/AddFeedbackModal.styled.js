import { device } from 'constants';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.theme.backdropColor};
  backdrop-filter: blur(3px);
  z-index: 1200;
`;

export const ModalDiv = styled.div`
  width: 335px;
  padding: 28px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  border: 1px solid ${p => p.theme.modalBorderColor};
  background-color: ${p => p.theme.sidebarBGColor};
  box-shadow: 0px 4px 57px 0px rgba(17, 17, 17, 0.05);

  @media (min-width: ${device.tablet}px) {
    width: 468px;
    padding: 32px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 0;
  background-color: transparent;
  color: ${p => p.theme.mainTextColor};
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    color: ${p => p.theme.mainAccentColor};
  }

  @media (min-width: ${device.tablet}px) {
    top: 18px;
    right: 18px;
  }
`;

export const Icon = styled.svg`
  stroke: currentColor;
  fill: none;
`;
