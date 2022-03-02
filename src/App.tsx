import React, {useState} from 'react'
import SplitPane from 'react-split-pane'
import {ProcessRaw, processData} from './process'
import Regions from './Regions.json'

export interface IRegion {
  code: number,
  regionName: string,
  server: string
}

const App: React.FunctionComponent = () => {
  const [raw, setRaw] = useState('')
  const [china, setChina] = useState('0')
  const [region, setRegion] = useState<IRegion>()
  const [bank, setBank] = useState('')

  const processed = ProcessRaw(raw, china)
  const str = processData(processed || [], region, bank)
  return (
    <SplitPane split="horizontal" minSize={50} defaultSize={300}>
      <div className="splitpanel">
        <textarea
          id="raw"
          spellCheck="false"
          onChange={(e) => setRaw(e.target.value)}
          placeholder="COLE O TEXTO BRUTO DAS CONTAS NESTE CAMPO"
        />
        <div className="toolbar">
          <select value={china} onChange={(e) => setChina(e.target.value)}>
            <option value="0">Selecione um chinês</option>
            <option value="1">Fataly</option>
            <option value="2">Chinês 2</option>
            <option value="3">Chinês 3</option>
            <option value="4">Chinês 4</option>
          </select>
          <select value={region?.server} onChange={(e) => {
            const selectedServer = e.target.value
            const selectedRegion = Regions.find((e) => e.servers.includes(selectedServer))
            if (selectedRegion) {
              setRegion({
                code: selectedRegion.code,
                regionName: selectedRegion.name,
                server: selectedServer
              })
            } else {
              setRegion(undefined)
            }
          }}>
            <option value="">Selecione um servidor</option>
            {Regions.map((region) => {
              const servers = region.servers
              return servers.map((server) => {
                return (
                  <option key={server} value={server}>{server} - {region.name}</option>
                )
              })
            })}
          </select>
          <input
            id="character"
            placeholder="Nome do banco"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
        </div>
      </div>
      <div className="splitpanel">
        <textarea
          id="final"
          spellCheck="false"
          readOnly={true}
          value={str}
        />
        <button id="copy" onClick={() => {
          if (str.length > 0) {
            navigator.clipboard.writeText(str)
          }
        }}>Copiar</button>
      </div>
    </SplitPane>
  )
}

export default App