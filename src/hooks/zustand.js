import { create } from "zustand";

const useStore = create((set) => ({
    selected: 'current.json',
    setSelected: (payload) => set(() => ({ selected: payload }))
}));

export default useStore;