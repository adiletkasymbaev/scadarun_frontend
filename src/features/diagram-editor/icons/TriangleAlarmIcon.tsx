import type { SVGProps } from "react";

type TriangleAlarmIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

export function TriangleAlarmIcon({
  size = 20,
  color = "#EA7474",
  ...props
}: TriangleAlarmIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      stroke={color}
      {...props}
    >
      <path
        d="M36.9521 3H5.04785L21 35.2363L36.9521 3Z"
        strokeWidth={4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TriangleAlarmIcon;