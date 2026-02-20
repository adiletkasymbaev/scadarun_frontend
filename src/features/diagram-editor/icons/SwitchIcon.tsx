import type { IconBaseProps } from "../types/icons";

export type SwitchColors = {
  stroke?: string;
  fill?: string;
};

export const SwitchIcon = ({
  stroke = "#EA7474",
  fill = "#00FF3C",
  ...props
}: IconBaseProps & SwitchColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_switch)">
      <rect
        x="2"
        y="2"
        width="38"
        height="38"
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
      />
    </g>

    <defs>
      <clipPath id="clip0_switch">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);