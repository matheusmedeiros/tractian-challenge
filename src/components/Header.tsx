import { useEffect } from "react";

// hooks
import { useCompanies } from "../hooks/useCompanyData";

// STORE
import { useFilterStore } from "../store/filterStore";

// IMAGES
import logoTractian from "../assets/logo-tractian.svg";

export default function Header() {
  const { selectedCompany, setSelectedCompany } = useFilterStore();

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

  return (
    <header className="bg-header h-14 px-4 flex items-center justify-between">
      <img
        src={logoTractian}
        alt="Tractian logo"
        className="h-5 aspect-auto hidden sm:block"
      />

      {isLoadingCompanies ? (
        <div className="text-white/60 text-sm">Carregando empresas...</div>
      ) : companiesError ? (
        <div className="text-red-400 text-sm">Erro ao carregar empresas</div>
      ) : (
        <select
          value={selectedCompany?.id || ""}
          onChange={handleCompanyChange}
          className="px-4 py-1.5 text-sm border bg-white/10 text-white 
              border-white/20 hover:border-white/40 transition-colors focus:outline-none 
              focus:border-white/60"
        >
          <option value="" disabled>
            Selecione uma empresa
          </option>
          {companies?.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      )}
    </header>
  );
}
