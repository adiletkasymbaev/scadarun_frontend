import type { IconBaseProps } from "../types/icons";

export type ChokeCoilColors = {
  stroke?: string;
  fill?: string;
};

export const ChokeCoilIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & ChokeCoilColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="111"
    viewBox="0 0 23 111"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_choke_coil)">
      <rect width="4" height="16.5" transform="matrix(-1 0 0 1 23 0)" fill={fill} />
      <rect width="4" height="16.5" transform="matrix(-1 0 0 1 23 94)" fill={fill} />

      <path
        d="M21 16.5C9.96094 18.7613 5.56586 21.491 2 29.8333C6.47575 37.6267 10.749 40.2909 21 42.5C10.7567 43.5948 6.36811 46.1828 2 55.8333C6.2179 63.6471 11.4378 65.4716 21 68.5"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M21 42.5C9.96094 44.7613 5.56586 47.491 2 55.8333C6.47575 63.6267 10.749 66.2909 21 68.5C10.7567 69.5948 6.36811 72.1828 2 81.8333C6.2179 89.6471 11.4378 91.4716 21 94.5"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>

    <defs>
      <clipPath id="clip0_choke_coil">
        <rect width="23" height="111" fill="white" />
      </clipPath>
    </defs>
  </svg>
);