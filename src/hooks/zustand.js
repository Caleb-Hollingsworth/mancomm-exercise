import { create } from "zustand";

const useStore = create((set) => ({
    selected: 'current.json',
    setSelected: (payload) => set(() => ({ selected: payload })),
    tempType: 'temp_f',
    setTempType: (payload) => set(() => ({ tempType: payload }))
}));

export default useStore;