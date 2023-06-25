import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductRequestsService } from './product-requests.service';
import { Comments, ProductRequests } from './schemas/product-requests.schema';
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

    if ((category && category === 'UI') || category === 'UX') {
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

  @Patch(':id')
  async updateProductRequest(
    @Param('id') id: string,
    @Body() updatedProductRequest: ProductRequests,
  ): Promise<ProductRequests> {
    const updatedRequest =
      await this.productRequestsService.updateProductRequest(
        id,
        updatedProductRequest,
      );

    if (!updatedRequest) {
      throw new NotFoundException(`Product request with ID ${id} not found.`);
    }

    return updatedRequest;
  }

  @Patch(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body() comment: Comments,
  ): Promise<ProductRequests> {
    try {
      const updatedProductRequest =
        await this.productRequestsService.addComment(id, comment);
      return updatedProductRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Product request not found');
      }
      throw error;
    }
  }

  @Patch(':id/upvotes')
  async updateUpvotesProductRequest(
    @Param('id') id: string,
    @Body() { upvotes }: { upvotes: number },
  ): Promise<ProductRequests> {
    try {
      const updatedProductRequest =
        await this.productRequestsService.updateUpvotes(id, upvotes);

      return updatedProductRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Product request not found');
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteProductRequest(
    @Param('id')
    id: string,
  ): Promise<ProductRequests> {
    return this.productRequestsService.deleteById(id);
  }
}
