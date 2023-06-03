import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductRequestsService } from './product-requests.service';
import { ProductRequests } from './schemas/product-requests.schema';
import { CreateProductRequestDto } from './dto/create-product-request.dto';

@Controller('product-requests')
export class ProductRequestsController {
  constructor(private productRequestsService: ProductRequestsService) {}

  @Get()
  async getAllProductRequests(): Promise<ProductRequests[]> {
    return this.productRequestsService.findAll();
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
    return this.productRequestsService.create(productRequest);
  }

  @Delete(':id')
  async deleteProductRequest(
    @Param('id')
    id: string,
  ): Promise<ProductRequests> {
    return this.productRequestsService.deleteById(id);
  }
}
