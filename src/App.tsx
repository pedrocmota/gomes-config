import React, {useState} from 'react'
import SplitPane from 'react-split-pane'
import {ProcessRaw, processData} from './process'

const App: React.FunctionComponent = () => {
  const [raw, setRaw] = useState('')
  const [china, setChina] = useState('0')
  const [server, setServer] = useState('')
  const [region, setRegion] = useState('')
  const [bank, setBank] = useState('')

  const processed = ProcessRaw(raw, china)
  const str = processData(processed || [], server, region, bank)
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
            <option value="2">Chinês 1</option>
            <option value="3">Chinês 2</option>
          </select>
          <select value={server} onChange={(e) => setServer(e.target.value)}>
            <option value="">Selecione um servidor</option>
            <option value="Adrinne">Adrinne</option>
            <option value="Agaton">Agaton</option>
            <option value="Akkan">Akkan</option>
            <option value="Aldebaran">Aldebaran</option>
            <option value="Antares">Antares</option>
            <option value="Arcturus">Arcturus</option>
            <option value="Asta">Asta</option>
            <option value="Avesta">Avesta</option>
            <option value="Azena">Azena</option>
            <option value="Beatrice">Beatrice</option>
            <option value="Bergstrom">Bergstrom</option>
            <option value="Brelshaza">Brelshaza</option>
            <option value="Calvasus">Calvasus</option>
            <option value="Danube">Danube</option>
            <option value="Elzowin">Elzowin</option>
            <option value="Enviska">Enviska</option>
            <option value="Feiton">Feiton</option>
            <option value="Galatur">Galatur</option>
            <option value="Gienah">Gienah</option>
            <option value="Inanna">Inanna</option>
            <option value="Kadan">Kadan</option>
            <option value="Karta">Karta</option>
            <option value="Kazeros">Kazeros</option>
            <option value="Kharmine">Kharmine</option>
            <option value="Kurzan">Kurzan</option>
            <option value="Ladon">Ladon</option>
            <option value="Mari">Mari</option>
            <option value="Mokoko">Mokoko</option>
            <option value="Moonkeep">Moonkeep</option>
            <option value="Neria">Neria</option>
            <option value="Nineveh">Nineveh</option>
            <option value="Petrania">Petrania</option>
            <option value="Prideholme">Prideholme</option>
            <option value="Procyon">Procyon</option>
            <option value="Punika">Punika</option>
            <option value="Regulus">Regulus</option>
            <option value="Rethramis">Rethramis</option>
            <option value="Rohendel">Rohendel</option>
            <option value="Sasha">Sasha</option>
            <option value="Sceptrum">Sceptrum</option>
            <option value="Shadespire">Shadespire</option>
            <option value="Shandi">Shandi</option>
            <option value="Sirius">Sirius</option>
            <option value="Slen">Slen</option>
            <option value="Stonehearth">Stonehearth</option>
            <option value="Thaemine">Thaemine</option>
            <option value="Thirain">Thirain</option>
            <option value="Tortoyk">Tortoyk</option>
            <option value="Tragon">Tragon</option>
            <option value="Trixion">Trixion</option>
            <option value="Una">Una</option>
            <option value="Valtan">Valtan</option>
            <option value="Vern">Vern</option>
            <option value="Vykas">Vykas</option>
            <option value="Wei">Wei</option>
            <option value="Yorn">Yorn</option>
            <option value="Zinnervale">Zinnervale</option>
            <option value="Zosma">Zosma</option>
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Selecione uma região</option>
            <option value="0">EUROPE WEST</option>
            <option value="1">EUROPE CENTER</option>
            <option value="2">AMERICA WEST</option>
            <option value="3">AMERICA EAST</option>
            <option value="4">SOUTH AMERICA</option>
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
          navigator.clipboard.writeText(str)
        }}>Copiar</button>
      </div>
    </SplitPane>
  )
}

export default App