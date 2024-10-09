import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import cliente from "./cliente";
import proveedor from "./proveedor"

export default combineReducers({
  auth,
  cliente,
  proveedor,
});
