import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailsProducts = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto.");
        }
        const data = await response.json();
        setProduct(data[0]);
        console.log("PRODUCTO QUE QUIER VER---->", data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <h2>Detalles del Producto</h2>
      <p>
        <strong>Nombre:</strong> {product.name}
      </p>
      <p>
        <strong>Descripción:</strong> {product.description}
      </p>
      <p>
        <strong>Precio:</strong> {product.price}€
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
    </div>
  );
};

export default DetailsProducts;
