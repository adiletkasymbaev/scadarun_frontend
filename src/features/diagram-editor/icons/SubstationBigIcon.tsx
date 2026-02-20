import type { IconBaseProps } from "../types/icons";

type SubstationBigIconProps = IconBaseProps & {
  gradientTop?: string;
  gradientBottom?: string;
  strokeColor?: string;
  shapeColor?: string;
};

export const SubstationBigIcon = ({
  gradientTop = "#000000",
  gradientBottom = "#FF0000",
  strokeColor = "#000000",
  shapeColor = "#000000",
  ...props
}: SubstationBigIconProps) => {
  const gradientId = "substation_big_gradient";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 204 204"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_substation_big)">
        <circle
          cx="102"
          cy="102"
          r="97.5"
          transform="matrix(0 1 1 0 0 -0.00012207)"
          fill={`url(#${gradientId})`}
          stroke={strokeColor}
          strokeWidth="9"
        />

        <path
          d="M93.3113 101.247L189.055 121.082L102.069 198.631L93.3113 101.247Z"
          fill={shapeColor}
        />

        <ellipse
          cx="118.5"
          cy="170.5"
          rx="41.5"
          ry="27.5"
          fill={shapeColor}
        />

        <ellipse
          cx="151.778"
          cy="149.527"
          rx="41.5"
          ry="27.5"
          transform="rotate(-32.6004 151.778 149.527)"
          fill={shapeColor}
        />

        <rect
          x="163.841"
          y="116"
          width="35"
          height="20"
          transform="rotate(11.0732 163.841 116)"
          fill={shapeColor}
        />
      </g>

      <defs>
        <linearGradient
          id={gradientId}
          x1="102"
          y1="0"
          x2="102"
          y2="204"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.5" stopColor={gradientTop} />
          <stop offset="0.5001" stopColor={gradientBottom} />
        </linearGradient>

        <clipPath id="clip0_substation_big">
          <rect width="204" height="204" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};