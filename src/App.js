import "./App.css";

import { useState, useEffect } from "react";

//4 - Custom Hooks
import {useFetch} from "./hooks/UseFetch";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  //4 - Custom
  const {data: items} = useFetch(url);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // 1 - Resgatando dados
  // useEffect(() => {
  //   async function fechData() {
  //     const resp = await fetch(url);
  //     const data = await resp.json();
  //     setProducts(data);
  //   }
  //   fechData();
  // }, []);

  //2 - Adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      categoryId,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    //3 - Carregamento dinâmico
    const addedProduct = await res.json();

    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    setName("");
    setPrice("");
    setCategoryId("");
  };
  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {items && items.map((product) => {
          return (
            <li key={product.id}>
              {product.name} - R$: {product.price} - IdCategoria:{" "}
              {product.categoryId}
            </li>
          );
        })}
      </ul>

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            IdCategoria:
            <input
              type="number"
              value={categoryId}
              name="categoryId"
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar Produto" />
        </form>
      </div>
    </div>
  );
}

export default App;
