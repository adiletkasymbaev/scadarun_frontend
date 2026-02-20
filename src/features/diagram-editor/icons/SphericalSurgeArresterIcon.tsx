import type { IconBaseProps } from "../types/icons";

export type SphericalSurgeArresterColors = {
  stroke?: string;
  fill?: string;
};

export const SphericalSurgeArresterIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & SphericalSurgeArresterColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="78"
    viewBox="0 0 20 78"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_spherical_sur_arrester)">
      <circle
        cx="10"
        cy="18"
        r="8"
        stroke={stroke}
        strokeWidth="4"
      />

      <rect
        width="4"
        height="9"
        transform="matrix(1 0 0 -1 8 9)"
        fill={fill}
      />

      <circle
        cx="10"
        cy="10"
        r="8"
        transform="matrix(1 0 0 -1 0 70)"
        stroke={stroke}
        strokeWidth="4"
      />

      <rect x="8" y="69" width="4" height="9" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_spherical_sur_arrester">
        <rect width="20" height="78" fill="white" />
      </clipPath>
    </defs>
  </svg>
);