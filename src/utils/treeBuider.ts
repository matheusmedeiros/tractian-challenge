import { Asset, Location } from "../types/api";
import { TreeNode } from "../types/tree";

export function buildTree(locations: Location[], assets: Asset[]): TreeNode[] {
  const nodeMap: Record<string, TreeNode> = {};
  const result: TreeNode[] = [];

  // Map locations
  for (const location of locations) {
    nodeMap[location.id] = {
      id: location.id,
      name: location.name,
      type: 'location',
      parentId: location.parentId,
      hasChildren: false,
      children: [],
      level: 0
    };
  }

  // Map assets & components
  for (const asset of assets) {
    if (asset.sensorType) {
      nodeMap[asset.id] = {
        id: asset.id,
        name: asset.name,
        type: 'component',
        parentId: asset.parentId ?? asset.locationId ?? null,
        sensorId: asset.sensorId!,
        sensorType: asset.sensorType,
        status: asset.status!,
        gatewayId: asset.gatewayId!,
        hasChildren: false,
        children: [],
        level: 0
      };
    } else {
      nodeMap[asset.id] = {
        id: asset.id,
        name: asset.name,
        type: 'asset',
        parentId: asset.parentId ?? asset.locationId ?? null,
        hasChildren: false,
        children: [],
        level: 0
      };
    }
  }

  // Build relationships
  for (const id of Object.keys(nodeMap)) {
    const node = nodeMap[id];
    const parentId = node.parentId;

    if (parentId && nodeMap[parentId]) {
      nodeMap[parentId].children.push(node);
      nodeMap[parentId].hasChildren = true;
    } else {
      result.push(node);
    }
  }

  // Set levels
  const setLevel = (node: TreeNode, level: number) => {
    node.level = level;
    node.children.forEach(child => setLevel(child, level + 1));
  };

  result.forEach(node => setLevel(node, 0));
  return result;
}