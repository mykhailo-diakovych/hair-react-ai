import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const StyledUploadPhotoList = styled(GroupItems)`
  position: relative;
  grid-template-columns: repeat(auto-fit, minmax(120px, 160px));
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
`;
