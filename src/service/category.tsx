import { fetchWrapperServer } from "@/helpers/fetch-wrapper-server";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { CategoryEntity } from "@/entity/category-entity";

const getAllCategories = async () => {
  const res = await fetchWrapper.get("/categories");
  return res?.data as CategoryEntity[];
};

const getCategory = async (id: number) => {
  return await fetchWrapper.get(`/categories/${id}`);
};

const getCategoryServer = async (id: number) => {
  return await fetchWrapperServer.get(`/categories/${id}`);
};

const addCategory = async (payload: CategoryEntity) => {
  return await fetchWrapper.post("/categories", payload);
};

const editCategory = async (id: number, payload: CategoryEntity) => {
  return await fetchWrapper.post(`/categories/${id}`, payload);
};

const deleteCategory = async (id: number) => {
  return await fetchWrapper.remove(`/categories/${id}`);
};
const exportExcelCategories = async () => {
  await fetchWrapper.download(`/categories/export-excel`);
};

export const categoryService = {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryServer,
  exportExcelCategories,
};
