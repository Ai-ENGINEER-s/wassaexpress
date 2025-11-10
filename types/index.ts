// types/index.ts
// =========================================================================
// TYPES
// =========================================================================
type GenericSearchResult =
  | {
      page: 'formation';
      type: 'theme';
      title: string;
      detail: string;
      theme: Theme;
      icon: 'layout';
    }
  | {
      page: 'formation';
      type: 'module';
      title: string;
      detail: string;
      theme: Theme;
      module: Module;
      icon: 'book';
    }
  | {
      page: 'etude';
      type: 'module';
      title: string;
      detail: string;
      theme: ThemeForOtherPages;
      module: ModuleForOtherPages;
      icon: 'file';
    }
  | {
      page: 'conseil';
      type: 'module';
      title: string;
      detail: string;
      theme: ThemeForOtherPages;
      module: ModuleForOtherPages;
      icon: 'briefcase';
    }
  | {
      page: 'financement';
      type: 'module';
      title: string;
      detail: string;
      theme: ThemeForOtherPages;
      module: ModuleForOtherPages;
      icon: 'zap';
    };
interface Session {
  date: string;
  location: 'Session 1' | 'Session 2' | 'Session 3' | 'Session 4' | 'Session 5';
}

interface Module {
  code: string;
  title: string;
  themeDetail: string;
  sessions: Session[];
  image?: string; // ✅ <-- Ajout ici
}


interface SearchOverlayProps {
  isOpen: boolean;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: GenericSearchResult[];
  onSelect: (result: GenericSearchResult) => void;
  onClose: () => void;
  isLoading: boolean;
}


interface ModuleForOtherPages {
  code: string;
  title: string;
  themeDetail: string;

  image?: string; // ✅ <-- Ajout ici
}
interface Theme {
  slug: string;
  title: string;
  modules: Module[];
  image?: string;
}

interface ThemeForOtherPages {
 slug: string;
  title: string;
  modules: ModuleForOtherPages[];
  image?: string;
}
// TYPES
// =========================================================================
interface Session {
    date: string;
}


 interface SearchResult {
  type: 'theme' | 'module';
  title: string;
  detail: string;
  targetTheme: Theme | ThemeForOtherPages;
  moduleCode?: string;
  pageType?: 'formation' | 'etude' | 'conseil' | 'financement'; // NOUVEAU
}

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedTheme: (theme: Theme) => void;
  setSelectedModule: (module: Module) => void;
  setSelectedEtudeTheme: (theme: ThemeForOtherPages) => void;
  setSelectedEtudeModule: (module: ModuleForOtherPages) => void;
  setSelectedConseilTheme: (theme: ThemeForOtherPages) => void;
  setSelectedConseilModule: (module: ModuleForOtherPages) => void;
  setSelectedFinancementTheme: (theme: ThemeForOtherPages) => void;
  setSelectedFinancementModule: (module: ModuleForOtherPages) => void;
}

export type { Session, Module, Theme , SearchResult, ModuleForOtherPages, ThemeForOtherPages , GenericSearchResult, SearchOverlayProps , NavbarProps };
