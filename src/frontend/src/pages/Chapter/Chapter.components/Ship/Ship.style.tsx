import styled, { keyframes } from "styled-components/macro";

const shakes = keyframes`
  10% {
    transform: translate(2px, 2px);
  }
  20% {
    transform: translate(3px, 2px);
  }
  30% {
    transform: translate(5px, 4px);
  }
  40% {
    transform: translate(3px, 3px);
  }
  50% {
    transform: translate(3px, 3px);
  }
  60% {
    transform: translate(4px, 3px);
  }
  70% {
    transform: translate(2px, 4px);
  }
  80% {
    transform: translate(3px, 3px);
  }
  90% {
    transform: translate(4px, 4px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const jet = keyframes`
  0% {
    transform: scale(1.0);
  }
  50% {
	  transform: scale(1.05);
  }
  100% {
    transform: scale(0.95);
  }
`;

const pew = keyframes`
  0% {
    opacity: 0;
  }
  19% {
	  opacity: 0;
  }
  20% {
	  opacity: 1;
  }
  25% {
	  opacity: 1;
  }
  26% {
    opacity: 0;
  }
  49% {
	  opacity: 0;
  }
  50% {
	  opacity: 1;
  }
  51% {
    opacity: 0;
  }
  59% {
	  opacity: 0;
  }
  60% {
	  opacity: 1;
  }
  69% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  89% {
	  opacity: 0;
  }
  90% {
	  opacity: 1;
  }
  91% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

export const ShipStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${shakes} 1s linear infinite;
`;

export const ShipCabin = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ShipEngine = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ShipGun = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ShipWings = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ShipFlame = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${jet} 0.02s ease alternate infinite;
`;

export const ShipLaser = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${jet} 0.02s ease alternate infinite, ${pew} 10s linear alternate infinite;
`;

export const ShipPreloadedImages = styled.div`
  display: none;
`;
