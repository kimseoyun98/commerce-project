//ssr
import React from "react";
import { Product } from "../type/Product";

export default async function Ssr() {
  const res = await fetch("http://localhost:4000/products", {
    cache: "no-cache",
  });
  const data: Product[] = await res.json();

  return (
    <div>
      <h1>SSR Page</h1>
      <div className="p-8 m-4">
        {data.map((product) => (
          <div className="flex border p-4 gap-4 rounded-md" key={product.id}>
            <img
              className="rounded-smr"
              width={150}
              height={150}
              src={product.images}
              alt={product.title}
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-sm">{product.description}</p>
                <p className="mt-4 text-2xl">{product.price.amount}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
