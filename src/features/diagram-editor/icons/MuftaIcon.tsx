import type { IconBaseProps } from "../types/icons";

export type MuftaColors = {
  stroke?: string;
  fill?: string;
};

export const MuftaIcon = ({
  stroke = "#EA7474",
  fill = "#FFEA00",
  ...props
}: IconBaseProps & MuftaColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="61"
    height="40"
    viewBox="0 0 61 40"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_muhta)">
      <path
        d="M57.2158 38.5H3.78418L30.5 3.30664L57.2158 38.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
      />
    </g>

    <defs>
      <clipPath id="clip0_muhta">
        <rect width="61" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);