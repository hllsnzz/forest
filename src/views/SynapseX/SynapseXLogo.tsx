/**
 * SynapseXLogo —— 4 折旋转对称的抽象 SVG 标志
 *
 * 原理：一个基础路径绕中心点旋转 0°/90°/180°/270°，形成四象限对称图案。
 * viewBox="-50 -50 100 100" 意味中心点在 (0,0)，范围 100x100。
 */
export default function SynapseXLogo({ size = 20, className = "" }: { size?: number; className?: string }) {
  // 基础路径：一个不规则的闭合曲线
  const basePath = "M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      className={className}
      fill="currentColor"
    >
      {/* 四象限各旋转一次 */}
      <path d={basePath} />
      <path d={basePath} transform="rotate(90)" />
      <path d={basePath} transform="rotate(180)" />
      <path d={basePath} transform="rotate(270)" />
    </svg>
  );
}