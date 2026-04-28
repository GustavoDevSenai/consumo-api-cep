"use client"

import { useState } from "react";
import { Frete } from "../../types/Frete"
import { useCart } from "@/context/CartContext";
import { ResumoPedido } from "../components/ResumoPedido";

interface Endereco {
  cep: string
  rua: string
  bairro: string
  cidade: string
  estado: string
}

export default function checkout() {

  const [endereco, setEndereco] = useState<Endereco>({
    cep:"",
    rua:"",
    bairro:"",
    cidade:"",
    estado:""
  });

  const [fretes,setFretes] = useState<Frete[]>([])
  //usando o useCart()
  const {setFrete, frete: freteSelecionado} = useCart();


  async function buscarCep() {
    const response = await 
    fetch(`https://viacep.com.br/ws/${endereco.cep}/json/`)

    const data = await response.json()

    setEndereco({
      ...endereco,
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    })

    calcularFrete(endereco.cep)
  }

  async function calcularFrete(cep: string) {
    const response = await fetch("/api/frete",{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({cepDestino: cep})
    })

    const data = await response.json()

    setFretes(data)
  }

  return (
   <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow w-96 space-y-4">
          <h1 className="text-xl font-bold text-center">Formulario CEP</h1>
            <input 
            className="border p-2 w-full"
            placeholder="CEP"
            value={endereco.cep}
            onChange={(e)=> setEndereco({...endereco, cep: e.target.value})}
            onBlur={buscarCep}
            />

            <input 
             className="border p-2 w-full"
            placeholder="Rua"
            value={endereco.rua}
            onChange={(e)=> setEndereco({...endereco, rua: e.target.value})}
            />

            <input 
             className="border p-2 w-full"
            placeholder="Bairro"
            value={endereco.bairro}
            onChange={(e)=> setEndereco({...endereco, bairro: e.target.value})}
            />

            <input 
             className="border p-2 w-full"
            placeholder="Cidade"
            value={endereco.cidade}
            onChange={(e)=> setEndereco({...endereco, cidade: e.target.value})}
            />

            <input 
             className="border p-2 w-full"
            placeholder="Estado"
            value={endereco.estado}
            onChange={(e)=> setEndereco({...endereco, estado: e.target.value})}
            />


          
        <div className="mt-4 space-y-2">
            {fretes.length > 0 && (
              <h2 className="font-bold">Escolha o frete</h2>
            )}

            {fretes.map((frete)=>(
              <div key={frete.id} 
              className={`cursor-pointer border p-3 rounded 
                ${freteSelecionado?.id === frete.id ? 'border-blue-600 bg-blue-50 ':'border-gray-200'}`}
              onClick={()=>setFrete(frete)} //Salvando no contexto
              >
                  <p className="font-bold">{frete.nome}</p>
                  <p>R${frete.preco}</p>
              </div>
            ))}
        </div>

        <div>
          <ResumoPedido />
        </div>

        </div>

       
   </main>
  );
}
