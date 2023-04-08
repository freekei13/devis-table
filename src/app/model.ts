export class MainRow {
    id: number;
    name: string;
    total: number;
    sub: SubRow[];
    rowChoice:boolean;
    isMainPress:boolean;
}

export class SubRow {
    id: number;
    name: string;
    quantity: number;
    unity: string;
    pu: number;
    total: number;
    sub: Row[];
    isSubPress:boolean;
    isRow?:boolean;
}

export class Row {
    id: number;
    name: string;
    quantity: number;
    unity: string;
    pu: number;
    total: number;
    isRowPress:boolean;
}

export class Totals {
    brutTotal:number;
    tva:number;
    tvaMontant:number;
    netTotal:any;
}

