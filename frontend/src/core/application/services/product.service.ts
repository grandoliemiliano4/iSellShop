import { ProductMapper } from "../mappers/product.mapper";
import { Product } from "../../domain/entities/product.entity";
import HttpClient from "../../../infraestructure/http/httpClient";

const httpClient = new HttpClient();

class ProductService {
  async getProductById(id: number): Promise<Product> {
    const data = await httpClient.get<any>(`/products/${id}`);
    return ProductMapper.toDomain(data);
  }

  async getProducts(
    page: number = 1,
    limit: number = 12,
    search: string = "",
    category: string = "",
    condition: string = "",
  ): Promise<{ data: Product[]; total: number; lastPage: number }> {
    const params: any = { page, limit };

    if (search) params.search = search;
    if (category) params.category = category;
    if (condition) params.condition = condition;

    const url = `/products`;
    const response = await httpClient.get<any>(url, { params });

    return {
      data: ProductMapper.toDomainList(response.data || response),
      total: response.meta?.total || 0,
      lastPage: response.meta?.lastPage || 1,
    };
  }

  async saveProduct(productData: any): Promise<void> {
    const isEditing = !!productData.id;
    const url = isEditing ? `/products/${productData.id}` : "/products";
    const { id, ...dataToSave } = productData;

    let body: any = dataToSave;
    if (dataToSave.image instanceof File) {
      body = new FormData();
      Object.keys(dataToSave).forEach((key) => {
        if (dataToSave[key] !== null && dataToSave[key] !== undefined) {
          body.append(key, dataToSave[key]);
        }
      });
    }

    if (isEditing) {
      await httpClient.patch(url, body);
    } else {
      await httpClient.post(url, body);
    }
  }

  async deleteProduct(id: number): Promise<void> {
    await httpClient.delete(`/products/${id}`);
  }
}

const productService = new ProductService();
export default productService;
