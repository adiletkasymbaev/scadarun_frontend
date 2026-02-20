import type { IconBaseProps } from "../types/icons";

export type OffDisconnectorWithGroundingColors = {
  fill?: string;
};

export const OffDisconnectorWithGroundingIcon = ({
  fill = "#EA7474",
  ...props
}: IconBaseProps & OffDisconnectorWithGroundingColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="84"
    height="62"
    viewBox="0 0 84 62"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_off_disconnector_with_grounding)">
      <rect y="58" width="42" height="4" fill={fill} />

      <path d="M42 33H69V37H42V33Z" fill={fill} />
      <path d="M49 44H84V48H49V44Z" fill={fill} />
      <path d="M54 51H79V55H54V51Z" fill={fill} />
      <path d="M60 58H73V62H60V58Z" fill={fill} />
      <rect
        x="65"
        y="45"
        width="10"
        height="4"
        transform="rotate(-90 65 45)"
        fill={fill}
      />

      <rect width="42" height="4" fill={fill} />
      <rect
        x="18"
        y="50.1499"
        width="42"
        height="4"
        transform="rotate(-60.7641 18 50.1499)"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_off_disconnector_with_grounding">
        <rect width="84" height="62" fill="white" />
      </clipPath>
    </defs>
  </svg>
);