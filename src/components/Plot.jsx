import { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

export default function Plot({ data, layout, config }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    Plotly.react(
      ref.current,
      data,
      {
        autosize: true,
        margin: { l: 50, r: 30, t: 40, b: 70 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        ...layout,
      },
      {
        responsive: true,
        displayModeBar: false,
        ...config,
      }
    )

    return () => {
      Plotly.purge(ref.current)
    }
  }, [data, layout, config])

  return <div ref={ref} className="plot" />
}
