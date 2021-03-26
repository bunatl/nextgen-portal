export type ReducerActions =
    | { type: 'SETTERMS'; payload: boolean }
    | { type: 'SETAUTH'; payload: boolean }
    | { type: 'SETEMAIL'; payload: string }

export interface IModalStates {
    terms: boolean;
    auth: boolean;
    email: string;
}