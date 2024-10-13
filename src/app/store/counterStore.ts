import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand 스토어 생성
export const useCounterStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "counter-storage", // 저장소의 이름
      getStorage: () => localStorage, // 사용할 저장소 (기본값은 localStorage)
    }
  )
);
