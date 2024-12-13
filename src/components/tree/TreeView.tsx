import { useMemo, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// Components
import EmptyState from "../commons/EmptyState";
import ErrorState from "../commons/Error";
import LoadingState from "../commons/Loading";
import TreeNode from "./TreeNode";

// HOOKS
import {
  useCompanyLocations,
  useCompanyAssets,
} from "../../hooks/useCompanyData";

// IMAGES
import searchIcon from "../../assets/search-icon.svg";

// STORE
import { useFilterStore } from "../../store/filterStore";
import { useCompanyStore } from "../../store/companyStore";
import { useTreeStore } from "../../store/treeStore";

// Utils
import { buildTree } from "../../utils/treeBuider";
import { processTree } from "../../utils/filterTree";

export default function TreeView() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null
  );

  const { filters, setSearchTerm } = useFilterStore();
  const { selectedCompany } = useCompanyStore();
  const { collapsedNodes, toggleNode } = useTreeStore();

  // Queries
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

  // Vars
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

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <TreeNode
      node={processedTree[index]}
      style={style}
      isCollapsed={collapsedNodes.has(processedTree[index].id)}
      onToggle={() => toggleNode(processedTree[index].id)}
      isSelected={
        processedTree[index].type === "component" &&
        processedTree[index].id === selectedComponentId
      }
      onSelect={
        processedTree[index].type === "component"
          ? () => setSelectedComponentId(processedTree[index].id)
          : undefined
      }
    />
  );

  if (!selectedCompany) return null;

  const renderContent = (() => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return (
        <ErrorState
          message={
            error instanceof Error ? error.message : "Erro ao carregar dados"
          }
        />
      );
    }

    if (!processedTree.length) {
      return <EmptyState />;
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={processedTree.length}
            itemSize={getItemSize}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    );
  })();

  return (
    <div className="flex flex-col grow-0 basis-[350px] lg:grow-[3] lg:basis-0 min-w-0 border border-border rounded">
      <div className="flex items-center border-b border-border">
        <input
          className="w-full p-3 outline-none font-inter font-normal"
          placeholder="Buscar Asset ou Location"
          value={filters.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="h-full aspect-square flex items-center justify-center text-secondary">
          {filters.searchTerm ? (
            <div
              className="close-icon cursor-pointer"
              onClick={() => setSearchTerm("")}
            />
          ) : (
            <img src={searchIcon} alt="Search" className="w-4 h-4 opacity-50" />
          )}
        </div>
      </div>

      <div className="flex-auto h-[600px]">{renderContent}</div>
    </div>
  );
}
