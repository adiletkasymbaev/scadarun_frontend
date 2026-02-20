import type { IconBaseProps } from "../types/icons";

type TPIconProps = IconBaseProps & {
  strokeColor?: string;
  strokeWidth?: number;
};

export const TPIcon = ({
  strokeColor = "#4242A0",
  strokeWidth = 4,
  ...props
}: TPIconProps) => {
  const clipId = "tp_clip";

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
        <rect
          x="2"
          y="2"
          width="75"
          height="75"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        <line x1="1.76071" y1="17.4302" x2="20.7607" y2="2.43023" stroke={strokeColor} strokeWidth={strokeWidth} />
        <line x1="57.7607" y1="77.4302" x2="76.7607" y2="62.4302" stroke={strokeColor} strokeWidth={strokeWidth} />
        <line x1="33.7607" y1="81.3587" x2="81.8034" y2="43.4303" stroke={strokeColor} strokeWidth={strokeWidth} />
        <line x1="-3.23929" y1="41.3587" x2="47.158" y2="1.57134" stroke={strokeColor} strokeWidth={strokeWidth} />
        <line x1="17.7607" y1="77.3587" x2="77.5766" y2="30.1356" stroke={strokeColor} strokeWidth={strokeWidth} />
        <line x1="0.760711" y1="55.6534" x2="68.4255" y2="2.23385" stroke={strokeColor} strokeWidth={strokeWidth} />
        <line x1="0.760711" y1="73.6534" x2="77.6792" y2="12.9282" stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>

      <defs>
        <clipPath id={clipId}>
          <rect width="79" height="79" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};