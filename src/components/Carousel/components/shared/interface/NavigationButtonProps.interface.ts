import { ButtonProps } from "@components/Button/Button";

export interface NavigationButtonProps extends ButtonProps {
  innerRef: React.RefObject<HTMLButtonElement>;
}
