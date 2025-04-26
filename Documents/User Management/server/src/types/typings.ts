export interface IConfig  { 
    port: number; 
    nodeEnv: string;
}

export interface IUser { 
    id: number; 
    name: string; 
    age: number; 
    imageUrl: string; 
    position: string
}

export type IUsers = IUser[];