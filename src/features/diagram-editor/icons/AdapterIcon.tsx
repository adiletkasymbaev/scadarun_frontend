import type { IconBaseProps } from "../types/icons";

type AdapterIconProps = IconBaseProps & {
  fillColor?: string;
};

export const AdapterIcon = ({
  fillColor = "#4242A0",
  ...props
}: AdapterIconProps) => {
  const clipId = "perehodnik_clip";

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
        <path
          d="M39.5 0L78.9042 78.75H0.0958443L39.5 0Z"
          fill={fillColor}
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
