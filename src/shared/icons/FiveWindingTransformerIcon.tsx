import type { FiveWindingTransformerColors, IconBaseProps } from "../types/icons";

export const FiveWindingTransformerIcon = ({
  ringTopRight = "#EA7474",
  ringTopLeft = "#BD3ABD",
  ringBottomRight = "#4242A0",
  ringBottomCenter = "#3A9D6B",
  ringBottomLeft = "black",
  ...props
}: IconBaseProps & FiveWindingTransformerColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="145"
    height="109"
    viewBox="0 0 145 109"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_95)">
      <circle cx="93" cy="31" r="29" stroke={ringTopRight} strokeWidth="4" />
      <circle cx="114" cy="78" r="29" stroke={ringBottomRight} strokeWidth="4" />
      <circle cx="52" cy="31" r="29" stroke={ringTopLeft} strokeWidth="4" />
      <circle cx="73" cy="78" r="29" stroke={ringBottomCenter} strokeWidth="4" />
      <circle cx="31" cy="78" r="29" stroke={ringBottomLeft} strokeWidth="4" />
    </g>
    <defs>
      <clipPath id="clip0_85_95">
        <rect width="145" height="109" fill="white" />
      </clipPath>
    </defs>
  </svg>
);