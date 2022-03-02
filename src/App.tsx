import React, {useState} from 'react'
import SplitPane from 'react-split-pane'
import {Decoder, GeneratePayload} from './Decoders'
import Regions from './Regions.json'

export interface IRegion {
  code: number,
  regionName: string,
  server: string
}

export type Decoders = '' | 'espaco' | 'chines1' | 'chines2' | 'chines3'

const App: React.FunctionComponent = () => {
  const [raw, setRaw] = useState('')
  const [decoder, setDecoder] = useState<Decoders>('')
  const [region, setRegion] = useState<IRegion>()
  const [bank, setBank] = useState('')

  const accounts = Decoder(raw, decoder)
  const payload = GeneratePayload(accounts || [], region, bank)
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
          <select value={decoder} onChange={(e) => setDecoder(e.target.value as any)}>
            <option value="">Selecione um decodificador</option>
            <option value="espaco">Dividido por espaço</option>
            <option value="chines1">Chinês 1</option>
            <option value="chines2">Chinês 2</option>
            <option value="chines3">Chinês 3</option>
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
          value={payload}
        />
        <button id="copy" onClick={() => {
          if (payload.length > 0) {
            navigator.clipboard.writeText(payload)
          }
        }}>Copiar</button>
      </div>
    </SplitPane>
  )
}

export default App