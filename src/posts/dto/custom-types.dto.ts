import { FindOperator } from 'typeorm';

export type CategoryType =
    | 'pets'
    | 'cars'
    | 'electronics'
    | 'realty'
    | 'clothing'
    | 'other';

export type CustomQueryType = {
    relations: { user: true };
    where?: Where;
};

export type Where = {
    price?: FindOperator<number>;
    name?: FindOperator<string>;
    description?: FindOperator<string>;
    address?: FindOperator<string>;
    condition?: string;
};
