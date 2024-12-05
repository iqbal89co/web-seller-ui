import { fetchWrapperServer } from "@/helpers/fetch-wrapper-server";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { CategoryEntity } from "@/entity/category-entity";

const getAllBrands = async () => {
  const res = await fetchWrapper.get("/brands");
  return res?.data as CategoryEntity[];
};

const getBrand = async (id: number) => {
  return await fetchWrapper.get(`/brands/${id}`);
};

const getBrandServer = async (id: number) => {
  return await fetchWrapperServer.get(`/brands/${id}`);
};

const addBrand = async (payload: CategoryEntity) => {
  return await fetchWrapper.post("/brands", payload);
};

const editBrand = async (id: number, payload: CategoryEntity) => {
  return await fetchWrapper.post(`/brands/${id}`, payload);
};

const deleteBrand = async (id: number) => {
  return await fetchWrapper.remove(`/brands/${id}`);
};
const exportExcelBrands = async () => {
  await fetchWrapper.download(`/brands/export-excel`);
};

export const brandService = {
  getAllBrands,
  getBrand,
  getBrandServer,
  addBrand,
  editBrand,
  deleteBrand,
  exportExcelBrands,
};
