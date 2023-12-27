import styled from "styled-components";

export const StyledGalleryUploadImageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  flex: none;
  width: 50px;
  height: 50px;
  margin: 5px;
  position: relative;

  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.general.borderRadius / 2}px;

  background-color: ${(props) => props.theme.background.primary};
  color: inherit;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
