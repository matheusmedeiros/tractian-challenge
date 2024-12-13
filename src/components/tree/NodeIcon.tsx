import { TreeNode } from "../../types/tree";

import locationIcon from "../../assets/location-icon.svg";
import assetIcon from "../../assets/assets-icon.svg";
import componentIcon from "../../assets/components-icon.png";

interface NodeIconProps {
  node: TreeNode;
  className?: string;
}

export default function NodeIcon({ node, className = "" }: NodeIconProps) {
  const getNodeIcon = () => {
    switch (node.type) {
      case "location":
        return locationIcon;
      case "asset":
        return assetIcon;
      case "component":
        return componentIcon;
      default:
        return null;
    }
  };

  const icon = getNodeIcon();
  if (!icon) return null;

  return <img src={icon} alt="" className={className} />;
}
