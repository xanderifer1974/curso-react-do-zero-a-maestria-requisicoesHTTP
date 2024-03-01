import "./App.css";

import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fechData() {
      const resp = await fetch(url);
      const data = await resp.json();
      setProducts(data);
    }
    fechData();
  }, []);

  console.log(products);
  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.name} - R$: {product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
