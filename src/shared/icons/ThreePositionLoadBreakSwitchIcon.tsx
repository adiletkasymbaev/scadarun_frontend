import type { IconBaseProps } from "../types/icons";

export type ThreePositionLoadBreakSwitchColors = {
  stroke?: string;
  fill?: string;
};

export const ThreePositionLoadBreakSwitchIcon = ({
  stroke = "#EA7474",
  fill = "#00FF3C",
  ...props
}: IconBaseProps & ThreePositionLoadBreakSwitchColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="82"
    height="49"
    viewBox="0 0 82 49"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_three_position_lbs)">
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

      <path d="M40 19H67V23H40V19Z" fill={stroke} />
      <path d="M47 31H82V35H47V31Z" fill={stroke} />
      <path d="M52 38H77V42H52V38Z" fill={stroke} />
      <path d="M58 45H71V49H58V45Z" fill={stroke} />

      <rect
        x="63"
        y="31"
        width="10"
        height="4"
        transform="rotate(-90 63 31)"
        fill={stroke}
      />
    </g>

    <defs>
      <clipPath id="clip0_three_position_lbs">
        <rect width="82" height="49" fill="white" />
      </clipPath>
    </defs>
  </svg>
);