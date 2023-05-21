export class CreateProductRequestDto {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly upvotes: number;
  readonly status: string;
}
