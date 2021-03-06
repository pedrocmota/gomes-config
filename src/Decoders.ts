import dedent from 'dedent'
import {IRegion, Decoders, Formats} from './App'

interface IAccount {
  login: string,
  password: string
}

export const Decoder = (raw: string, decoder: Decoders) => {
  if (raw.length > 0) {
    const lines = raw.split('\n')
    const accounts = [] as IAccount[]
    try {
      lines.forEach((line) => {
        if (line.length > 1) {
          if (decoder === 'espaco') {
            accounts.push(decoderEspaco(line))
          }
          if (decoder === 'hifen') {
            accounts.push(decoderHifen(line))
          }
          if (decoder === 'chines1') {
            accounts.push(decoderChines1(line))
          }
          if (decoder === 'chines2') {
            accounts.push(decoderChines2(line))
          }
          if (decoder === 'chines3') {
            accounts.push(decoderChines3(line))
          }
          if (decoder === 'chines4') {
            accounts.push(decoderChines4(line))
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
    return accounts
  }
}

export const GeneratePayload = (
  accounts: IAccount[],
  region: IRegion | undefined,
  bank: string,
  format: Formats
) => {
  let str = ''
  accounts.forEach((account) => {
    if (format === 'config') {
      str += dedent(`
      {
        acc = "${account.login}";
        psw = "${account.password}";
        regserver = ${region?.code ?? 'NADA SELECIONADO'};
        server = "${region?.server || 'NADA SELECIONADO'}";
        mailname = "${bank}";
        fin = 0;
      },
      `) + ' '
    }
    if (format === 'json') {
      str += dedent(`
      {
        "acc": "${account.login}",
        "psw": "${account.password}",
        "regserver": "${region?.code ?? 'NADA SELECIONADO'}",
        "server": "${region?.server || 'NADA SELECIONADO'}",
        "mailname": "${bank}",
        "fin": 0
      },
      `) + ' '
    }
  })
  return str
}

const decoderEspaco = (str: string) => {
  const parts = str.split(' ').filter((el) => el !== '')
  return {
    login: parts[0] || 'ERRO AO DECODIFICAR',
    password: parts[1] || 'ERRO AO DECODIFICAR'
  }
}

const decoderHifen = (str: string) => {
  const parts = str.split('----').filter((el) => el !== '')
  return {
    login: parts[0] || 'ERRO AO DECODIFICAR',
    password: parts[1] || 'ERRO AO DECODIFICAR'
  }
}

const decoderChines1 = (str: string) => {
  const clean = str
    .replaceAll('???????????????', '')
    .replaceAll('??????', '')
    .replaceAll('????????????', '')
    .replaceAll('????????????', '')
    .replaceAll('??????????????????', '')
  const parts = clean.split('???')
  return {
    login: parts[1] || 'ERRO AO DECODIFICAR',
    password: parts[2] || 'ERRO AO DECODIFICAR'
  }
}

const decoderChines2 = (str: string) => {
  const clean = str
    .replaceAll('???????????????', '')
    .replaceAll('??????', '')
    .replaceAll('????????????', '')
    .replaceAll('????????????', '')
    .replaceAll('??????????????????', '')
  const parts = clean.split('???')
  const password = parts[2].split(',').shift()
  return {
    login: parts[1] || 'ERRO AO DECODIFICAR',
    password: password || 'ERRO AO DECODIFICAR'
  }
}

const decoderChines3 = (str: string) => {
  const login = str.split('steam??????')!.pop()!.split('??????')[0]
  const badPassword = str.split('??????')[1]
  const password = badPassword.substring(0, badPassword.indexOf('???'))
  return {
    login: login || 'ERRO AO DECODIFICAR',
    password: password || 'ERRO AO DECODIFICAR'
  }
}

const decoderChines4 = (str: string) => {
  const sub = str.substring(3)
  const array = sub.split('----')
  return {
    login: array[0] || 'ERRO AO DECODIFICAR',
    password: array[1] || 'ERRO AO DECODIFICAR'
  }
}