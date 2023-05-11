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
    participante?:participantesType
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
      dados:participantesType,
      dadosDaApi?:dadosPremiacoesDaApiType
    },
    segundo:{
      nome:string,
      dados:participantesType,
      dadosDaApi?:dadosPremiacoesDaApiType
    },
    terceiro:{
      nome:string,
      dados:participantesType,
      dadosDaApi?:dadosPremiacoesDaApiType
    },
    quarto:{
      nome:string,
      dados:participantesType,
      dadosDaApi?:dadosPremiacoesDaApiType
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

export type premiadosType = {
  idParticipante:string,
  debito:number
}[]

export type pagadoresType = {
  pagadores:[
    {
      idParticipante:string
    }
  ],
  id:string
}

export type dadosPremiacoesDaApiType = {idParticipante:string,premio:number,nome?:string}