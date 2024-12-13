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
  isSelected?: boolean;
  onSelect?: () => void;
}

const getNodeIcon = (node: TreeNodeType, isSelected?: boolean) => {
  const icons = {
    location: locationIcon,
    asset: assetIcon,
    component: componentIcon,
  };

  const iconClass = `w-22 h-22 ${
    node.type === "component" &&
    (isSelected
      ? "filter brightness-0 invert"
      : node.status === "alert"
      ? "text-red-500"
      : "text-green-500")
  }`;

  return (
    <img
      src={icons[node.type]}
      alt={node.type.charAt(0).toUpperCase() + node.type.slice(1)}
      className={iconClass}
    />
  );
};

const getNodeClasses = (
  isInteractive: boolean,
  isSelected: boolean,
  isComponent: boolean
) => {
  const baseClasses = "flex items-center gap-2 py-2 rounded";
  const cursorClass = isInteractive ? "cursor-pointer" : "cursor-default";
  let stateClass = "";

  if (isSelected && isComponent) {
    stateClass = "bg-primary-active text-white";
  } else if (isInteractive) {
    stateClass = "hover:bg-gray-50";
  }

  return `${baseClasses} ${cursorClass} ${stateClass}`;
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
  isSelected = false,
  onSelect,
}: TreeNodeProps) {
  const hasChildren = node.children?.length > 0;
  const isComponent = node.type === "component";
  const isInteractive = hasChildren || isComponent;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInteractive) return;

    if (isComponent && onSelect) {
      onSelect();
    }
    if (hasChildren && onToggle) {
      onToggle();
    }
  };

  return (
    <div onClick={handleClick} style={style}>
      <div
        style={{ marginLeft: `${node.level * 20}px` }}
        className={getNodeClasses(isInteractive, isSelected, isComponent)}
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

        <span className="w-6 flex justify-center">
          {getNodeIcon(node, isSelected)}
        </span>
        <span className="font-roboto font-normal">{node.name}</span>

        {isComponent && (
          <span className="ml-1">{getStatusIcon(node as ComponentNode)}</span>
        )}
      </div>
    </div>
  );
}
