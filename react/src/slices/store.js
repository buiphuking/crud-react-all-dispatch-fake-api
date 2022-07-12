import { configureStore } from "@reduxjs/toolkit";
import { listStudent_reducer } from "./listStudent_slice";

export const store = configureStore({
  reducer: {
    listStudent: listStudent_reducer,
    //product: product_reducer,
  },
});
