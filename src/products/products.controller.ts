import { Body, Controller, Delete, Get, Param, Put, Post, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PaginationQueryDto } from '@app/shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@app/iam/authentication/decorators/auth.decorator';
import { AuthType } from '@app/iam/authentication/enums/auth-type.enum';
import { ProductsQueryDto, UpdateProductDto } from '@app/products';
import { CreateProductDto } from '@app/products/dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

// @ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
        createProductDto.image = file?.buffer.toString('base64');
        return this.productsService.create(createProductDto);
    }

    @Auth(AuthType.None)
    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto, @Query() productsQueryDto: ProductsQueryDto) {
        return this.productsService.findAll(paginationQueryDto, productsQueryDto);
    }

    @Auth(AuthType.None)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Auth(AuthType.None)
    @Get('search')
    search(@Query('query') query: string) {
        return this.productsService.search(query);
    }
}
