export const getPosicaoPrincipal = (p:string)=>{
    const posicaoArray = p?.split(',')
    return  traduzirPosicao(posicaoArray[0])
}

export function manipularPaginacao(pagina:number, itensPorPagina=10) {
    let inicial = itensPorPagina*pagina - itensPorPagina
    let final = itensPorPagina*pagina - 1
    return {inicial, final}
}
export const traduzirPosicao = (p:string)=>{
    switch (p) {
        case 'GK':
            return 'GOL'
        
        case 'CB':
            return 'ZAG'
            
        case 'RB':
            return 'LD'
        
        case 'LB':
            return 'LE'
            
        case 'CDM':
            return 'VOL'
        case 'CM':
            return 'MC'
        
            
        case 'RM':
            return 'MD'
        
        case 'LM':
            return 'ME'
                
        case 'CAM':
            return 'MEI'
        
        case 'LW':
            return 'PE'
            
        case 'RW':
            return 'PD'
        
        case 'CF':
            return 'SA'
        case 'ST':
            return 'ATA'    
        default:
            return ''
    }
}