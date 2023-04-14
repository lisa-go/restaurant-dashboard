import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Order {
  name: string;
  qty: number;
  price: number;
  _id: string;
}

export interface Transaction {
  _id: string;
  customerName: string;
  totalQty: number;
  totalPrice: number;
  order: Order[];
  orderDate: Date;
  __v: number;
}

export type TransactionResponse = Transaction[];

interface Food {
  _id: string;
  name: string;
  native_name: string;
  description: string;
  type: string;
  sub_cat: string;
  price: number;
  rating: number;
  img: string;
  __v: number;
}

export type FoodResponse = Food[];

interface Drink {
  _id: string;
  name: string;
  price: number;
  rating: number;
  img: string;
  __v: number;
}

export type DrinkResponse = Drink[];

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://puce-beautiful-beaver.cyclic.app/restaurant/',
  }),
  tagTypes: ['Transactions', 'Menu/foods', 'Menu/drinks'],
  endpoints: (build) => ({
    getTransactions: build.query<TransactionResponse, void>({
      query: () => 'transactions',
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: 'Transactions', _id })) : [],
    }),
    getMenuFoods: build.query<FoodResponse, void>({
      query: () => 'menu/foods',
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: 'Menu/foods', _id })) : [],
    }),
    getMenuDrinks: build.query<DrinkResponse, void>({
      query: () => 'menu/drinks',
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: 'Menu/drinks', _id })) : [],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetMenuFoodsQuery,
  useGetMenuDrinksQuery,
} = api;
