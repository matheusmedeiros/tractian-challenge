// STORE
import { useFilterStore } from "../../store/filterStore";
import { useCompanyStore } from "../../store/companyStore";

// COMPONENTS
import TreeView from "../tree/TreeView";

// IMAGES
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
          <button
            onClick={() => setShowEnergySensors(!filters.showEnergySensors)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-sm
              ${
                filters.showEnergySensors
                  ? "bg-primary-active text-white border-primary-active"
                  : "text-heading border-outline hover:bg-outline/10"
              }`}
          >
            <img
              src={boltOutlineIcon}
              alt=""
              className={`w-4 h-4 ${
                filters.showEnergySensors ? "brightness-0 invert" : ""
              }`}
            />
            <span className="font-semibold">Sensor de Energia</span>
          </button>

          <button
            onClick={() => setShowCriticalStatus(!filters.showCriticalStatus)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-sm
              ${
                filters.showCriticalStatus
                  ? "bg-primary-active text-white border-primary-active"
                  : "text-heading border-outline hover:bg-outline/10"
              }`}
          >
            <img
              src={exclamationIcon}
              alt=""
              className={`w-4 h-4 ${
                filters.showCriticalStatus ? "brightness-0 invert" : ""
              }`}
            />
            <span className="font-semibold">Crítico</span>
          </button>
        </div>
      </div>

      <div className="mt-3 grid lg:grid-cols-[30fr_70fr] gap-4 lg:gap-2 grow">
        <TreeView />
        <div className="flex flex-col min-w-0 border border-border rounded"></div>
      </div>
    </div>
  );
}
