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
   torneio: torneioType,
   emblemaDoTime?: string
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
  selecionado:boolean,
  participante?:participantesType,
  checked?:boolean
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

export type dadosPremiacoesDaApiType = {
  idParticipante:string,
  premio:number,nome?:string
}

export type statisticasTypes = {
  id?:string,
  artilheiros:string[],
  data:Date,
  assistentes:string[],
  vencedor:string
}
export type timesType = {
  label:string,
  escudo:string
}

export type dadosDoJogoType = {

     gols:{
      idParticipante:string, 
      premio:number,
      dado?:number,
      tipoDeDado?:string,
      participante?:string
     }[],
     empates:{
      idParticipante:string, 
      premio:number,
      dado?:number,
      tipoDeDado?:string,
      participante?:string
     }[],
     vitorias:{
      idParticipante:string, 
      premio:number,
      dado?:number,
      tipoDeDado?:string,
      participante?:string
     }[]

}

export type checkedTypes = {
  participante:participantesType,
  checked:boolean
}

export type artilheirosTypeReducer={
  primeiro:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
  quarto:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
  segundo:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
  terceiro:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
}

export type assistentesTypeReducer={
  primeiro:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
  quarto:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
  segundo:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
  terceiro:{
    jogador: jogadoresType,
    participante: {
      participante:participantesType
    },
    dadosDaApi: dadosPremiacoesDaApiType
  }[],
}

export type participanteeducerType ={
  participante:participantesType,
  selecionado:boolean
}
export type jogosType = { 
  casa:participanteeducerType,
  fora:participanteeducerType,
  golsCasa?:number,
  golsFora?:number
}

export type golsType = {participante:participantesType, gol:number}
export type resultadoDaPartidaType= {
  golCasa:golsType,
  golFora:golsType
}
export type rodadasType ={
  id: string,
  idDoMandante: string,
  idDoVisitante: string,
  idCampeonato: string,
  golsMandante: number,
  golsVisitante: number,
  statusDaRodada:string,
  mandante: {
    id: string,
    nome: string,
    saldo: number,
    time: string,
    emblemaDoTime: string,
    idTorneio: string
    idParticipante: string
  }[],
  visitante: {
    id: string,
    nome: string,
    saldo: number,
    time: string,
    emblemaDoTime: string,
    idTorneio: string
    idParticipante: string
  }[]
} 
export type campeonatoType = {
  id: string,
  status: string,
  data: string,
  rodada:rodadasType[]
}

export type tabelaCampeonatoType ={
  equipe: string,
  avatar:string,
  pontos: number,
  jogos: number,
  vitorias: number,
  empates: number,
  derrota:number,
  golsPro:number,
  golsContra:number,
  saldoDeGol:number,
  idDoParticipante:string,
  idDoTorneio:string
}
export type torneioTypeApi = {
  id: string,
  status: string,
  data: string,
  idTorneio: string
}

export type resultadoType = {  
  Artilharia:number,
  PremioColocacao:number,
  Empates:number,
  Gols:number,
  Vitorias:number,
  Campeoes:string,
  PosArtilharia:string,
  quantVitorias:number,
  quantGols:number,
  quantEmpates:number
  beneficiado: {
    id: string,
    idDoTorneio: string, 
    idDoCampeonato:string, 
    idDoParticipante: string, 
    avatar: string,
    equipe:string,
    derrota:number,
    empates:number,
    golsContra:number,
    golsPro:number,
    jogos:number,
    pontos:number,
    saldoDeGol:number, 
    vitorias:number,
    posicaoDefezaMenosVazada?:string,
    premioDefezaMenosVazada?:number
  }
  idParticipante:string
  premio:number
}

export type tabelaDeResultadosType = {
  data:string,
  id:string,
  idDoCampeonato:string,
  idDoTorneio:string,
  dataDeInicio:string,
  resultados:{
    artilharia:string,
    avatar:string, 
    colocacao:string,
    empates:number,
    gols:number,
    id:string,
    golsTomados:number,
    idDoParticipante:string,
    idTabelaResultados:string,
    premioArtilharia:number,
    premioColocacao:number,
    premioEmpates:number,
    premioGols:number,
    premioVitorias:number,
    total:number,
    usuario:string,
    vitorias:number,
  }[]
}

export type tabelaType = {
  avatar:string,
  derrota:number,
  empates:number,
  equipe:string,
  golsContra:number,
  golsPro:number,
  id:string,
  idDoCampeonato:string,
  idDoParticipante:string,
  idDoTorneio:string,
  jogos:number,
  pontos:number,
  saldoDeGol:number,
  vitorias:number
}