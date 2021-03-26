import { IModalStates, ReducerActions } from '../types/reducer'

export const modalStates: IModalStates = {
    terms: false,
    auth: false,
    email: '',
}

export const reducer = (modals: IModalStates = modalStates, action: ReducerActions) => {
    switch (action.type) {
        case 'SETTERMS':
            return {
                ...modals,
                terms: action.payload
            };
        case 'SETAUTH':
            return {
                ...modals,
                auth: action.payload
            };
        case 'SETEMAIL':
            return {
                ...modals,
                email: action.payload
            };
        default:
            return modals;
    }
}