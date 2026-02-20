import type { IconBaseProps } from "../types/icons";

export type LoadBreakSwitchColors = {
  stroke?: string;
  fill?: string;
};

export const LoadBreakSwitchIcon = ({
  stroke = "#EA7474",
  fill = "#00FF3C",
  ...props
}: IconBaseProps & LoadBreakSwitchColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_load_break_switch)">
      <rect
        x="1"
        y="1"
        width="40"
        height="2"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="1"
        y="39"
        width="40"
        height="2"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="2.82843"
        y="21"
        width="25.6985"
        height="25.6985"
        transform="rotate(-45 2.82843 21)"
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
      />
    </g>

    <defs>
      <clipPath id="clip0_load_break_switch">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);