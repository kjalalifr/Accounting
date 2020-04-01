
export interface AccountGroup {
    id: number;
    code: string;
    name: string;
    type: string;
    description?: string;
    createdAt: Date;
    createdBy: number;
    modifyDate: Date;
    modifiedBy: Date;
}
