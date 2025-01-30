import { CreateProductDto, ProductsQueryDto, UpdateProductDto } from '@app/products';
import { PRODUCTS_SERVICE, PaginationQueryDto } from '@app/shared';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCTS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = await lastValueFrom(
                this.client.send('products.create', createProductDto)
            );
            return product;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    async findAll(paginationQueryDto: PaginationQueryDto, productsQueryDto: ProductsQueryDto) {
        try {
            const products = await lastValueFrom(
                this.client.send('products.findAll', { paginationQueryDto, productsQueryDto})
            );

            return products;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findOne(id: string) {
        try {
            const product = await lastValueFrom(
                this.client.send('products.findOne', id)
            );
            return product;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            const product = await lastValueFrom(
                this.client.send('products.update', { id, ...updateProductDto })
            );
            return product;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async remove(id: string) {
        try {
            const product = await lastValueFrom(
                this.client.send('products.delete', id)
            );
            return product;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async search(query: string) {
        try {
            const products = await lastValueFrom(
                this.client.send('products.search', query)
            );
            
            return products;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }
}
