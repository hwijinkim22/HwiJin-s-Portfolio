import { create } from "zustand";

interface SectionState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sectionRefs: {
    [ket: string]: React.RefObject<HTMLElement>;
  };
}

export const usePortfolioStore = create<SectionState>((set) => ({
	activeSection: 'about',
	setActiveSection: (section) => set({activeSection: section}),
	sectionRefs: {
		about: {current:null},
		skills: {current:null},
		archiving: {current:null},
		projects: {current:null}
	}
}));
