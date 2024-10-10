'use client'

import store from "./redux/store/store";
import TableList from "./table/tablelist";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <>
    <Provider store={store}>
      <TableList />
      </Provider>
    </>
  );
}
