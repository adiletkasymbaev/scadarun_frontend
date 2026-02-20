import type { IconBaseProps } from "../types/icons";

export type TubularSurgeArresterColors = {
  stroke?: string;
  fill?: string;
};

export const TubularSurgeArresterIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & TubularSurgeArresterColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="78"
    viewBox="0 0 42 78"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_tubular_sur_arrester)">
      <rect
        x="2"
        y="2"
        width="38"
        height="74"
        stroke={stroke}
        strokeWidth="4"
      />

      <rect x="19" y="69" width="4" height="9" fill={fill} />
      <path d="M21 48L30.5263 69H11.4737L21 48Z" fill={fill} />

      <rect
        width="4"
        height="9"
        transform="matrix(1 0 0 -1 19 9)"
        fill={fill}
      />
      <path d="M21 30L30.5263 9H11.4737L21 30Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_tubular_sur_arrester">
        <rect width="42" height="78" fill="white" />
      </clipPath>
    </defs>
  </svg>
);