import type { IconBaseProps } from "../types/icons";

export type OnDisconnectorColors = {
  fill?: string;
};

export const OnDisconnectorIcon = ({
  fill = "#EA7474",
  ...props
}: IconBaseProps & OnDisconnectorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="62"
    viewBox="0 0 42 62"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_on_disconnector)">
      <rect y="58" width="42" height="4" fill={fill} />
      <rect width="42" height="4" fill={fill} />
      <rect
        x="19"
        y="52"
        width="42"
        height="4"
        transform="rotate(-90 19 52)"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_on_disconnector">
        <rect width="42" height="62" fill="white" />
      </clipPath>
    </defs>
  </svg>
);