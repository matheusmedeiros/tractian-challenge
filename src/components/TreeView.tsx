import { useMemo, useRef } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// Components
import TreeNode from "./TreeNode";

// Hooks
import { useCompanyLocations, useCompanyAssets } from "../hooks/useCompanyData";
import { useFilterStore } from "../store/filterStore";

// Utils
import { buildTree } from "../utils/treeBuider";
import { processTree } from "../utils/filterTree";

export default function TreeView() {
  const {
    searchTerm,
    showEnergySensors,
    showCriticalStatus,
    selectedCompany,
    setSearchTerm,
    collapsedNodes,
    toggleNode,
  } = useFilterStore();

  const { data: locations } = useCompanyLocations(selectedCompany?.id);
  const { data: assets } = useCompanyAssets(selectedCompany?.id);
  const listRef = useRef<List>(null);

  const tree = useMemo(() => {
    if (!locations || !assets) return [];
    return buildTree(locations, assets);
  }, [locations, assets]);

  const processedTree = useMemo(() => {
    return processTree(
      tree,
      {
        searchTerm,
        showEnergySensors,
        showCriticalStatus,
      },
      collapsedNodes
    );
  }, [tree, searchTerm, showEnergySensors, showCriticalStatus, collapsedNodes]);

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
    />
  );

  const isLoading = !locations || !assets;
  const error = null;

  if (!selectedCompany) return null;

  return (
    <div className="flex flex-col grow-0 basis-[350px] lg:grow-[3] lg:basis-0 min-w-0 border border-border rounded">
      <div className="flex items-center border-b border-border">
        <input
          className="w-full p-3 outline-none"
          placeholder="Buscar Asset ou Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div
            className="h-full aspect-square flex items-center justify-center cursor-pointer text-secondary"
            onClick={() => setSearchTerm("")}
          >
            ×
          </div>
        )}
      </div>

      <div className="flex-auto h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin">⚙️</div>
            <span className="ml-2">Carregando...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 p-4 bg-red-50 rounded">
            Erro ao carregar dados
          </div>
        ) : processedTree.length > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Nenhum resultado encontrado
          </div>
        )}
      </div>
    </div>
  );
}
