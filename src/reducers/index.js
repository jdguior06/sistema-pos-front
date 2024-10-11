import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import cliente from "./cliente";
import proveedor from "./proveedor"
import producto from "./producto"
import categoria from "./categoria";

export default combineReducers({
  auth,
  cliente,
  proveedor,
  producto,
  categoria
});
