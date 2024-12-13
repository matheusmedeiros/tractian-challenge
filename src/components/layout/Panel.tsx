import { useFilterStore } from "../../store/filterStore";
import { useCompanyStore } from "../../store/companyStore";

import TreeView from "../tree/TreeView";
import { FilterButton } from "../buttons/FilterButton";

import boltOutlineIcon from "../../assets/bolt-outline-icon.svg";
import exclamationIcon from "../../assets/exclamation-circle-icon.svg";

export default function Panel() {
  const { selectedCompany } = useCompanyStore();
  const { filters, setShowEnergySensors, setShowCriticalStatus } =
    useFilterStore();

  return (
    <div className="grow bg-white m-[10px] rounded-lg border border-outline p-4 flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row gap-2">
        <div className="hidden sm:flex gap-2 items-center">
          <span className="text-heading font-semibold text-xl">Ativos</span>
          {selectedCompany && (
            <span className="text-muted text-sm">
              {`/ ${selectedCompany.name} Unit`}
            </span>
          )}
        </div>

        <div className="flex gap-4 self-end sm:self-auto">
          <FilterButton
            icon={boltOutlineIcon}
            label="Sensor de Energia"
            isActive={filters.showEnergySensors}
            onClick={() => setShowEnergySensors(!filters.showEnergySensors)}
          />
          <FilterButton
            icon={exclamationIcon}
            label="Crítico"
            isActive={filters.showCriticalStatus}
            onClick={() => setShowCriticalStatus(!filters.showCriticalStatus)}
          />
        </div>
      </div>

      <div className="mt-3 grid lg:grid-cols-[30fr_70fr] gap-4 lg:gap-2 grow">
        <TreeView />
        <div className="flex flex-col min-w-0 border border-border rounded"></div>
      </div>
    </div>
  );
}
