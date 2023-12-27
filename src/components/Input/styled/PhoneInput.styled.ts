import styled from "styled-components";

import "react-international-phone/style.css";
import { PhoneInputBase } from "@components/Input/variants/PhoneInputBase";

export const PhoneInput = styled(PhoneInputBase)`
  //--phone-height: 50px;
  --react-international-phone-height: 50px;
  --react-international-phone-background-color: ${(props) =>
    props.theme.colors.mineshaft8};
  --react-international-phone-country-selector-background-color-hover: ${(
    props
  ) => props.theme.colors.mineshaft};
  --react-international-phone-border-color: transparent;
  --react-international-phone-text-color: ${(props) =>
    props.theme.colors.primary};
  --react-international-phone-font-size: 16px;
  --react-international-phone-border-radius: ${(props) =>
    props.theme.general.borderRadius}px;
  --react-international-phone-selected-dropdown-item-background-color: ${(
    props
  ) => props.theme.colors.mineshaft};

  .react-international-phone-input {
    width: 100%;
  }

  .react-international-phone-input-container
    .react-international-phone-country-selector-button {
    padding: 8px;
  }
`;
