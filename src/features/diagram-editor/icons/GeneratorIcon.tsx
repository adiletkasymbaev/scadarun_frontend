import type { IconBaseProps } from "../types/icons";

export type GeneratorColors = {
  stroke?: string;
};

export const GeneratorIcon = ({
  stroke = "#EA7474",
  ...props
}: IconBaseProps & GeneratorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="62"
    viewBox="0 0 62 62"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_generator)">
      <circle
        cx="31"
        cy="31"
        r="29"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M13 33.1538L22.6377 27L35.8261 35L46.5 28.5"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>

    <defs>
      <clipPath id="clip0_generator">
        <rect width="62" height="62" fill="white" />
      </clipPath>
    </defs>
  </svg>
);