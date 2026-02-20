import type { IconBaseProps } from "../types/icons";

export type CapacitorColors = {
  fill?: string;
};

export const CapacitorIcon = ({
  fill = "#EA7474",
  ...props
}: IconBaseProps & CapacitorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="39"
    height="42"
    viewBox="0 0 39 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_capacitor)">
      <rect
        width="4"
        height="12"
        transform="matrix(0 -1 -1 0 12 23)"
        fill={fill}
      />
      <rect
        width="4"
        height="12"
        transform="matrix(0 -1 -1 0 39 23)"
        fill={fill}
      />

      <path d="M12 42V0H16V42H12Z" fill={fill} />
      <path d="M23 42V0H27V42H23Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_capacitor">
        <rect width="39" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);