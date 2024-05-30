import React, { useEffect, useState } from "react";
import EmptyPage from "../../pages/EmptyPage";
import { Button } from "@mui/material";

const Favourite = () => {
  const userId = localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const [remove, setRemove] = useState(null);
  const [update, setUpdate] = useState([]);

  // Función asincrónica para traer toda la 'wishlist ' del usuario
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/wishlist/${userId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener la lista de favoritos:", error);
    }
  };

  // Función para manejar la eliminación del producto de la lista
  const removeFromWishlist = async (productId) => {
    console.log( productId)
    const productIndexToRemove = products.findIndex(product => product.id === productId);

    if (productIndexToRemove !== -1) {
      // Crear una copia de la lista de productos
      const updatedProducts = [...products];
      // Eliminar el producto de la lista
      updatedProducts.splice(productIndexToRemove, 1);
      // Actualizar el estado de 'products' con la lista actualizada
      setProducts(updatedProducts);
    
      console.log(JSON.stringify(updatedProducts));
      console.log(typeof(JSON.stringify(updatedProducts)) )

      try{
        const response = await fetch(`http://127.0.0.1:5000/wishlist/${userId}`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json' 
          },
          body:JSON.stringify(updatedProducts)
        });
        if(response){
          console.log(response)
        }

      }catch(error){
        console.log(error)
      }
    }

  };

  // useEffect para cargar la lista de favoritos cuando se monta el componente
  useEffect(() => {
    fetchWishlist();
  }, []);

  // useEffect para imprimir la lista actualizada cuando 'remove' cambia
  useEffect(() => {
    if (remove) {
      console.log("LISTA ACTUALIZADA --->", products);
    }
  }, [remove, products]);

  return (
    <>
      {products.length === 0 ? (
        <EmptyPage
          title={"No tienes ningún artículo en tu lista de Favoritos"}
        />
      ) : (
        <div style={{ backgroundColor: "white" }}>
          <p>Los artículos favoritos son:</p>
          {products.map((item) => (
            <div
              style={{ backgroundColor: "grey", margin: "20px" }}
              key={item.id}
            >
              <h1>{item.name}</h1>
              <h1>{item.description}</h1>
              <h1>{item.category}</h1>
              <h1>{item.price}</h1>
              <Button
                variant="contained"
                onClick={() => removeFromWishlist(item.id)}
              >
                Ya no me gusta
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourite;
