import dedent from 'dedent'

interface IAccount {
  login: string,
  password: string
}

export const ProcessRaw = (raw: string) => {
  if (raw.length > 0) {
    const lines = raw.split('\n')
    const accounts = [] as IAccount[]
    lines.forEach((line) => {
      if (line.startsWith('巴西区账号')) {
        const clean = line
          .replaceAll('巴西区账号', '')
          .replaceAll('密码', '')
          .replaceAll('邮箱账号', '')
          .replaceAll('邮箱密码', '')
          .replaceAll('邮箱登录网址', '')
        const parts = clean.split('：')
        accounts.push({
          login: parts[1],
          password: parts[2]
        })
      }
    })
    return accounts
  }
}

export const processData = (accounts: IAccount[], server: string, region: string, bank: string) => {
  let str = ''
  accounts.forEach((account) => {
    str += dedent(`
    {
      acc = "${account.login}";
      psw = "${account.password}";
      regserver = ${region};
      server = "${server}";
      mailname = "${bank}";
      fin = 0;
    },
    `) + ' '
  })
  return str
}