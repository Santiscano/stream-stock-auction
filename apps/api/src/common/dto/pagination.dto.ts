import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';


/**
 * 
 * @example - Example of usage:
    import { PaginationDto } from './../common/dtos/pagination.dto';

    @Controller('products')
    export class ProductsController {
        constructor(private readonly productsService: ProductsService) {}

        @Get()
        findAll( @Query() paginationDto:PaginationDto ) {
            // console.log(paginationDto)
            return this.productsService.findAll( paginationDto );
        }
    }
 */
export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;

}