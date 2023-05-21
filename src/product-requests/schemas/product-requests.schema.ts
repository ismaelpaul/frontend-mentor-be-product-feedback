import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class User {
  @Prop({ type: String, required: true })
  image: string;
  name: string;
  username: string;
}

class Replies {
  @Prop({ type: String, required: true })
  content: string;
  replyingTo: string;

  @Prop()
  user: User;
}

class Comments {
  @Prop()
  content: string;
  user: User;
  replies: Replies[];
}

@Schema({
  timestamps: true,
  collection: 'Product Requests',
})
export class ProductRequests {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: Number, required: true })
  upvotes: number;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  comments?: Comments[];
}

export const ProductRequestsSchema =
  SchemaFactory.createForClass(ProductRequests);
