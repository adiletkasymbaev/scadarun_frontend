import type { IconBaseProps } from "../types/icons";

type IntermediatePoleColors = {
  strokeColor?: string;
  fillColor?: string;
};

export const IntermediatePoleIcon = ({
  strokeColor = "black",
  fillColor = "white",
  ...props
}: IconBaseProps & IntermediatePoleColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_intermediate_pole)">
      <circle
        cx="64"
        cy="64"
        r="59.5"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="9"
      />
    </g>
    <defs>
      <clipPath id="clip0_intermediate_pole">
        <rect width="128" height="128" fill="white" />
      </clipPath>
    </defs>
  </svg>
);