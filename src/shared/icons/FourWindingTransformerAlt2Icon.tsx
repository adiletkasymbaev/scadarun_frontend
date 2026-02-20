import type { IconBaseProps, FourWindingTransformerAlt2Colors } from "../types/icons";

export const FourWindingTransformerAlt2Icon = ({
  ringTopLeft = "#EA7474",
  ringTopRight = "#4242A0",
  ringBottomLeft = "#BD3ABD",
  ringBottomRight = "#3A9D6B",
  ...props
}: IconBaseProps & FourWindingTransformerAlt2Colors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="103"
    height="105"
    viewBox="0 0 103 105"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_83)">
      <circle cx="31" cy="31" r="29" stroke={ringTopLeft} strokeWidth="4" />
      <circle cx="72" cy="31" r="29" stroke={ringTopRight} strokeWidth="4" />
      <circle cx="31" cy="74" r="29" stroke={ringBottomLeft} strokeWidth="4" />
      <circle cx="72" cy="74" r="29" stroke={ringBottomRight} strokeWidth="4" />
    </g>
    <defs>
      <clipPath id="clip0_85_83">
        <rect width="103" height="105" fill="white" />
      </clipPath>
    </defs>
  </svg>
);