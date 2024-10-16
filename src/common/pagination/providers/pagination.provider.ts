import { Inject, Injectable } from '@nestjs/common';
import { DataSource, ObjectLiteral } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';
import { Request } from 'express';

@Injectable()
export class PaginationProvider {
    constructor(@Inject(REQUEST) private readonly request: Request){}
    public async paginationQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>
    ): Promise<Paginated<T>>{
        let results = await repository.find({
            skip: (paginationQuery.page - 1) * paginationQuery.limit,
            take: paginationQuery.limit,
        })
         /**
         * Create the request URLs
         */
        const baseURL =
        this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseURL);
        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / paginationQuery.limit);
        const nextPage =
            paginationQuery.page === totalPages
                ? paginationQuery.page
                : paginationQuery.page + 1;
        const previousPage =
            paginationQuery.page === 1
                ? paginationQuery.page
                : paginationQuery.page - 1;
        let finalResponse = {
            data: results,
            meta: {
                totalItems: totalItems,
                totalPages,
                currentPage: paginationQuery.page,
                itemsPerPage: paginationQuery.limit
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
            }
        }
        return finalResponse;
    }
}
