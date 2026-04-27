import { NextResponse } from "next/server";

export async function POST(req: Request) {
    
    const {cepDestino} = await req.json()

    //cep da loja
    const cepOrigem = "56330025"

    const estadoOrigem = cepOrigem.substring(0,2)
    const estadoDestino = cepDestino.substring(0,2)

    let fretes = []

    //Mesma região
    if(estadoOrigem === estadoDestino){
        
        fretes = [
            {
                id:1,
                nome: "Entrega Economica",
                preco: 12,
                delivery_tempo: 5
            },
            {
                id:2,
                nome:"Entrega Expressa",
                preco: 20,
                delivery_tempo: 2
            }
        ]

        
    } else {
        fretes = [
            {
                id:3,
                nome:"Entrega Nacional",
                preco: 35,
                delivery_time: 8
            }
        ]
    }
    return NextResponse.json(fretes)
}