import { Controller, Get } from '@nestjs/common';
import { ProductRequestsService } from './product-requests.service';
import { ProductRequests } from './schemas/product-requests.schema';

@Controller('product-requests')
export class ProductRequestsController {
  constructor(private productRequestsService: ProductRequestsService) {}

  @Get()
  async getAllProductRequests(): Promise<ProductRequests[]> {
    return this.productRequestsService.findAll();
  }
}
