import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRequests } from './schemas/product-requests.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductRequestsService {
  constructor(
    @InjectModel(ProductRequests.name)
    private productRequestsModel: mongoose.Model<ProductRequests>,
  ) {}

  async findAll(): Promise<ProductRequests[]> {
    const productRequests = await this.productRequestsModel.find();

    return productRequests;
  }

  async findById(id: string): Promise<ProductRequests> {
    const singleProductRequest = await this.productRequestsModel.findById(id);

    if (!singleProductRequest) {
      throw new NotFoundException('Product request not found!');
    }

    return singleProductRequest;
  }
}
