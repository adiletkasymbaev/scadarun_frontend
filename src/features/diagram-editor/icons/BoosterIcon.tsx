import type { IconBaseProps, BoosterColors } from "../types/icons";

export const BoosterIcon = ({
  ring = "#EA7474",
  ...props
}: IconBaseProps & BoosterColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="62"
    viewBox="0 0 62 62"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_16)">
      <circle cx="31" cy="31" r="29" stroke={ring} strokeWidth="4" />
    </g>
    <defs>
      <clipPath id="clip0_85_16">
        <rect width="62" height="62" fill="white" />
      </clipPath>
    </defs>
  </svg>
);