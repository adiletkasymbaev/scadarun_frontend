import type { IconBaseProps, FourWindingTransformerColors } from "../types/icons";

export const FourWindingTransformerIcon = ({
  ringTop = "#EA7474",
  ringBottom = "#BD3ABD",
  ringRight = "#3A9D6B",
  ringLeft = "#4242A0",
  ...props
}: IconBaseProps & FourWindingTransformerColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="145"
    height="109"
    viewBox="0 0 145 109"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_61)">
      <circle cx="72" cy="31" r="29" stroke={ringTop} strokeWidth="4" />
      <circle cx="72" cy="78" r="29" stroke={ringBottom} strokeWidth="4" />
      <circle cx="114" cy="55" r="29" stroke={ringRight} strokeWidth="4" />
      <circle cx="31" cy="55" r="29" stroke={ringLeft} strokeWidth="4" />
    </g>
    <defs>
      <clipPath id="clip0_85_61">
        <rect width="145" height="109" fill="white" />
      </clipPath>
    </defs>
  </svg>
);