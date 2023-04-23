import { Injectable } from '@nestjs/common';
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
}
