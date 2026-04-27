"use client"

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

export default function Home() {


  const [produtos,setProdutos] = useState([])

  async function carregarProdutos() {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    setProdutos(data)
  }

  useEffect(()=>{
    carregarProdutos()
  },[])
  
  return (
   <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Minha Loja</h1>
      <div className="grid grid-cols-4 gap-6">
          {produtos.map((p:any)=>(
            <ProductCard key={p.id} produto={p}/>
          ))}
      </div>
   </main>
  );
}
