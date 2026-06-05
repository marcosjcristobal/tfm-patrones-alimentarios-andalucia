import React from 'react'
import { createRoot } from 'react-dom/client'
import { BarChart3, ExternalLink, Database, MapPinned, Layers, Table2 } from 'lucide-react'
import Plot from './components/Plot.jsx'
import { LoadingCard, ErrorCard } from './components/DataState.jsx'
import { loadCsv, parseNumber, getNumericColumns } from './utils/csv.js'
import './styles.css'

const DATA = {
  consumoAlto: './data/consumo_alto_12_grupos_2016.csv',
  distribucionPatrones: './data/distribucion_patrones.csv',
  heatmapPatrones: './data/heatmap_patrones.csv',
  sociales: './data/patrones_variables_sociales.csv',
  modelos: './data/modelos_poisson_memoria.csv',
}

function useCsv(path) {
  const [state, setState] = React.useState({ loading: true, data: null, error: null })

  React.useEffect(() => {
    let mounted = true

    loadCsv(path)
      .then((data) => mounted && setState({ loading: false, data, error: null }))
      .catch((error) => mounted && setState({ loading: false, data: null, error }))

    return () => {
      mounted = false
    }
  }, [path])

  return state
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </div>
  )
}

function MetricCard({ label, value, detail }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  )
}

function Home() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <p className="eyebrow">TFM · Encuesta Andaluza de Salud 2016</p>
        <h1>Patrones alimentarios y desigualdades socioeconómicas en Andalucía</h1>
        <p>
          Web interactiva para explorar los patrones alimentarios identificados mediante KMeans,
          su distribución social y los modelos de asociación estimados mediante Poisson robusto.
        </p>
        <div className="hero-actions">
          <a href="#patrones" className="button primary">Explorar patrones</a>
          <a href="#modelos" className="button secondary">Ver modelos</a>
        </div>
      </div>

      <div className="hero-panel">
        <MetricCard label="Muestra analítica" value="6.353" detail="personas adultas" />
        <MetricCard label="Grupos alimentarios" value="12" detail="frecuencia bajo/intermedio/alto" />
        <MetricCard label="Patrones finales" value="3" detail="KMeans ponderado" />
      </div>
    </section>
  )
}

function Patrones() {
  const distribucion = useCsv(DATA.distribucionPatrones)
  const heatmap = useCsv(DATA.heatmapPatrones)

  if (distribucion.loading || heatmap.loading) return <LoadingCard />
  if (distribucion.error) return <ErrorCard error={distribucion.error} />
  if (heatmap.error) return <ErrorCard error={heatmap.error} />

  const rows = distribucion.data
  const columns = rows.length ? Object.keys(rows[0]) : []

  const labelCol =
    columns.find((c) => c.toLowerCase().includes('patron')) ||
    columns[0]

  const valueCol =
    columns.find((c) => c.toLowerCase().includes('porcentaje')) ||
    columns.find((c) => c.toLowerCase().includes('pct')) ||
    columns.find((c) => c.toLowerCase().includes('ponderado')) ||
    columns[1]

  const barData = [{
    type: 'bar',
    x: rows.map((r) => r[labelCol]),
    y: rows.map((r) => parseNumber(r[valueCol])),
    text: rows.map((r) => `${parseNumber(r[valueCol])?.toFixed(1)}%`),
    textposition: 'auto',
    hovertemplate: '%{x}<br>%{y:.1f}%<extra></extra>',
  }]

  const heatRows = heatmap.data
  const heatColumns = heatRows.length ? Object.keys(heatRows[0]) : []
  const heatLabelCol =
    heatColumns.find((c) => c.toLowerCase().includes('patron')) ||
    heatColumns[0]

  const numericCols = getNumericColumns(heatRows, [heatLabelCol])

  const heatData = [{
    type: 'heatmap',
    x: numericCols,
    y: heatRows.map((r) => r[heatLabelCol]),
    z: heatRows.map((r) => numericCols.map((c) => parseNumber(r[c]))),
    hovertemplate: '%{y}<br>%{x}: %{z:.1f}%<extra></extra>',
    colorbar: { title: '% consumo alto' },
  }]

  return (
    <section id="patrones">
      <SectionHeader eyebrow="Resultados" title="Patrones alimentarios">
        Tres patrones finales identificados en la población adulta andaluza a partir de doce grupos alimentarios.
      </SectionHeader>

      <div className="grid two">
        <article className="card">
          <h3>Distribución de patrones</h3>
          <Plot data={barData} layout={{ yaxis: { title: '% ponderado' } }} />
        </article>

        <article className="card">
          <h3>Caracterización por consumo alto</h3>
          <Plot data={heatData} layout={{ xaxis: { tickangle: -35 } }} />
        </article>
      </div>

      <div className="pattern-cards">
        <article className="card">
          <h3>Patrón equilibrado con tendencia saludable</h3>
          <p>Mayor peso relativo de grupos favorables y menor presencia de comida rápida, dulces, bebidas azucaradas y embutidos/fiambres.</p>
        </article>
        <article className="card">
          <h3>Patrón mixto</h3>
          <p>Combina grupos favorables como fruta, verduras, legumbres, pescado y carne con presencia elevada de embutidos/fiambres.</p>
        </article>
        <article className="card">
          <h3>Patrón con tendencia poco saludable</h3>
          <p>Mayor presencia relativa de dulces, bebidas azucaradas, comida rápida, carne y embutidos/fiambres.</p>
        </article>
      </div>
    </section>
  )
}

