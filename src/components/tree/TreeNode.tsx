import { TreeNode as TreeNodeType } from "../../types/tree";

// IMAGES
import locationIcon from "../../assets/location-icon.svg";
import assetIcon from "../../assets/assets-icon.svg";
import componentIcon from "../../assets/components-icon.png";
import boltIcon from "../../assets/bolt-icon.svg";
import ellipseIcon from "../../assets/ellipse-alert-icon.svg";
import ellipsePositiveIcon from "../../assets/ellipse-positive-icon.svg";

// TYPES
import { ComponentNode } from "../../types/tree";

interface TreeNodeProps {
  node: TreeNodeType;
  style: React.CSSProperties;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const getIconAndColor = (node: TreeNodeType) => {
  switch (node.type) {
    case "location":
      return {
        icon: <img src={locationIcon} alt="Location" className="w-22 h-22" />,
      };
    case "asset":
      return {
        icon: <img src={assetIcon} alt="Asset" className="w-22 h-22" />,
      };
    case "component":
      return {
        icon: (
          <img
            src={componentIcon}
            alt="Component"
            className={`w-22 h-22 ${
              node.status === "alert" ? "text-red-500" : "text-green-500"
            }`}
          />
        ),
      };
  }
};

const getStatusIcon = (node: ComponentNode) => {
  if (node.status === "alert") {
    return <img src={ellipseIcon} alt="Alert" />;
  }

  if (node.sensorType === "energy") {
    return <img src={boltIcon} alt="Energy" />;
  }

  return <img src={ellipsePositiveIcon} alt="Operating" />;
};

export default function TreeNode({
  node,
  style,
  isCollapsed,
  onToggle,
}: TreeNodeProps) {
  const { icon } = getIconAndColor(node);
  const hasChildren = node.children?.length > 0;

  return (
    <div onClick={onToggle} style={style}>
      <div
        style={{ paddingLeft: `${node.level * 20}px` }}
        className="flex items-center gap-2 py-2 hover:bg-gray-50 rounded transition-colors"
      >
        {hasChildren ? (
          <button
            className="w-6 h-6 flex items-center justify-center rounded"
            aria-label={isCollapsed ? "Expandir" : "Recolher"}
          >
            <span
              className={`chevron ${
                isCollapsed ? "chevron-right" : "chevron-down"
              }`}
            />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <span className="w-6 flex justify-center">{icon}</span>
        <span className="font-roboto font-normal">{node.name}</span>

        {node.type === "component" && (
          <span className="ml-1">{getStatusIcon(node as ComponentNode)}</span>
        )}
      </div>
    </div>
  );
}
