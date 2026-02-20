import type { IconBaseProps } from "../types/icons";

export type DcMotorColors = {
  stroke?: string;
};

export const DcMotorIcon = ({
  stroke = "#EA7474",
  ...props
}: IconBaseProps & DcMotorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="42"
    viewBox="0 0 80 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_dc_motor)">
      <circle
        cx="40"
        cy="21"
        r="19"
        stroke={stroke}
        strokeWidth="4"
      />
      <rect
        x="2"
        y="13"
        width="19"
        height="15"
        stroke={stroke}
        strokeWidth="4"
      />
      <rect
        x="59"
        y="13"
        width="19"
        height="15"
        stroke={stroke}
        strokeWidth="4"
      />
    </g>

    <defs>
      <clipPath id="clip0_dc_motor">
        <rect width="80" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);