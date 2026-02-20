import type { IconBaseProps } from "../types/icons";

type SubstationIconProps = IconBaseProps & {
  fillColor?: string;
};

export const SubstationIcon = ({
  fillColor = "#000000",
  ...props
}: SubstationIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="79"
    height="79"
    viewBox="0 0 79 79"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_substation)">
      <circle cx="39.5" cy="39.5" r="39.5" fill={fillColor} />
    </g>
    <defs>
      <clipPath id="clip0_substation">
        <rect width="79" height="79" fill="white" />
      </clipPath>
    </defs>
  </svg>
);