import { css } from "styled-components";

export const GlobalEyeIconStyles = css`
  .password-status-icon {
    color: currentColor;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &__eye {
      /* set these to blink faster/slower */
      --duration-blink: 0.2s;
      --duration-lashes: 0.2s;

      /* calculated and fixed vars */
      --delay-lashes: var(--duration-blink);
      --duration-pupil: 0.1s;
      --delay-pupil: calc(var(--duration-blink) * 2 / 3);
    }

    &__eye-bottom,
    &__eye-top {
      stroke-linecap: round;
    }

    &__eye-top {
      transition: transform var(--duration-blink) ease-in;

      .is-visible & {
        transform: rotateX(0.5turn);
        animation: scaleUp var(--duration-lashes) var(--delay-lashes)
          ease-in-out;
      }
    }

    &__eye-lashes {
      transition: transform var(--duration-blink) ease-in;
      animation: scaleDown var(--duration-lashes) var(--duration-blink)
        ease-in-out;

      .is-visible & {
        transform: rotateX(0.5turn);
        animation: scaleUp var(--duration-lashes) var(--delay-lashes)
          ease-in-out;
      }
    }

    &__eye-pupil {
      opacity: 0;
      transition: opacity var(--duration-pupil) var(--delay-pupil) ease;

      .is-visible & {
        opacity: 1;
      }
    }
  }

  @keyframes scaleUp {
    50% {
      transform: rotateX(0.5turn) scaleY(1.15);
    }

    to {
      transform: rotateX(0.5turn) scaleY(1);
    }
  }

  @keyframes scaleDown {
    50% {
      transform: scaleY(1.15);
    }

    to {
      transform: scaleY(1);
    }
  }
`;
