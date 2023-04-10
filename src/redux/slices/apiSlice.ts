import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Order {
  name: string;
  qty: number;
  price: number;
  _id: string;
}

interface Transaction {
  _id: string;
  customerName: string;
  totalQty: number;
  totalPrice: number;
  order: Order[];
  orderDate: Date;
  __v: number;
}

type TransactionResponse = Transaction[];

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://cors-anywhere.herokuapp.com/https://puce-beautiful-beaver.cyclic.app/restaurant/',
  }),
  tagTypes: ['Transactions'],
  endpoints: (build) => ({
    getTransactions: build.query<TransactionResponse, void>({
      query: () => 'transactions',
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: 'Transactions', _id })) : [],
    }),
  }),
});

export const { useGetTransactionsQuery } = api;
