import type { IconBaseProps } from "../types/icons";

export type CurrentTransformerColors = {
  stroke?: string;
};

export const CurrentTransformerIcon = ({
  stroke = "#304486",
  ...props
}: IconBaseProps & CurrentTransformerColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="65"
    height="62"
    viewBox="0 0 65 62"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_current_transformer)">
      <line
        x1="1.5"
        y1="55.009"
        x2="1.5"
        y2="0"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="63.5"
        y1="55.009"
        x2="63.5"
        y2="0"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="32.5"
        y1="56"
        x2="32.5"
        y2="35"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="3.5"
        y1="37"
        x2="63.5"
        y2="37"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M1 53.5C12.4078 62.8736 19.9789 61.7929 32 52.5"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M32.5 52C43.9078 61.3736 51.9789 62.7929 64 53.5"
        stroke={stroke}
        strokeWidth="4"
      />
    </g>

    <defs>
      <clipPath id="clip0_current_transformer">
        <rect width="65" height="62" fill="white" />
      </clipPath>
    </defs>
  </svg>
);