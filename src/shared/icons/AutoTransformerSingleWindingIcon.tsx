import type { IconBaseProps, AutoTransformerSingleWindingColors } from "../types/icons";

export const AutoTransformerSingleWindingIcon = ({
  ring = "#BD3ABD",
  link = "#EA7474",
  ...props
}: IconBaseProps & AutoTransformerSingleWindingColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="79"
    viewBox="0 0 62 79"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_9)">
      <circle cx="31" cy="48" r="29" stroke={ring} strokeWidth="4" />
      <path
        d="M57.5 60.5L59.2615 54.9547C59.8835 52.9966 60.2 50.9543 60.2 48.8998L60.2 46.8517C60.2 44.3073 59.7145 41.7862 58.7696 39.4238L56.8104 34.5259C54.9994 29.9986 51.5969 26.2888 47.2427 24.0941L29.9836 15.395C29.4627 15.1324 28.9715 14.8147 28.5184 14.4474C26.609 12.8992 25.5 10.5722 25.5 8.11407L25.5 -0.999997"
        stroke={link}
        strokeWidth="4"
      />
    </g>
    <defs>
      <clipPath id="clip0_85_9">
        <rect width="62" height="79" fill="white" />
      </clipPath>
    </defs>
  </svg>
);