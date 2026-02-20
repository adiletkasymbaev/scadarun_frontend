import type { IconBaseProps, TwoWindingTransformerColors } from "../types/icons";

export const TwoWindingTransformerIcon = ({
  ringTop = "#EA7474",
  ringBottom = "#BD3ABD",
  ...props
}: IconBaseProps & TwoWindingTransformerColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="107"
    viewBox="0 0 62 107"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_2)">
      <circle cx="31" cy="31" r="29" stroke={ringTop} strokeWidth="4" />
      <circle
        cx="31"
        cy="76.3928"
        r="29"
        stroke={ringBottom}
        strokeWidth="4"
      />
    </g>
    <defs>
      <clipPath id="clip0_85_2">
        <rect width="62" height="107" fill="white" />
      </clipPath>
    </defs>
  </svg>
);