import styled from "styled-components";
import { cover, rgba } from "polished";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const ProgressbarContainer = styled(FlexGroup)`
  background-color: ${({ theme }) => rgba(theme.background.primary, 0.4)};

  ${cover()}
`;
