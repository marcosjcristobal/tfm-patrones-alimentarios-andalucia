import Papa from 'papaparse'

export async function loadCsv(path) {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}`)
  }

  const text = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    })
  })
}

export function parseNumber(value) {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'number') return value

  const normalized = String(value)
    .replace('%', '')
    .replace(',', '.')
    .trim()

  const number = Number(normalized)
  return Number.isFinite(number) ? number : null
}

export function getNumericColumns(rows, excluded = []) {
  if (!rows?.length) return []
  const columns = Object.keys(rows[0])
  return columns.filter((column) => {
    if (excluded.includes(column)) return false
    return rows.some((row) => parseNumber(row[column]) !== null)
  })
}
