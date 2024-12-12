import { TreeNode } from "../types/tree";

interface FilterOptions {
  searchTerm: string;
  showEnergySensors: boolean;
  showCriticalStatus: boolean;
}

export const processTree = (
  nodes: TreeNode[], 
  filters: FilterOptions,
  collapsedNodes: Set<string>
): TreeNode[] => {
  // Apply filters
  const filtered = filterNodes(nodes, filters);
  
  // Then flatten the tree to virtualize rendering
  const flatten = (nodes: TreeNode[], level = 0): TreeNode[] => {
    return nodes.reduce((acc: TreeNode[], node) => {
      acc.push({ ...node, level });
      
      // If has children AND is not collapsed, add children
      if (node.children?.length && !collapsedNodes.has(node.id)) {
        acc.push(...flatten(node.children, level + 1));
      }
      return acc;
    }, []);
  };

  return flatten(filtered);
};

function filterNodes(nodes: TreeNode[], filters: FilterOptions): TreeNode[] {
  return nodes
    .map(node => {
      const matchesSearch = node.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      const matchesEnergy =
        !filters.showEnergySensors ||
        ("sensorType" in node && node.sensorType === "energy");

      const matchesCritical =
        !filters.showCriticalStatus || 
        ("status" in node && node.status === "alert");

      // If matches filters, keep structure
      if (matchesSearch && matchesEnergy && matchesCritical) {
        return { ...node, children: node.children || [] };
      }

      // If has children, filter recursively
      if (node.children?.length) {
        const filteredChildren = filterNodes(node.children, filters);
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
      }

      return null;
    })
    .filter(Boolean) as TreeNode[];
}