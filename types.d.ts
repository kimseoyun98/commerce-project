// types.d.ts
declare global {
  interface RequestInit {
    next?: {
      revalidate?: number;
    };
  }
}

export {};
