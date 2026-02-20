import type { IconBaseProps } from "../types/icons";

export type ZhuchokColors = {
  stroke?: string;
  fill?: string;
};

export const ZhuchokIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & ZhuchokColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="56"
    viewBox="0 0 50 56"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_zhuchok)">
      <rect
        x="19"
        y="56"
        width="56"
        height="4"
        transform="rotate(-90 19 56)"
        fill={fill}
      />

      <rect x="38" y="18" width="12" height="4" fill={fill} />
      <rect x="37" y="36" width="13" height="4" fill={fill} />

      <circle
        cx="21"
        cy="28"
        r="19"
        stroke={stroke}
        strokeWidth="4"
      />
    </g>

    <defs>
      <clipPath id="clip0_zhuchok">
        <rect width="50" height="56" fill="white" />
      </clipPath>
    </defs>
  </svg>
);