import type { IconBaseProps } from "../types/icons";

export type ReactorColors = {
  stroke?: string;
  fill?: string;
};

export const ReactorIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & ReactorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="96"
    height="65"
    viewBox="0 0 96 65"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_reactor)">
      <path
        d="M79 32C79 49.1208 65.1208 63 48 63C30.8792 63 17 49.1208 17 32"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M57.5 2C75 2 79 14.6861 79 32.2314C79 49.7767 65.1208 64 48 64"
        stroke={stroke}
        strokeWidth="4"
      />
      <path d="M0 32L0 28L19 28V32H0Z" fill={fill} />
      <path d="M54 31V27L96 27V31L54 31Z" fill={fill} />
      <path d="M54 0H58V28H54V0Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_reactor">
        <rect width="96" height="65" fill="white" />
      </clipPath>
    </defs>
  </svg>
);