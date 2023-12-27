import styled from "styled-components";
import cn from "classnames";

export const Container = styled.section.attrs<{ [key: string]: unknown }>(
  () => ({
    className: cn("container")
  })
)`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  gap: 15px;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.background.primary};

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: 32px;
  }
`;
