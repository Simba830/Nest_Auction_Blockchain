import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { ProductController as ProductController } from './product.controller';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [PrismaService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('product', () => {
    it('should return a product list', () => {
      expect(productController.getProducts()).not.toBeNaN;
    });
  });
});
