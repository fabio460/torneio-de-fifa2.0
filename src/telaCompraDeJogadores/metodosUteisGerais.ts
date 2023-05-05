export function formatoMonetario(valor:any){
 
    return valorInteiro(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

export function valorInteiro(v:any) {
    return parseInt(v?.split('.')[0])
}