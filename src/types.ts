export type ConstituentData = {
    id?: string
    email: string,
    name: string,
    address: string
};

export type SearchFilterParams = {
    startDate?: Date,
    endDate?: Date,
    sort?: string
};