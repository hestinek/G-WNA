export interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: any) => void;
}