import type { IconBaseProps } from "../types/icons";

export type SparkGapColors = {
  fill?: string;
};

export const SparkGapIcon = ({
  fill = "#EA7474",
  ...props
}: IconBaseProps & SparkGapColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="78"
    viewBox="0 0 20 78"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_spark_gap)">
      <rect x="8" y="69" width="4" height="9" fill={fill} />
      <path d="M10 48L19.5263 69H0.473721L10 48Z" fill={fill} />

      <rect
        width="4"
        height="9"
        transform="matrix(1 0 0 -1 8 9)"
        fill={fill}
      />
      <path d="M10 30L19.5263 9H0.473721L10 30Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_spark_gap">
        <rect width="20" height="78" fill="white" />
      </clipPath>
    </defs>
  </svg>
);