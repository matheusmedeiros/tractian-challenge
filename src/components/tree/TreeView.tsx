import { useMemo, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { twMerge } from "tailwind-merge";

import TreeNode from "./TreeNode";

import {
  useCompanyLocations,
  useCompanyAssets,
} from "../../hooks/useCompanyData";

import searchIcon from "../../assets/search-icon.svg";

import { useFilterStore } from "../../store/filterStore";
import { useCompanyStore } from "../../store/companyStore";
import { useTreeStore } from "../../store/treeStore";

import { buildTree } from "../../utils/treeBuider";
import { processTree } from "../../utils/filterTree";

export default function TreeView() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );

  const { filters, setSearchTerm } = useFilterStore();
  const { selectedCompany } = useCompanyStore();
  const { collapsedNodes, toggleNode } = useTreeStore();

  const {
    data: locations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useCompanyLocations(selectedCompany?.id);

  const {
    data: assets,
    isLoading: isLoadingAssets,
    error: assetsError,
  } = useCompanyAssets(selectedCompany?.id);

  const error = locationsError || assetsError;
  const isLoading = isLoadingLocations || isLoadingAssets;
  const listRef = useRef<List>(null);

  const tree = useMemo(() => {
    if (!locations || !assets) return [];
    return buildTree(locations, assets);
  }, [locations, assets]);

  const processedTree = useMemo(() => {
    return processTree(
      tree,
      {
        searchTerm: filters.searchTerm,
        showEnergySensors: filters.showEnergySensors,
        showCriticalStatus: filters.showCriticalStatus,
      },
      collapsedNodes
    );
  }, [tree, filters, collapsedNodes]);

  const getItemSize = () => 42;

  if (!selectedCompany) return null;

  return (
    <div
      className={twMerge(
        "flex flex-col flex-1",
        "min-w-0",
        "border border-border rounded overflow-hidden"
      )}
      role="tree"
      aria-label="Hierarquia de ativos"
    >
      <div className={twMerge("flex items-center border-b border-border")}>
        <label className="sr-only" htmlFor="search-tree">
          Buscar Asset ou Location
        </label>
        <input
          id="search-tree"
          type="search"
          className={twMerge(
            "w-full p-3",
            "outline-none",
            "font-inter font-normal",
            "[&::-webkit-search-cancel-button]:hidden"
          )}
          placeholder="Buscar Asset ou Location"
          value={filters.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar na árvore"
        />
        {filters.searchTerm ? (
          <div className="h-full mb-4 mr-4 flex items-center justify-center text-secondary">
            <button
              onClick={() => setSearchTerm("")}
              className="p-2 hover:bg-gray-50 rounded-sm"
              aria-label="Limpar busca"
            >
              <span className="close-icon" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="h-full aspect-square flex items-center justify-center text-secondary">
            <img
              src={searchIcon}
              alt=""
              className="w-4 h-4 opacity-50"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden" role="tree">
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              itemCount={processedTree.length || 1}
              itemSize={getItemSize}
            >
              {({ index, style }) => (
                <TreeNode
                  node={processedTree[index]}
                  style={style}
                  isCollapsed={collapsedNodes.has(processedTree[index]?.id)}
                  onToggle={() => toggleNode(processedTree[index]?.id)}
                  isSelected={
                    processedTree[index]?.type === "component" &&
                    processedTree[index]?.id === selectedComponentId
                  }
                  onSelect={
                    processedTree[index]?.type === "component"
                      ? () => setSelectedComponentId(processedTree[index].id)
                      : undefined
                  }
                  isLoading={isLoading}
                  error={error}
                  isEmpty={!processedTree.length}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
