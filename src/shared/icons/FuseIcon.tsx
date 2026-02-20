import type { IconBaseProps } from "../types/icons";

export type FuseColors = {
  stroke?: string;
  fill?: string;
};

export const FuseIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & FuseColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="78"
    viewBox="0 0 42 78"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_fuse)">
      <rect
        x="2"
        y="2"
        width="38"
        height="74"
        stroke={stroke}
        strokeWidth="4"
      />
      <rect
        x="19"
        y="78"
        width="78"
        height="4"
        transform="rotate(-90 19 78)"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_fuse">
        <rect width="42" height="78" fill="white" />
      </clipPath>
    </defs>
  </svg>
);