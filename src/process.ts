import dedent from 'dedent'
import {IRegion} from './App'

interface IAccount {
  login: string,
  password: string
}

export const ProcessRaw = (raw: string, china: string) => {
  if (raw.length > 0) {
    const lines = raw.split('\n')
    const accounts = [] as IAccount[]
    try {
      lines.forEach((line) => {
        if (line.length > 1) {
          if (china === '1') {
            accounts.push(china1(line))
          }
          if (china === '2') {
            accounts.push(china2(line))
          }
          if (china === '3') {
            accounts.push(china3(line))
          }
          if (china === '4') {
            accounts.push(china4(line))
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
    return accounts
  }
}

export const china1 = (str: string) => {
  const parts = str.split(' ').filter((el) => el !== '')
  return {
    login: parts[0] || 'ERRO AO DECODIFICAR',
    password: parts[1] || 'ERRO AO DECODIFICAR'
  }
}

export const china2 = (str: string) => {
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

export const china3 = (str: string) => {
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

export const china4 = (str: string) => {
  const login = str.split('steam账号')!.pop()!.split('密码')[0]
  const badPassword = str.split('密码')[1]
  const password = badPassword.substring(0, badPassword.indexOf('邮'))
  return {
    login: login || 'ERRO AO DECODIFICAR',
    password: password || 'ERRO AO DECODIFICAR'
  }
}

export const processData = (accounts: IAccount[], region: IRegion | undefined, bank: string) => {
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