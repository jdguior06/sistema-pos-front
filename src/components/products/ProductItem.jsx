import React from "react";

import plato from "../../assets/plato1.jpg";
import "../../styles/products/productitem.css";

const ProductItem = () => {
  return (
    <div className="product-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7lkawcqjiHdmN-FquvzilxYI1outSpfO-YA&s" />
      <h4>Nombre Producto</h4>
      <p>Bs 54.00</p>
    </div>
  );
};

export default ProductItem;
