"use client"

import { Frete } from "@/types/Frete";
import { Produto } from "@/types/Produto"

interface CartContextType {
    
    produto: Produto | null;
    frete: Frete | null;
    setProduto: (produto: Produto) => void
    setFrete: (frete:Frete) => void
}