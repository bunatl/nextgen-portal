import { rolesTypes } from './roles'

export interface ISidebar {
    userRole: rolesTypes;
}

export interface IAllUsers {
    name: string;
    username: string
}

export interface IFormSection {
    dataLoading: boolean;
}