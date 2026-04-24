"use client"

import { useState } from "react";

interface Endereco {
  cep: string
  rua: string
  bairro: string
  cidade: string
  estado: string
}

export default function Home() {

  const [endereco, setEndereco] = useState<Endereco>({
    cep:"",
    rua:"",
    bairro:"",
    cidade:"",
    estado:""
  });

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

        </div>
   </main>
  );
}
