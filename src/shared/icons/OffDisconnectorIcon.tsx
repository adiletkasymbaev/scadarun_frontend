import type { IconBaseProps } from "../types/icons";

export type OffDisconnectorColors = {
  fill?: string;
};

export const OffDisconnectorIcon = ({
  fill = "#EA7474",
  ...props
}: IconBaseProps & OffDisconnectorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="62"
    viewBox="0 0 42 62"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_off_disconnector)">
      <rect y="58" width="42" height="4" fill={fill} />
      <rect width="42" height="4" fill={fill} />
      <rect
        x="18"
        y="50.1499"
        width="42"
        height="4"
        transform="rotate(-60.7641 18 50.1499)"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_off_disconnector">
        <rect width="42" height="62" fill="white" />
      </clipPath>
    </defs>
  </svg>
);