function Social() {
  const { loading, data, error } = useCsv(DATA.sociales)
  const [variable, setVariable] = React.useState('')

  React.useEffect(() => {
    if (data?.length && !variable) {
      const first = data[0].variable_lbl || data[0].variable || ''
      setVariable(first)
    }
  }, [data, variable])

  if (loading) return <LoadingCard />
  if (error) return <ErrorCard error={error} />

  const columns = Object.keys(data[0] || {})
  const variableCol = columns.includes('variable_lbl') ? 'variable_lbl' : 'variable'
  const categoryCol = columns.includes('categoria') ? 'categoria' : 'categoría'

  const variables = [...new Set(data.map((r) => r[variableCol]).filter(Boolean))]
  const filtered = data.filter((r) => r[variableCol] === variable)

  const exclude = [variableCol, categoryCol, 'n_total', 'peso_total']
  const patternCols = getNumericColumns(filtered, exclude)

  const traces = patternCols.map((pattern) => ({
    type: 'bar',
    name: pattern,
    x: filtered.map((r) => r[categoryCol]),
    y: filtered.map((r) => parseNumber(r[pattern])),
    hovertemplate: `${pattern}<br>%{x}: %{y:.1f}%<extra></extra>`,
  }))

  return (
    <section id="social">
      <SectionHeader eyebrow="Desigualdades" title="Distribución social y territorial">
        Explora la distribución ponderada de los tres patrones según sexo, educación, situación económica, ocupación y provincia.
      </SectionHeader>

      <div className="toolbar">
        <label>
          Variable
          <select value={variable} onChange={(e) => setVariable(e.target.value)}>
            {variables.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <article className="card">
        <Plot
          data={traces}
          layout={{
            barmode: 'stack',
            yaxis: { title: '% ponderado' },
            xaxis: { tickangle: -30 },
            legend: { orientation: 'h' },
          }}
        />
      </article>
    </section>
  )
}

function Modelos() {
  const { loading, data, error } = useCsv(DATA.modelos)
  const [comparacion, setComparacion] = React.useState('')

  React.useEffect(() => {
    if (data?.length && !comparacion) {
      const first = data[0].comparacion_corta || data[0].comparacion || ''
      setComparacion(first)
    }
  }, [data, comparacion])

  if (loading) return <LoadingCard />
  if (error) return <ErrorCard error={error} />

  const comparisonCol = data[0]?.comparacion_corta !== undefined ? 'comparacion_corta' : 'comparacion'
  const comparisons = [...new Set(data.map((r) => r[comparisonCol]).filter(Boolean))]
  const filtered = data.filter((r) => r[comparisonCol] === comparacion)

  return (
    <section id="modelos">
      <SectionHeader eyebrow="Modelos" title="Poisson robusto y razones de prevalencia">
        Modelos independientes por dimensión socioeconómica, ajustados por sexo y con pesos muestrales normalizados.
      </SectionHeader>

      <div className="toolbar">
        <label>
          Comparación
          <select value={comparacion} onChange={(e) => setComparacion(e.target.value)}>
            {comparisons.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Categoría</th>
              <th>RP</th>
              <th>IC95 %</th>
              <th>p</th>
              <th>n</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, index) => (
              <tr key={index}>
                <td>{row.modelo || row.modelo_corto}</td>
                <td>{row.categoria}</td>
                <td>{row.RP_fmt || row.RP}</td>
                <td>{row.IC95_fmt || `${row.IC95_inf}–${row.IC95_sup}`}</td>
                <td>{row.p_fmt || row.p}</td>
                <td>{row.n_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Metodologia() {
  return (
    <section id="metodologia">
      <SectionHeader eyebrow="Método" title="Diseño analítico">
        El flujo combina preparación de microdatos, recodificación alimentaria, PCA exploratorio, KMeans y modelos de asociación.
      </SectionHeader>

      <div className="grid three">
        <article className="card icon-card">
          <BarChart3 />
          <h3>12 grupos alimentarios</h3>
          <p>Variables de frecuencia declarada de consumo recodificadas en niveles bajo, intermedio y alto.</p>
        </article>
        <article className="card icon-card">
          <SlidersHorizontal />
          <h3>KMeans ponderado</h3>
          <p>Identificación de tres patrones alimentarios interpretables sobre la matriz alimentaria de 2016.</p>
        </article>
        <article className="card icon-card">
          <Table2 />
          <h3>Poisson robusto</h3>
          <p>Estimación de razones de prevalencia por dimensión socioeconómica, con ajuste por sexo.</p>
        </article>
      </div>

      <article className="card">
        <h3>PCA como apoyo exploratorio</h3>
        <img className="figure" src="./figures/pca_pc1_pc2_12_grupos_2016.png" alt="Círculo de correlaciones PCA PC1-PC2" />
      </article>
    </section>
  )
}

function App() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio">
          <Map size={22} />
          <span>TFM Alimentación Andalucía</span>
        </a>
        <nav>
          <a href="#patrones">Patrones</a>
          <a href="#social">Distribución social</a>
          <a href="#modelos">Modelos</a>
          <a href="#metodologia">Metodología</a>
        </nav>
        <a className="ExternalLink-link" href="#" aria-label="Repositorio">
          <ExternalLink size={18} />
        </a>
      </header>

      <main>
        <Home />
        <Patrones />
        <Social />
        <Modelos />
        <Metodologia />
      </main>

      <footer>
        <p>Trabajo Final de Máster · Visualización estática para ExternalLink Pages.</p>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
