import styled from "styled-components";
import { StyledImage } from "@components/Image/styled/Image.styled";

export const SimulationProcessImage = styled(StyledImage)`
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  overflow: hidden;
  max-height: max(100vh - 270px, 500px);
  aspect-ratio: 3/4;

  .ant-skeleton {
    width: 100%;
    height: 100%;
  }

  img {
    //max-height: max(calc(100vh - 270px), 500px);
    object-position: top center;
    object-fit: contain !important;

    border-radius: 8px;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.mineshaft};

    //aspect-ratio: 3/4;
  }
`;
