import type { IconBaseProps, FourWindingTransformerAltColors } from "../types/icons";

export const FourWindingTransformerAltIcon = ({
  ringTop = "#EA7474",
  ringCenter = "#4242A0",
  ringRightBottom = "#BD3ABD",
  ringLeftBottom = "#3A9D6B",
  ...props
}: IconBaseProps & FourWindingTransformerAltColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="145"
    height="109"
    viewBox="0 0 145 109"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_76)">
      <circle cx="72" cy="31" r="29" stroke={ringTop} strokeWidth="4" />
      <circle cx="72" cy="78" r="29" stroke={ringCenter} strokeWidth="4" />
      <circle cx="114" cy="78" r="29" stroke={ringRightBottom} strokeWidth="4" />
      <circle cx="31" cy="78" r="29" stroke={ringLeftBottom} strokeWidth="4" />
    </g>
    <defs>
      <clipPath id="clip0_85_76">
        <rect width="145" height="109" fill="white" />
      </clipPath>
    </defs>
  </svg>
);