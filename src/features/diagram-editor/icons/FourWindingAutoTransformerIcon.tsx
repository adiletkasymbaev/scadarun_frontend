import type { IconBaseProps, FourWindingAutoTransformerColors } from "../types/icons";

export const FourWindingAutoTransformerIcon = ({
  ringTop = "#BD3ABD",
  ringBottom = "#3A9D6B",
  ringRight = "#4242A0",
  ringLeft = "black",
  link = "#EA7474",
  ...props
}: IconBaseProps & FourWindingAutoTransformerColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="145"
    height="123"
    viewBox="0 0 145 123"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_87_128)">
      <circle cx="72" cy="45" r="29" stroke={ringTop} strokeWidth="4" />
      <circle cx="72" cy="92" r="29" stroke={ringBottom} strokeWidth="4" />
      <circle cx="114" cy="92" r="29" stroke={ringRight} strokeWidth="4" />
      <circle cx="31" cy="92" r="29" stroke={ringLeft} strokeWidth="4" />
      <path
        d="M98.2581 57.1952L100.02 51.6499C100.642 49.6918 100.958 47.6495 100.958 45.595L100.958 43.5422C100.958 41.0008 100.474 38.4827 99.531 36.1226L97.938 32.135C96.8321 29.3666 95.1213 26.8805 92.9308 24.8585L90.9171 22.9997C90.1456 22.2876 89.3193 21.6374 88.4457 21.055L85.5241 19.1072C84.355 18.3277 83.064 17.7487 81.7044 17.394L77.5801 16.3182C74.4454 15.5005 72.2581 12.6694 72.2581 9.42981L72.2581 -3.57019"
        stroke={link}
        strokeWidth="4"
      />
    </g>
    <defs>
      <clipPath id="clip0_87_128">
        <rect width="145" height="123" fill="white" />
      </clipPath>
    </defs>
  </svg>
);