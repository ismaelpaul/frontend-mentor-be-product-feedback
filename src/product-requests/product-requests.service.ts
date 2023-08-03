import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comments, ProductRequests } from './schemas/product-requests.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductRequestsService {
  constructor(
    @InjectModel(ProductRequests.name)
    private productRequestsModel: mongoose.Model<ProductRequests>,
  ) {}

  async findAll(
    sortingOption: string,
    category: string,
  ): Promise<ProductRequests[]> {
    let sortCriteria = {};

    switch (sortingOption) {
      case 'mostUpvotes':
        sortCriteria = { upvotes: -1 };
        break;
      case 'mostComments':
        sortCriteria = { commentsCount: -1 };
        break;
      case 'leastUpvotes':
        sortCriteria = { upvotes: 1 };
        break;
      case 'leastComments':
        sortCriteria = { commentsCount: 1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
    }

    const matchCriteria: any = {};

    if (category !== 'all') {
      matchCriteria.category = category.toLowerCase();
    }

    const productRequests = await this.productRequestsModel
      .aggregate([
        {
          $match: matchCriteria,
        },
        {
          $addFields: {
            commentsCount: {
              $cond: {
                if: { $isArray: '$comments' },
                then: { $size: '$comments' },
                else: 0,
              },
            },
          },
        },
        {
          $sort: sortCriteria,
        },
      ])
      .exec();

    return productRequests;
  }

  async findById(id: string): Promise<ProductRequests> {
    const singleProductRequest = await this.productRequestsModel.findById(id);

    if (!singleProductRequest) {
      throw new NotFoundException('Product request not found!');
    }

    return singleProductRequest;
  }

  async addProductRequest(
    productRequest: ProductRequests,
  ): Promise<ProductRequests> {
    return await this.productRequestsModel.create(productRequest);
  }

  async updateProductRequest(
    id: string,
    updatedProductRequest: ProductRequests,
  ): Promise<ProductRequests> {
    const existingProductRequest =
      await this.productRequestsModel.findByIdAndUpdate(
        id,
        updatedProductRequest,
        { new: true },
      );

    if (!existingProductRequest) {
      throw new Error(`Product request with ID ${id} not found.`);
    }

    return existingProductRequest;
  }

  async addComment(id: string, comment: Comments): Promise<ProductRequests> {
    const productRequest = await this.productRequestsModel.findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment } },
      { new: true },
    );

    if (!productRequest) {
      throw new NotFoundException('Product request not found');
    }
    return productRequest;
  }

  async updateUpvotes(id: string, vote: number): Promise<ProductRequests> {
    const productRequest = await this.productRequestsModel.findByIdAndUpdate(
      { _id: id },
      { $inc: { upvotes: vote } },
      { new: true },
    );

    if (!productRequest) {
      throw new NotFoundException('Product request not found');
    }

    return productRequest;
  }

  async deleteById(id: string): Promise<ProductRequests> {
    return await this.productRequestsModel.findByIdAndDelete(id);
  }
}
