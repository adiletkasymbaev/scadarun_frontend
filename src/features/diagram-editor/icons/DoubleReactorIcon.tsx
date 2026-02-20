import type { IconBaseProps } from "../types/icons";

export type DoubleReactorColors = {
  stroke?: string;
  fill?: string;
};

export const DoubleReactorIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & DoubleReactorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="96"
    height="89"
    viewBox="0 0 96 89"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_double_reactor)">
      <path
        d="M79 32C79 49.1208 65.1208 63 48 63C30.8792 63 17 49.1208 17 32"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M57.5 2C75 2 79 14.3792 79 31.5C79 48.6208 65.1208 62.5 48 62.5"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M38.5 2C21 2 17 14.3792 17 31.5C17 48.6208 30.8792 62.5 48 62.5"
        stroke={stroke}
        strokeWidth="4"
      />

      <path d="M38 0H42V28H38V0Z" fill={fill} />
      <path d="M0 32L0 28L42 28V32L0 32Z" fill={fill} />
      <path d="M54 32V28L96 28V32L54 32Z" fill={fill} />
      <path d="M46 61H50V89H46V61Z" fill={fill} />
      <path d="M54 0H58V28H54V0Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_double_reactor">
        <rect width="96" height="89" fill="white" />
      </clipPath>
    </defs>
  </svg>
);