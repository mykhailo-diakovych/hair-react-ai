import styled from "styled-components";

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  height: 3px;
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  background-color: ${(props) => props.theme.colors.gray7};
  border: none;
`;

export const StyledProgressbar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: block;
  background-color: ${(props) => props.theme.colors.malibuLight};
  border-radius: 0.5rem;
  animation: loading 3s linear infinite;

  @keyframes loading {
    0% {
      left: 0;
      right: 100%;
    }
    50% {
      left: 0;
      right: 0;
    }
    100% {
      left: 100%;
      right: 0;
    }
  }
`;
