import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductRequestsService } from './product-requests.service';
import { ProductRequests } from './schemas/product-requests.schema';
import { CreateProductRequestDto } from './dto/create-product-request.dto';

@Controller('product-requests')
export class ProductRequestsController {
  constructor(private productRequestsService: ProductRequestsService) {}

  @Get()
  async getAllProductRequests(
    @Query('sort') sortingOption?: string,
    @Query('category') category?: string,
  ): Promise<ProductRequests[]> {
    let categoryLowerCase;

    if (category === 'UI' || category === 'UX') {
      categoryLowerCase = category.toLowerCase();
    } else {
      categoryLowerCase =
        category.charAt(0).toLocaleLowerCase() + category.slice(1);
    }

    return this.productRequestsService.findAll(
      sortingOption,
      categoryLowerCase,
    );
  }

  @Get(':id')
  async getSingleProductRequest(
    @Param('id') id: string,
  ): Promise<ProductRequests> {
    return this.productRequestsService.findById(id);
  }

  @Post()
  async addProductRequest(
    @Body()
    productRequest: CreateProductRequestDto,
  ): Promise<ProductRequests> {
    return this.productRequestsService.addProductRequest(productRequest);
  }

  @Delete(':id')
  async deleteProductRequest(
    @Param('id')
    id: string,
  ): Promise<ProductRequests> {
    return this.productRequestsService.deleteById(id);
  }
}
