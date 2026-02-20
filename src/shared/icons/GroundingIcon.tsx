import type { IconBaseProps } from "../types/icons";

export type GroundingColors = {
  fill?: string;
};

export const GroundingIcon = ({
  fill = "#EA7474",
  ...props
}: IconBaseProps & GroundingColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57"
    height="42"
    viewBox="0 0 57 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_grounding)">
      <rect
        width="4"
        height="35"
        transform="matrix(0 -1 -1 0 35 23)"
        fill={fill}
      />
      <path d="M35 42V0H39V42H35Z" fill={fill} />
      <path d="M44 38V5H48V38H44Z" fill={fill} />
      <path d="M53 31V12H57V31H53Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_grounding">
        <rect width="57" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);