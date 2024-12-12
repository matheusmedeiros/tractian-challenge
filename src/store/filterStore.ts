import { create } from 'zustand';
import { Company } from '../types/api';

import { useTreeStore } from './treeStore';

interface FilterState {
  filters: {
    searchTerm: string;
    showEnergySensors: boolean;
    showCriticalStatus: boolean;
  };
  selectedCompany: Company | null;
  collapsedNodes: Set<string>;
  hasFilter: boolean;
  setSearchTerm: (term: string) => void;
  setShowEnergySensors: (show: boolean) => void;
  setShowCriticalStatus: (show: boolean) => void;
  setSelectedCompany: (company: Company | null) => void;
  toggleNode: (nodeId: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    searchTerm: '',
    showEnergySensors: false,
    showCriticalStatus: false,
  },
  selectedCompany: null,
  collapsedNodes: new Set(),
  hasFilter: false,
  setSearchTerm: (term) => set((state) => {
    const hasFilter = !!(term || state.filters.showEnergySensors || state.filters.showCriticalStatus);
    
    if (hasFilter) {
      useTreeStore.getState().resetCollapsed();
    }
    
    return {
      filters: { ...state.filters, searchTerm: term }
    };
  }),
  setShowEnergySensors: (show) => set((state) => {
    const hasFilter = !!(state.filters.searchTerm || show || state.filters.showCriticalStatus);
    
    if (hasFilter) {
      useTreeStore.getState().resetCollapsed();
    }

    return {
      filters: { ...state.filters, showEnergySensors: show }
    };
  }),
  setShowCriticalStatus: (show) => set((state) => {
    const hasFilter = !!(state.filters.searchTerm || state.filters.showEnergySensors || show);
    
    if (hasFilter) {
      useTreeStore.getState().resetCollapsed();
    }

    return {
      filters: { ...state.filters, showCriticalStatus: show }
    };
  }),
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  toggleNode: (nodeId) => set((state) => {
    const newCollapsed = new Set(state.collapsedNodes);
    
    if (newCollapsed.has(nodeId)) {
      newCollapsed.delete(nodeId);
    } else {
      newCollapsed.add(nodeId);
    }

    return { collapsedNodes: newCollapsed };
  })
}));
