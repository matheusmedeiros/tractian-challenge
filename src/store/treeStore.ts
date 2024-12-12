// src/store/treeStore.ts
import { create } from 'zustand';

interface TreeState {
  collapsedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  resetCollapsed: () => void;
}

export const useTreeStore = create<TreeState>((set) => ({
  collapsedNodes: new Set(),
  toggleNode: (nodeId) => set((state) => {
    const newCollapsed = new Set(state.collapsedNodes);
    if (newCollapsed.has(nodeId)) {
      newCollapsed.delete(nodeId);
    } else {
      newCollapsed.add(nodeId);
    }
    return { collapsedNodes: newCollapsed };
  }),
  resetCollapsed: () => set({ collapsedNodes: new Set() })
}));
