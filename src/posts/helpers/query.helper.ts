import { Between, LessThan, Like, MoreThan } from 'typeorm';
import { CustomQueryType } from '../dto/custom-types.dto';
import { QueryFilterDto } from '../dto/post-query.dto';

export class QueryHelper {
    static queryBuilder(query: QueryFilterDto) {
        const resultQuery: CustomQueryType = {
            relations: { user: true },
            where: {},
        };
        if (query.minPrice && query.maxPrice) {
            resultQuery.where = Object.assign(resultQuery.where, {
                price: Between(query.minPrice, query.maxPrice),
            });
        }
        if (query.minPrice && !query.maxPrice) {
            resultQuery.where = Object.assign(resultQuery.where, {
                price: MoreThan(query.minPrice),
            });
        }
        if (query.maxPrice && !query.minPrice) {
            resultQuery.where = Object.assign(resultQuery.where, {
                price: LessThan(query.maxPrice),
            });
        }

        if (query.name) {
            resultQuery.where = Object.assign(resultQuery.where, {
                name: Like(`%${query.name}%`),
            });
        }

        if (query.description) {
            resultQuery.where = Object.assign(resultQuery.where, {
                description: Like(`%${query.description}%`),
            });
        }

        if (query.address) {
            resultQuery.where = Object.assign(resultQuery.where, {
                address: Like(`%${query.address}%`),
            });
        }

        if (query.condition) {
            resultQuery.where = Object.assign(resultQuery.where, {
                condition: query.condition,
            });
        }

        if(query.category) {
            resultQuery.where = Object.assign(resultQuery.where, {
                category: query.category,
            });
        }
        return resultQuery;
    }
}
