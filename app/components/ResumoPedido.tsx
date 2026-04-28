"use client"

import { useCart } from "@/context/CartContext"

export function ResumoPedido(){
    const {frete,produto} = useCart()

    const subtotal = produto?.preco || 0
    const valorFrete = frete?.preco || 0
    const total = subtotal + valorFrete

    return(
        <div>
            <h2>Resumo do Pedido</h2>
                <div>
                    <div>
                        <span>Produto:</span>
                        <span>{produto?.title || "Nenhum selecionado"}</span>
                    </div>

                    <div>
                        <span>Frete:</span>
                        <span>{frete? `${frete.nome} (R$ ${frete.preco})` : "AguardandoCEP..."}</span>
                    </div>

                    <div>
                        <span>Total:</span>
                        <span>R${total.toFixed(2)}</span>
                    </div>
                </div>
        </div>
    )
}