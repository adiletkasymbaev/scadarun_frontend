import type { IconBaseProps } from "../types/icons";

export type ArcSuppressionReactorColors = {
  stroke?: string;
  fill?: string;
};

export const ArcSuppressionReactorIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & ArcSuppressionReactorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="163"
    viewBox="0 0 32 163"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_arc_suppression_reactor)">
      <rect x="9" y="74.5" width="4" height="10.5" fill={fill} />
      <path d="M11 50L20.5263 74.5H1.47372L11 50Z" fill={fill} />

      <rect
        width="4"
        height="10.5"
        transform="matrix(1 0 0 -1 9 10.5)"
        fill={fill}
      />
      <path d="M11 35L20.5263 10.5H1.47372L11 35Z" fill={fill} />

      <path
        d="M11 85C22.0391 87.2613 26.4341 89.991 30 98.3333C25.5243 106.127 21.251 108.791 11 111C21.2433 112.095 25.6319 114.683 30 124.333C25.7821 132.147 20.5622 133.972 11 137"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M11 111C22.0391 113.261 26.4341 115.991 30 124.333C25.5243 132.127 21.251 134.791 11 137C21.2433 138.095 25.6319 140.683 30 150.333C25.7821 158.147 20.5622 159.972 11 163"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>

    <defs>
      <clipPath id="clip0_arc_suppression_reactor">
        <rect width="32" height="163" fill="white" />
      </clipPath>
    </defs>
  </svg>
);