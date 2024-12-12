import { useEffect } from "react";

// hooks
import { useCompanies } from "../../hooks/useCompanyData";

// STORE
import { useCompanyStore } from "../../store/companyStore";

// IMAGES
import logoTractian from "../../assets/logo-tractian.svg";

export default function Header() {
  const { selectedCompany, setSelectedCompany } = useCompanyStore();

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    error: companiesError,
  } = useCompanies();

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = e.target.value;
    const company = companies?.find((c) => c.id === companyId) || null;
    setSelectedCompany(company);
  };

  useEffect(() => {
    if (companies?.length && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selectedCompany, setSelectedCompany]);

  const renderSelect = (() => {
    if (isLoadingCompanies) {
      return (
        <div
          className="w-48 h-[38px] border border-[#00296B]/20
            bg-gradient-to-r from-[#00296B]/5 to-[#00296B]/10
            animate-pulse"
        />
      );
    }

    if (companiesError) {
      return (
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 
            bg-red-500/10 text-red-400 text-sm font-medium 
            py-2 px-4 border border-red-500/20
            hover:bg-red-500/20 transition-colors"
        >
          ↻ Tentar novamente
        </button>
      );
    }

    return (
      <select
        value={selectedCompany?.id || ""}
        onChange={handleCompanyChange}
        className="bg-[#00296B] text-white text-sm font-medium py-2 px-4 
          border border-[#00296B] 
          cursor-pointer
          hover:bg-[#00296B]/90 transition-colors"
      >
        <option value="" disabled>
          Selecione uma empresa
        </option>
        {companies?.map((company) => (
          <option key={company.id} value={company.id}>
            {`${company.name} Unit`}
          </option>
        ))}
      </select>
    );
  })();

  return (
    <header className="bg-header h-14 px-4 flex items-center justify-between">
      <img
        src={logoTractian}
        alt="Tractian logo"
        className="h-3 sm:h-5 aspect-auto"
      />
      {renderSelect}
    </header>
  );
}
