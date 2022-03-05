import React, {useState} from 'react'
import SplitPane from 'react-split-pane'
import {Decoder, GeneratePayload} from './Decoders'
import Regions from './Regions.json'

export interface IRegion {
  code: number,
  regionName: string,
  server: string
}

export type Decoders = '' | 'espaco' | 'hifen' | 'chines1' | 'chines2' | 'chines3' | 'chines4'
export type Formats = '' | 'config' | 'json'

const App: React.FunctionComponent = () => {
  const [raw, setRaw] = useState('')
  const [decoder, setDecoder] = useState<Decoders>('')
  const [region, setRegion] = useState<IRegion>()
  const [format, setFormat] = useState<Formats>('')
  const [bank, setBank] = useState('')

  const accounts = Decoder(raw, decoder)
  const payload = GeneratePayload(accounts || [], region, bank, format)
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
            <option value="hifen">Dividido por hífen</option>
            <option value="chines1">Chinês 1</option>
            <option value="chines2">Chinês 2</option>
            <option value="chines3">Chinês 3</option>
            <option value="chines4">Chinês 4</option>
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
          <select value={format} onChange={(e) => setFormat(e.target.value as any)}>
            <option value="">Selecione um formato</option>
            <option value="config">Config (padrão do bot)</option>
            <option value="json">JSON</option>
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