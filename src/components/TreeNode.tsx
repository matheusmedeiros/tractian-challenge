import { TreeNode as TreeNodeType } from "../types/tree";

interface TreeNodeProps {
  node: TreeNodeType;
  style: React.CSSProperties;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const getIconAndColor = (node: TreeNodeType) => {
  switch (node.type) {
    case "location":
      return { icon: "📍", className: "text-blue-600" };
    case "asset":
      return { icon: "🔧", className: "text-gray-600" };
    case "component":
      return {
        icon: node.status === "alert" ? "⚠️" : "⚡",
        className: node.status === "alert" ? "text-red-500" : "text-green-500",
      };
  }
};

export default function TreeNode({
  node,
  style,
  isCollapsed,
  onToggle,
}: TreeNodeProps) {
  const { icon, className } = getIconAndColor(node);
  const hasChildren = node.children?.length > 0;

  return (
    <div style={style}>
      <div
        style={{ paddingLeft: `${node.level * 20}px` }}
        className="flex items-center gap-2 py-2 hover:bg-gray-50 rounded transition-colors"
      >
        {hasChildren ? (
          <button
            onClick={onToggle}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded"
            aria-label={isCollapsed ? "Expandir" : "Recolher"}
          >
            <span className="text-gray-600 text-sm">
              {isCollapsed ? "▶" : "▼"}
            </span>
          </button>
        ) : (
          <div className="w-6" />
        )}

        <span className="w-6 flex justify-center">{icon}</span>
        <span className={`font-medium ${className}`}>{node.name}</span>

        {node.type === "component" && (
          <span
            className={`text-sm px-2 py-0.5 rounded-full ${
              node.status === "alert" ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {node.sensorType}
          </span>
        )}
      </div>
    </div>
  );
}
