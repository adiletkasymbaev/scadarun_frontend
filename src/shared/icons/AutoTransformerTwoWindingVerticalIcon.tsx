import type { IconBaseProps, AutoTransformerTwoWindingVerticalColors } from "../types/icons";

export const AutoTransformerTwoWindingVerticalIcon = ({
  ringTop = "#BD3ABD",
  ringBottom = "#4242A0",
  link = "#EA7474",
  ...props
}: IconBaseProps & AutoTransformerTwoWindingVerticalColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="124"
    viewBox="0 0 62 124"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_85_109)">
      <circle cx="31" cy="93" r="29" stroke={ringBottom} strokeWidth="4" />
      <circle cx="31" cy="47.7654" r="29" stroke={ringTop} strokeWidth="4" />
      <path
        d="M57.5 60.2654L59.2615 54.7201C59.8835 52.762 60.2 50.7197 60.2 48.6652L60.2 46.6124C60.2 44.071 59.7157 41.5529 58.7729 39.1928L57.1799 35.2052C56.0739 32.4368 54.3632 29.9507 52.1726 27.9287L50.159 26.0699C49.3875 25.3578 48.5612 24.7075 47.6876 24.1252L44.766 22.1773C43.5968 21.3979 42.3059 20.8189 40.9462 20.4642L36.822 19.3884C33.6873 18.5707 31.5 15.7396 31.5 12.5L31.5 -0.499998"
        stroke={link}
        strokeWidth="4"
      />
    </g>
    <defs>
      <clipPath id="clip0_85_109">
        <rect width="62" height="124" fill="white" />
      </clipPath>
    </defs>
  </svg>
);