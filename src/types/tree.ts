export interface BaseNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  parentId: string | null;
  hasChildren: boolean;
  children: TreeNode[];
  level: number;
}

interface LocationNode extends BaseNode {
  type: 'location'
}

interface AssetNode extends BaseNode {
  type: 'asset'
}

interface ComponentNode extends BaseNode {
  type: 'component'
  sensorId: string
  sensorType: 'vibration' | 'energy'
  status: 'operating' | 'alert'
  gatewayId: string
}

export type TreeNode = LocationNode | AssetNode | ComponentNode
