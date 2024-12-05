import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";
import { TransactionEntity } from "@/entity/transaction-entity";
import { TransactionHistoryEntity } from "@/entity/transaction-history-entity";

const addTransaction = async (payload: TransactionEntity) => {
  const res = await fetchWrapper.post("/transactions", payload);
  return res?.data;
};

const getAllTransactions = async () => {
  const res = await fetchWrapper.get(`/transactions`);
  res.data["summary"] = res.summary;
  return res?.data as TransactionHistoryEntity[];
};

const getSpendBandTransactions = async () => {
  const res = await fetchWrapper.get(`/transactions/spend-band`);
  return res?.data;
};

const getTransactionServer = async (id: number) => {
  const res = await fetchWrapperServer.get(`/transactions/${id}`);
  return res.data as TransactionHistoryEntity;
};

const exportExcelTransactions = async () => {
  await fetchWrapper.download(`/transactions/export-excel`);
};

const deleteTransaction = async (id: number) => {
  return await fetchWrapper.remove(`/transactions/${id}`);
};

export const transactionService = {
  addTransaction,
  getAllTransactions,
  getSpendBandTransactions,
  getTransactionServer,
  exportExcelTransactions,
  deleteTransaction,
};
