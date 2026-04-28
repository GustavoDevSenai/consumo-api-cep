"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"


export default function ProductCard({ produto }:any){

    const router = useRouter()

    const {setProduto} = useCart()

    function comprar(){

        setProduto({
            id:produto.id,
            title: produto.title,
            preco: produto.price,
            image:produto.image
        })
        router.push("/checkout")
    }

    return(
        <div className="border p-4 rounded shadow">
            <img src={produto.image} alt="" 
            className="h-40 object-contain mx-auto"
            />
            <h2 className="font-bold mt-2">
                {produto.title}
            </h2>
            <p className="text-green-600 font-bold">
                R$ {produto.price}
            </p>
            <button onClick={comprar} className="bg-blue-500 text-white w-full mt-3 p-2 roudned ">
                Comprar
            </button>

        </div>
    )

}