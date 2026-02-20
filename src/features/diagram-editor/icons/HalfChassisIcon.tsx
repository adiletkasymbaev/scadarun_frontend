import type { IconBaseProps } from "../types/icons";

export type HalfChassisColors = {
  stroke?: string;
  fill?: string;
};

export const HalfChassisIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & HalfChassisColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="46"
    viewBox="0 0 42 46"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_half_chassis)">
      <line
        x1="0.992278"
        y1="32.2635"
        x2="21.9923"
        y2="44.2635"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="19.9473"
        y1="44.2995"
        x2="40.9473"
        y2="31.2995"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="0.992278"
        y1="22.2635"
        x2="21.9923"
        y2="34.2635"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="19.9473"
        y1="34.2995"
        x2="40.9473"
        y2="21.2995"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M19 33C19 34.1046 19.8954 35 21 35C22.1046 35 23 34.1046 23 33H21H19ZM23 2L23 0H19V2H21H23ZM21 33H23V2H21H19L19 33H21Z"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_half_chassis">
        <rect width="42" height="46" fill="white" />
      </clipPath>
    </defs>
  </svg>
);