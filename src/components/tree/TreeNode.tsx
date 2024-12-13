import { twMerge } from "tailwind-merge";

import ellipseIcon from "../../assets/ellipse-alert-icon.svg";
import boltIcon from "../../assets/bolt-icon.svg";
import ellipsePositiveIcon from "../../assets/ellipse-positive-icon.svg";

import NodeIcon from "./NodeIcon";
import LoadingState from "./states/Loading";
import ErrorState from "./states/Error";
import EmptyState from "./states/Empty";

import { ComponentNode } from "../../types/tree";
import { TreeNode as TreeNodeType } from "../../types/tree";

interface TreeNodeProps {
  node: TreeNodeType;
  className?: string;
  style: React.CSSProperties;
  isCollapsed?: boolean;
  onToggle?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  isLoading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
}

const getNodeClasses = (isInteractive: boolean, isSelected = false) => {
  return twMerge(
    "flex items-center gap-2 py-2 rounded w-full",
    isInteractive ? "cursor-pointer" : "cursor-default",
    isSelected
      ? "bg-primary-active text-white"
      : isInteractive && "hover:bg-gray-50"
  );
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

const getNodeIconClasses = (node: TreeNodeType, isSelected: boolean) => {
  return twMerge(
    "w-4 h-4",
    isSelected && node.type === "component" && "brightness-0 invert"
  );
};

export default function TreeNode({
  node,
  style,
  isCollapsed = false,
  onToggle,
  isSelected = false,
  onSelect,
  isLoading,
  error,
  isEmpty,
}: TreeNodeProps) {
  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Erro ao carregar dados"
        }
      />
    );
  if (isEmpty) return <EmptyState />;

  const hasChildren = node.children?.length > 0;
  const isInteractive = hasChildren || node.type === "component";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInteractive) return;

    if (node.type === "component" && onSelect) {
      onSelect();
    }
    if (hasChildren && onToggle) {
      onToggle();
    }
  };

  return (
    <div style={style} className="w-full">
      <div style={{ paddingLeft: `${node.level * 20}px` }} className="w-full">
        {isInteractive ? (
          <button
            className={getNodeClasses(isInteractive, isSelected)}
            onClick={handleClick}
            aria-label={`${node.name} ${
              hasChildren ? (isCollapsed ? "Expandir" : "Recolher") : ""
            }`}
          >
            {hasChildren ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle?.();
                }}
                className={twMerge(
                  "w-6 h-6",
                  "flex items-center justify-center",
                  "rounded"
                )}
              >
                <span
                  className={twMerge(
                    "chevron",
                    isCollapsed ? "chevron-right" : "chevron-down"
                  )}
                />
              </span>
            ) : (
              <div className="w-6" />
            )}

            <NodeIcon
              node={node}
              className={getNodeIconClasses(node, isSelected)}
            />

            <span className="text-sm truncate">{node.name}</span>

            {node.type === "component" && (
              <div className="mr-2">{getStatusIcon(node)}</div>
            )}
          </button>
        ) : (
          <div className={getNodeClasses(isInteractive, isSelected)}>
            <div className="w-6" />
            <NodeIcon
              node={node}
              className={getNodeIconClasses(node, isSelected)}
            />
            <span className="text-sm truncate">{node.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
