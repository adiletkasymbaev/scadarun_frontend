import type { IconBaseProps, ThreeWindingTransformerColors } from "../types/icons";

export const ThreeWindingTransformerIcon = ({
  ringTop = "#EA7474",
  ringRight = "#BD3ABD",
  ringLeft = "#4242A0",
  ...props
}: IconBaseProps & ThreeWindingTransformerColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="108"
    height="99"
    viewBox="0 0 108 99"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_23)">
      <circle cx="55" cy="31" r="29" stroke={ringTop} strokeWidth="4" />
      <circle cx="77" cy="68" r="29" stroke={ringRight} strokeWidth="4" />
      <circle cx="31" cy="68" r="29" stroke={ringLeft} strokeWidth="4" />
    </g>
    <defs>
      <clipPath id="clip0_85_23">
        <rect width="108" height="99" fill="white" />
      </clipPath>
    </defs>
  </svg>
);