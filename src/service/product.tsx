import { ProductEntity } from "../entity/product-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getAllProducts = async () => {
  const res = await fetchWrapper.get("/products");
  return res?.data as ProductEntity[];
};

const getAllProductsServer = async () => {
  const res = await fetchWrapperServer.get("/products");
  return res?.data as ProductEntity[];
};

const getProduct = async (id: number) => {
  return await fetchWrapper.get(`/products/${id}`);
};

const getProductServer = async (id: number) => {
  return await fetchWrapperServer.get(`/products/${id}`);
};

const addProduct = async (payload: ProductEntity) => {
  return await fetchWrapper.post("/products", payload);
};

const editProduct = async (id: number, payload: ProductEntity) => {
  return await fetchWrapper.post(`/products/${id}`, payload);
};

const deleteProduct = async (id: number) => {
  return await fetchWrapper.remove(`/products/${id}`);
};

const exportExcelProducts = async () => {
  await fetchWrapper.download(`/products/export-excel`);
};

export const productService = {
  getAllProducts,
  getAllProductsServer,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductServer,
  exportExcelProducts,
};
