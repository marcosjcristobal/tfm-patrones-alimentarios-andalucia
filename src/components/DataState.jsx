export function LoadingCard({ text = 'Cargando datos...' }) {
  return <div className="card muted">{text}</div>
}

export function ErrorCard({ title = 'No se pudo cargar esta sección', error }) {
  return (
    <div className="card error-card">
      <h3>{title}</h3>
      <p>{String(error?.message || error)}</p>
    </div>
  )
}
