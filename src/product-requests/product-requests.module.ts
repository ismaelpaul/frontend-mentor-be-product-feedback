import { Module } from '@nestjs/common';
import { ProductRequestsController } from './product-requests.controller';
import { ProductRequestsService } from './product-requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRequestsSchema } from './schemas/product-requests.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductRequests', schema: ProductRequestsSchema },
    ]),
  ],
  controllers: [ProductRequestsController],
  providers: [ProductRequestsService],
})
export class ProductRequestsModule {}
