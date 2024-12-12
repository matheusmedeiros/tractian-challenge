import { create } from 'zustand';
import { Company } from '../types/api';

interface FilterState {
  searchTerm: string;
  showEnergySensors: boolean;
  showCriticalStatus: boolean;
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
  searchTerm: '',
  showEnergySensors: false,
  showCriticalStatus: false,
  selectedCompany: null,
  collapsedNodes: new Set(),
  hasFilter: false,
  setSearchTerm: (term) => set((state) => {
    const hasFilter = !!(term || state.showEnergySensors || state.showCriticalStatus);
    
    return {
      searchTerm: term,
      hasFilter,
      collapsedNodes: hasFilter ? new Set() : state.collapsedNodes
    };
  }),
  setShowEnergySensors: (show) => set((state) => {
    const hasFilter = !!(state.searchTerm || show || state.showCriticalStatus);
    
    return {
      showEnergySensors: show,
      hasFilter,
      collapsedNodes: hasFilter ? new Set() : state.collapsedNodes
    };
  }),
  setShowCriticalStatus: (show) => set((state) => {
    const hasFilter = !!(state.searchTerm || state.showEnergySensors || show);
    
    return {
      showCriticalStatus: show,
      hasFilter,
      collapsedNodes: hasFilter ? new Set() : state.collapsedNodes
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
