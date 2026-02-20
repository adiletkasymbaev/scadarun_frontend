import AlarmIcon from "./AlarmIcon";

type Props = {
  size?: number;
  iconColor?: string;
  slashColor?: string;
  strokeWidth?: number;
};

export function AlarmIconWithNoPower({
  size = 20,
  iconColor = "#fbff00",
  slashColor = "rgba(255,0,0,0.9)",
  strokeWidth = 6,
}: Props) {
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <AlarmIcon size={size} color={iconColor} />

      {/* красная черта */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        pointerEvents="none"
      >
        <line
          x1="5"
          y1="90"
          x2="85"
          y2="5"
          stroke={slashColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}