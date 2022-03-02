import dedent from 'dedent'
import {IRegion, Decoders} from './App'

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
          if (decoder === 'chines1') {
            accounts.push(decoderChines1(line))
          }
          if (decoder === 'chines2') {
            accounts.push(decoderChines2(line))
          }
          if (decoder === 'chines3') {
            accounts.push(decoderChines3(line))
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
    return accounts
  }
}

export const GeneratePayload = (accounts: IAccount[], region: IRegion | undefined, bank: string) => {
  let str = ''
  accounts.forEach((account) => {
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

const decoderChines1 = (str: string) => {
  const clean = str
    .replaceAll('巴西区账号', '')
    .replaceAll('密码', '')
    .replaceAll('邮箱账号', '')
    .replaceAll('邮箱密码', '')
    .replaceAll('邮箱登录网址', '')
  const parts = clean.split('：')
  return {
    login: parts[1] || 'ERRO AO DECODIFICAR',
    password: parts[2] || 'ERRO AO DECODIFICAR'
  }
}

const decoderChines2 = (str: string) => {
  const clean = str
    .replaceAll('巴西区账号', '')
    .replaceAll('密码', '')
    .replaceAll('邮箱账号', '')
    .replaceAll('邮箱密码', '')
    .replaceAll('邮箱登录网址', '')
  const parts = clean.split('：')
  const password = parts[2].split(',').shift()
  return {
    login: parts[1] || 'ERRO AO DECODIFICAR',
    password: password || 'ERRO AO DECODIFICAR'
  }
}

const decoderChines3 = (str: string) => {
  const login = str.split('steam账号')!.pop()!.split('密码')[0]
  const badPassword = str.split('密码')[1]
  const password = badPassword.substring(0, badPassword.indexOf('邮'))
  return {
    login: login || 'ERRO AO DECODIFICAR',
    password: password || 'ERRO AO DECODIFICAR'
  }
}