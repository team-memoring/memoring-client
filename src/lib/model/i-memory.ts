// This file is temporary. It will be deleted when the actual API is connected.

export interface IMemory {
  id: number;
  title: string;
  creator: string;
  totalQuizCount: number;
  solvedQuizCount: number;
  createdAt: string;
}

export interface IEventRegister {
  date: Date;
  images: string[]; // URI or base64
  description: string;
}
export interface IMemoryRegister {
  title: string;
  roles: number[];
  events: IEventRegister[];
}
