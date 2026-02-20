import type { IconBaseProps } from "../types/icons";

export type RvpColors = {
  stroke?: string;
  fill?: string;
};

export const RvpIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & RvpColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="143"
    viewBox="0 0 42 143"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_rvp)">
      <rect x="2" y="10" width="38" height="74" stroke={stroke} strokeWidth="4" />

      <rect width="4" height="35" transform="matrix(1 0 0 -1 19 35)" fill={fill} />
      <path d="M21 57.6666L30.5263 33.1666H11.4737L21 57.6666Z" fill={fill} />

      <rect y="57" width="42" height="4" fill={fill} />
      <rect y="69" width="42" height="4" fill={fill} />

      <rect width="4" height="35" transform="matrix(1 0 0 -1 19 121)" fill={fill} />

      <path d="M0 121H42V125H0V121Z" fill={fill} />
      <path d="M4 130H37V134H4V130Z" fill={fill} />
      <path d="M11 139H30V143H11V139Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_rvp">
        <rect width="42" height="143" fill="white" />
      </clipPath>
    </defs>
  </svg>
);