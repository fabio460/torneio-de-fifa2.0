export interface jogadoresType{
    id?:string,
    nome: string,
    imagemDoJogador: string,
    nacionalidade?: string,
    imagemDaNacionalidade: string,
    escudoDoTime: string,
    posicao: string,
    overall: string,
    valorDoJogador?: string,
    time: string,
    liga: string,
    linkSoFifa:string,
    posicaoNoCampinho?:posicaoNoCampinhoType[]
}

export type participantesType = {
   id: string,
   jogadores:jogadoresType[],
   nome: string,
   saldo: number,
   time: string,
   idTorneio: string,
   torneio: torneioType
}

export interface torneioType {
    id: string,
    idDoUsuario:string,
    nome:string,
    participantes:participantesType[]
 }

 export type usuarioLogadoType = {
    id:string,
    email:string,
    nome:string,
    torneio:torneioType[]
 }
 export type chekedType = {
   participante:participantesType,
   selecionado:boolean
 }
 export type selecionadosType={
    primeiro:{
      nome:string,
      dados:participantesType
    },
    segundo:{
      nome:string,
      dados:participantesType
    },
    terceiro:{
      nome:string,
      dados:participantesType
    },
    quarto:{
      nome:string,
      dados:participantesType
    }
 }

 export type posicaoNoCampinhoType = {
   idJogador:string,
   x:number,
   y:number
 }

 export type checkedType = {
  jogador: jogadoresType,
  selecionado:boolean
}