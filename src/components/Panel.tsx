// STORE
import { useFilterStore } from "../store/filterStore";

// COMPONENTS
import TreeView from "./TreeView";

export default function Panel() {
  const {
    selectedCompany,
    showEnergySensors,
    showCriticalStatus,
    setShowEnergySensors,
    setShowCriticalStatus,
  } = useFilterStore();

  return (
    <div className="grow bg-white m-[10px] rounded-lg border border-border p-4 flex flex-col">
      <div className="flex justify-between">
        <div className="hidden sm:flex sm:gap-2 sm:items-end">
          <span className="text-title font-bold text-2xl">Assets</span>
          {selectedCompany && (
            <span className="text-secondary text-lg line-clamp-1">
              {`/ ${selectedCompany.name} Unit`}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showEnergySensors}
              onChange={(e) => setShowEnergySensors(e.target.checked)}
            />
            <span>Sensores de Energia</span>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showCriticalStatus}
              onChange={(e) => setShowCriticalStatus(e.target.checked)}
            />
            <span>Status Crítico</span>
          </label>
        </div>
      </div>

      <div className="mt-3 flex gap-4 lg:gap-2 grow flex-col lg:flex-row">
        <TreeView />
      </div>
    </div>
  );
}
