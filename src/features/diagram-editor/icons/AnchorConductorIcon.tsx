import type { IconBaseProps } from "../types/icons";

type AnchorConductorIconProps = IconBaseProps & {
  strokeColor?: string;
  lineColor?: string;
};

export const AnchorConductorIcon = ({
  strokeColor = "#000000",
  lineColor = "#000000",
  ...props
}: AnchorConductorIconProps) => {
  const clipId = "anchor_conductor_clip";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="79"
      height="79"
      viewBox="0 0 79 79"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        {/* Triangle */}
        <path
          d="M75.667 76.75H3.33301L39.5 4.46973L75.667 76.75Z"
          stroke={strokeColor}
          strokeWidth="4"
        />

        {/* Left horizontal conductor */}
        <rect
          x="0"
          y="40"
          width="20"
          height="4"
          fill={lineColor}
        />

        {/* Right horizontal conductor */}
        <rect
          x="59"
          y="40"
          width="20"
          height="4"
          fill={lineColor}
        />
      </g>

      <defs>
        <clipPath id={clipId}>
          <rect width="79" height="79" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};