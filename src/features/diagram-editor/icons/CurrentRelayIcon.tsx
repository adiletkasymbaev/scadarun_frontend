import type { IconBaseProps } from "../types/icons";

export type CurrentRelayColors = {
  stroke?: string;
  fill?: string;
};

export const CurrentRelayIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & CurrentRelayColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="163"
    viewBox="0 0 42 163"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_current_relay)">
      <rect
        x="2"
        y="87"
        width="38"
        height="74"
        stroke={stroke}
        strokeWidth="4"
      />

      <rect x="19" y="154" width="4" height="9" fill={fill} />
      <path d="M21 133L30.5263 154H11.4737L21 133Z" fill={fill} />

      <rect
        width="4"
        height="9"
        transform="matrix(1 0 0 -1 19 94)"
        fill={fill}
      />
      <path d="M21 115L30.5263 94H11.4737L21 115Z" fill={fill} />

      <rect x="19" y="74.5" width="4" height="10.5" fill={fill} />
      <path d="M21 50L30.5263 74.5H11.4737L21 50Z" fill={fill} />

      <rect
        width="4"
        height="10.5"
        transform="matrix(1 0 0 -1 19 10.5)"
        fill={fill}
      />
      <path d="M21 35L30.5263 10.5H11.4737L21 35Z" fill={fill} />
    </g>

    <defs>
      <clipPath id="clip0_current_relay">
        <rect width="42" height="163" fill="white" />
      </clipPath>
    </defs>
  </svg>
);