(() => {
  "use strict";

  const paths = {
    patternDistribution: "data/distribucion_patrones.csv",
    highConsumption: "data/caracterizacion_consumo_alto_patron.csv",
    socialDistribution: "data/distribucion_patrones_sociales.csv",
    poissonModels: "data/29_02_modelos_poisson_independientes_posicion_social_12_grupos_2016_memoria.csv"
  };

  const patternLabels = {
    balanced: "Patrón equilibrado con tendencia saludable",
    mixed: "Patrón mixto",
    unhealthy: "Patrón con tendencia poco saludable"
  };

  const patternColors = {
    balanced: "#2d8c83",
    mixed: "#df8f1d",
    unhealthy: "#dd5f51"
  };

  const fallbackData = {
    patternDistribution: [
      { pattern: patternLabels.balanced, value: 32.6, key: "balanced" },
      { pattern: patternLabels.mixed, value: 27.3, key: "mixed" },
      { pattern: patternLabels.unhealthy, value: 40.0, key: "unhealthy" }
    ],

    highConsumption: [
      { group: "Cereales", balanced: 52, mixed: 58, unhealthy: 49 },
      { group: "Lácteos", balanced: 47, mixed: 50, unhealthy: 43 },
      { group: "Huevos", balanced: 28, mixed: 36, unhealthy: 33 },
      { group: "Comida rápida", balanced: 9, mixed: 18, unhealthy: 31 },
      { group: "Dulces", balanced: 18, mixed: 26, unhealthy: 42 },
      { group: "Fruta", balanced: 74, mixed: 70, unhealthy: 48 },
      { group: "Verduras", balanced: 68, mixed: 66, unhealthy: 44 },
      { group: "Legumbres", balanced: 42, mixed: 56, unhealthy: 39 },
      { group: "Pescado", balanced: 45, mixed: 53, unhealthy: 36 },
      { group: "Bebidas azucaradas", balanced: 11, mixed: 20, unhealthy: 37 },
      { group: "Carne", balanced: 38, mixed: 55, unhealthy: 58 },
      { group: "Embutidos/fiambres", balanced: 19, mixed: 48, unhealthy: 57 }
    ],

    socialDistribution: [
      { variable: "sexo", category: "Hombres", balanced: 31.5, mixed: 27.0, unhealthy: 41.5 },
      { variable: "sexo", category: "Mujeres", balanced: 33.6, mixed: 27.6, unhealthy: 38.8 },

      { variable: "educacion", category: "Universitario", balanced: 34.4, mixed: 26.6, unhealthy: 39.0 },
      { variable: "educacion", category: "Medio", balanced: 31.2, mixed: 27.8, unhealthy: 41.0 },
      { variable: "educacion", category: "Bajo", balanced: 33.1, mixed: 27.2, unhealthy: 39.7 },

      { variable: "economia", category: "Facilidad", balanced: 35.8, mixed: 25.2, unhealthy: 39.0 },
      { variable: "economia", category: "Alguna facilidad", balanced: 31.9, mixed: 28.4, unhealthy: 39.7 },
      { variable: "economia", category: "Alguna dificultad", balanced: 30.6, mixed: 27.7, unhealthy: 41.7 },
      { variable: "economia", category: "Dificultad", balanced: 28.7, mixed: 29.6, unhealthy: 41.7 },

      { variable: "ocupacion", category: "Alta/profesional-directiva", balanced: 36.5, mixed: 24.2, unhealthy: 39.3 },
      { variable: "ocupacion", category: "Intermedia/no manual y servicios", balanced: 30.8, mixed: 27.9, unhealthy: 41.3 },
      { variable: "ocupacion", category: "Manual/agraria/elemental", balanced: 31.5, mixed: 27.1, unhealthy: 41.4 },

      { variable: "provincia", category: "Almería", balanced: 31.8, mixed: 28.2, unhealthy: 40.0 },
      { variable: "provincia", category: "Cádiz", balanced: 28.4, mixed: 27.0, unhealthy: 44.6 },
      { variable: "provincia", category: "Córdoba", balanced: 32.0, mixed: 27.6, unhealthy: 40.4 },
      { variable: "provincia", category: "Granada", balanced: 35.0, mixed: 27.1, unhealthy: 37.9 },
      { variable: "provincia", category: "Huelva", balanced: 31.4, mixed: 27.7, unhealthy: 40.9 },
      { variable: "provincia", category: "Jaén", balanced: 36.2, mixed: 26.6, unhealthy: 37.2 },
      { variable: "provincia", category: "Málaga", balanced: 32.3, mixed: 27.5, unhealthy: 40.2 },
      { variable: "provincia", category: "Sevilla", balanced: 29.8, mixed: 27.1, unhealthy: 43.1 }
    ],

    poissonModels: [
      { comparison: "mixto", model: "educacion", category: "Medio", reference: "Universitario", rp: 1.04, lower: 0.90, upper: 1.20, p: 0.589 },
      { comparison: "mixto", model: "educacion", category: "Bajo", reference: "Universitario", rp: 1.03, lower: 0.91, upper: 1.16, p: 0.682 },

      { comparison: "mixto", model: "ocupacion", category: "Intermedia/no manual y servicios", reference: "Alta/profesional-directiva", rp: 1.14, lower: 1.00, upper: 1.30, p: 0.046 },
      { comparison: "mixto", model: "ocupacion", category: "Manual/agraria/elemental", reference: "Alta/profesional-directiva", rp: 1.10, lower: 0.97, upper: 1.24, p: 0.136 },

      { comparison: "mixto", model: "economia", category: "Alguna facilidad", reference: "Facilidad", rp: 1.15, lower: 1.02, upper: 1.30, p: 0.028 },
      { comparison: "mixto", model: "economia", category: "Alguna dificultad", reference: "Facilidad", rp: 1.08, lower: 0.96, upper: 1.22, p: 0.197 },
      { comparison: "mixto", model: "economia", category: "Dificultad", reference: "Facilidad", rp: 1.26, lower: 1.13, upper: 1.42, p: 0.0005 },

      { comparison: "poco_saludable", model: "educacion", category: "Medio", reference: "Universitario", rp: 1.13, lower: 1.02, upper: 1.25, p: 0.022 },
      { comparison: "poco_saludable", model: "educacion", category: "Bajo", reference: "Universitario", rp: 1.00, lower: 0.91, upper: 1.10, p: 0.970 },

      { comparison: "poco_saludable", model: "ocupacion", category: "Intermedia/no manual y servicios", reference: "Alta/profesional-directiva", rp: 1.27, lower: 1.14, upper: 1.42, p: 0.0005 },
      { comparison: "poco_saludable", model: "ocupacion", category: "Manual/agraria/elemental", reference: "Alta/profesional-directiva", rp: 1.17, lower: 1.05, upper: 1.30, p: 0.003 },

      { comparison: "poco_saludable", model: "economia", category: "Alguna facilidad", reference: "Facilidad", rp: 1.19, lower: 1.08, upper: 1.31, p: 0.0005 },
      { comparison: "poco_saludable", model: "economia", category: "Alguna dificultad", reference: "Facilidad", rp: 1.15, lower: 1.05, upper: 1.27, p: 0.003 },
      { comparison: "poco_saludable", model: "economia", category: "Dificultad", reference: "Facilidad", rp: 1.25, lower: 1.14, upper: 1.36, p: 0.0005 }
    ]
  };

  const state = {
    sources: {
      patternDistribution: "fallback",
      highConsumption: "fallback",
      socialDistribution: "fallback",
      poissonModels: "fallback"
    },
    data: renderFallbackData(),
    errors: []
  };

  function renderFallbackData() {
    return JSON.parse(JSON.stringify(fallbackData));
  }

  function showError(message) {
    state.errors.push(message);
    console.warn(message);
    updateStatusBox();
  }

  function normaliseHeader(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function toNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;

    const cleaned = String(value)
      .trim()
      .replace("%", "")
      .replace(",", ".");

    const parsed = Number.parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function firstValue(row, candidates) {
    for (const candidate of candidates) {
      if (row[candidate] !== undefined && row[candidate] !== null && row[candidate] !== "") {
        return row[candidate];
      }
    }

    return "";
  }

  function normaliseRows(rows) {
    return rows.map((row) => {
      const nextRow = {};

      Object.entries(row).forEach(([key, value]) => {
        nextRow[normaliseHeader(key)] = typeof value === "string" ? value.trim() : value;
      });

      return nextRow;
    });
  }

  async function loadCSV(path) {
    try {
      const response = await fetch(path, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`No se ha encontrado el archivo ${path}`);
      }

      const rawText = await response.text();

      const parsed = Papa.parse(rawText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false
      });

      if (parsed.errors.length > 0) {
        console.warn(`Advertencias al parsear ${path}:`, parsed.errors);
      }

      console.info(`Archivo cargado correctamente: ${path}`);

      return normaliseRows(parsed.data);
    } catch (error) {
      showError(error.message || `No se ha encontrado el archivo ${path}`);
      return null;
    }
  }

  function setBadge(elementId, sourceType) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const usesFallback = sourceType !== "csv";

    element.textContent = usesFallback ? "Datos de ejemplo" : "CSV real";
    element.classList.toggle("warning", usesFallback);
  }

  function updateStatusBox() {
    const element = document.getElementById("data-status");
    if (!element) return;

    const loadedCount = Object.values(state.sources).filter((source) => source === "csv").length;
    const totalCount = Object.keys(state.sources).length;

    if (state.errors.length === 0 && loadedCount === totalCount) {
      element.innerHTML = `<strong>Datos cargados:</strong> ${loadedCount}/${totalCount} archivos CSV reales.`;
      return;
    }

    if (state.errors.length === 0) {
      element.innerHTML = "Cargando archivos de datos disponibles…";
      return;
    }

    const uniqueErrors = [...new Set(state.errors)];

    element.innerHTML = `
      <strong>Estado de datos:</strong> ${loadedCount}/${totalCount} archivos CSV reales cargados.
      La web continúa con datos de ejemplo cuando falta algún archivo.<br>
      <span>${uniqueErrors.join(" · ")}</span>
    `;
  }

  function detectPatternKey(label) {
    const normalised = normaliseHeader(label);

    if (normalised.includes("equilibrado") || (normalised.includes("saludable") && !normalised.includes("poco"))) {
      return "balanced";
    }

    if (normalised.includes("mixto") || normalised.includes("tradicional")) {
      return "mixed";
    }

    if (normalised.includes("poco") || normalised.includes("unhealthy")) {
      return "unhealthy";
    }

    return "mixed";
  }

  function transformPatternDistribution(rows) {
    if (!rows || rows.length === 0) return null;

    const transformed = rows.map((row) => {
      const label = firstValue(row, ["patron", "pattern", "cluster", "grupo", "categoria"]);
      const value = toNumber(firstValue(row, ["porcentaje", "pct", "percent", "value", "valor", "n_pct"]));

      if (!label || value === null) return null;

      const key = detectPatternKey(label);

      return {
        pattern: patternLabels[key],
        value,
        key
      };
    }).filter(Boolean);

    return transformed.length ? transformed : null;
  }

  function transformHighConsumption(rows) {
    if (!rows || rows.length === 0) return null;

    const longRows = rows.map((row) => {
      const group = firstValue(row, ["grupo_alimentario", "grupo", "group", "alimento", "food_group"]);
      const pattern = firstValue(row, ["patron", "pattern", "cluster"]);
      const value = toNumber(firstValue(row, ["porcentaje", "pct", "percent", "consumo_alto", "valor", "value"]));

      if (!group || !pattern || value === null) return null;

      return {
        group,
        patternKey: detectPatternKey(pattern),
        value
      };
    }).filter(Boolean);

    if (longRows.length > 0) {
      const groups = [...new Set(longRows.map((row) => row.group))];

      return groups.map((group) => {
        const nextRow = { group };

        longRows.filter((row) => row.group === group).forEach((row) => {
          nextRow[row.patternKey] = row.value;
        });

        return nextRow;
      });
    }

    const wideRows = rows.map((row) => {
      const group = firstValue(row, ["grupo_alimentario", "grupo", "group", "alimento", "food_group"]);

      if (!group) return null;

      return {
        group,
        balanced: toNumber(firstValue(row, ["equilibrado", "patron_equilibrado", "equilibrado_tendencia_saludable", "balanced"])) ?? 0,
        mixed: toNumber(firstValue(row, ["mixto", "patron_mixto", "mixed", "tradicional", "patron_tradicional"])) ?? 0,
        unhealthy: toNumber(firstValue(row, ["poco_saludable", "patron_poco_saludable", "tendencia_poco_saludable", "unhealthy"])) ?? 0
      };
    }).filter(Boolean);

    return wideRows.length ? wideRows : null;
  }

  function transformSocialDistribution(rows) {
    if (!rows || rows.length === 0) return null;

    const longRows = rows.map((row) => {
      const variable = normaliseHeader(firstValue(row, ["variable", "dimension", "var", "bloque"]));
      const category = firstValue(row, ["categoria", "category", "nivel", "grupo", "label"]);
      const pattern = firstValue(row, ["patron", "pattern", "cluster"]);
      const value = toNumber(firstValue(row, ["porcentaje", "pct", "percent", "valor", "value"]));

      if (!variable || !category || !pattern || value === null) return null;

      return {
        variable: mapSocialVariable(variable),
        category,
        patternKey: detectPatternKey(pattern),
        value
      };
    }).filter(Boolean);

    if (longRows.length > 0) {
      const pairs = [...new Set(longRows.map((row) => `${row.variable}||${row.category}`))];

      return pairs.map((pair) => {
        const [variable, category] = pair.split("||");
        const nextRow = { variable, category };

        longRows.filter((row) => row.variable === variable && row.category === category).forEach((row) => {
          nextRow[row.patternKey] = row.value;
        });

        return nextRow;
      });
    }

    const wideRows = rows.map((row) => {
      const variable = mapSocialVariable(normaliseHeader(firstValue(row, ["variable", "dimension", "var", "bloque"])));
      const category = firstValue(row, ["categoria", "category", "nivel", "grupo", "label"]);

      if (!variable || !category) return null;

      return {
        variable,
        category,
        balanced: toNumber(firstValue(row, ["equilibrado", "patron_equilibrado", "equilibrado_tendencia_saludable", "balanced"])) ?? 0,
        mixed: toNumber(firstValue(row, ["mixto", "patron_mixto", "mixed", "tradicional", "patron_tradicional"])) ?? 0,
        unhealthy: toNumber(firstValue(row, ["poco_saludable", "patron_poco_saludable", "tendencia_poco_saludable", "unhealthy"])) ?? 0
      };
    }).filter(Boolean);

    return wideRows.length ? wideRows : null;
  }

  function mapSocialVariable(value) {
    const normalised = normaliseHeader(value);

    if (normalised.includes("sexo")) return "sexo";
    if (normalised.includes("educ")) return "educacion";
    if (normalised.includes("econom") || normalised.includes("ingreso") || normalised.includes("hogar")) return "economia";
    if (normalised.includes("ocup") || normalised.includes("manual") || normalised.includes("profesional")) return "ocupacion";
    if (normalised.includes("prov")) return "provincia";

    return normalised;
  }

  function transformPoissonModels(rows) {
    if (!rows || rows.length === 0) return null;

    const transformed = rows.map((row) => {
      const comparisonRaw = firstValue(row, ["comparacion", "comparison", "contraste", "outcome", "patron"]);
      const modelRaw = firstValue(row, ["modelo", "model", "dimension", "variable"]);
      const category = firstValue(row, ["categoria", "category", "nivel", "termino", "term"]);
      const reference = firstValue(row, ["referencia", "reference", "ref", "categoria_referencia"]);
      const rp = toNumber(firstValue(row, ["rp", "razon_prevalencia", "prevalence_ratio", "estimate", "estimacion"]));
      const lower = toNumber(firstValue(row, ["ic95_inf", "ic_inf", "lower", "lcl", "ci_low", "li"]));
      const upper = toNumber(firstValue(row, ["ic95_sup", "ic_sup", "upper", "ucl", "ci_high", "ls"]));
      const p = toNumber(firstValue(row, ["p", "p_value", "pvalor", "valor_p"]));

      if (!category || rp === null) return null;

      return {
        comparison: mapComparison(comparisonRaw),
        model: mapModel(modelRaw),
        category,
        reference: reference || "Categoría de referencia",
        rp,
        lower,
        upper,
        p
      };
    }).filter(Boolean);

    return transformed.length ? transformed : null;
  }

  function mapComparison(value) {
    const normalised = normaliseHeader(value);

    if (normalised.includes("mixto") || normalised.includes("tradicional")) {
      return "mixto";
    }

    if (normalised.includes("poco")) {
      return "poco_saludable";
    }

    return "mixto";
  }

  function mapModel(value) {
    const normalised = normaliseHeader(value);

    if (normalised.includes("educ")) return "educacion";
    if (normalised.includes("ocup")) return "ocupacion";
    if (normalised.includes("econom") || normalised.includes("ingreso") || normalised.includes("hogar")) return "economia";

    return normalised || "educacion";
  }

  async function loadAvailableData() {
    updateStatusBox();

    const [patternRows, heatmapRows, socialRows, modelRows] = await Promise.all([
      loadCSV(paths.patternDistribution),
      loadCSV(paths.highConsumption),
      loadCSV(paths.socialDistribution),
      loadCSV(paths.poissonModels)
    ]);

    const patternData = transformPatternDistribution(patternRows);
    if (patternData) {
      state.data.patternDistribution = patternData;
      state.sources.patternDistribution = "csv";
    }

    const highConsumptionData = transformHighConsumption(heatmapRows);
    if (highConsumptionData) {
      state.data.highConsumption = highConsumptionData;
      state.sources.highConsumption = "csv";
    }

    const socialData = transformSocialDistribution(socialRows);
    if (socialData) {
      state.data.socialDistribution = socialData;
      state.sources.socialDistribution = "csv";
    }

    const modelData = transformPoissonModels(modelRows);
    if (modelData) {
      state.data.poissonModels = modelData;
      state.sources.poissonModels = "csv";
    }

    setBadge("pattern-source-badge", state.sources.patternDistribution);
    setBadge("heatmap-source-badge", state.sources.highConsumption);
    setBadge("social-source-badge", state.sources.socialDistribution);
    setBadge("model-source-badge", state.sources.poissonModels);

    updateStatusBox();
  }

  function basePlotLayout(extra = {}) {
    return {
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: {
        family: "Inter, system-ui, sans-serif",
        color: "#172321"
      },
      margin: {
        t: 22,
        r: 18,
        b: 48,
        l: 86
      },
      hoverlabel: {
        bgcolor: "#ffffff",
        bordercolor: "#dce8e4",
        font: {
          color: "#172321"
        }
      },
      ...extra
    };
  }

  const plotConfig = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false
  };

  function renderPatternCards() {
    const data = state.data.patternDistribution;

    data.forEach((row) => {
      const element = document.querySelector(`[data-pattern-percent="${row.key}"]`);

      if (!element) return;

      element.textContent = `${formatDecimal(row.value)} %`;
    });
  }

  function renderPatternDistribution() {
    const elementId = "pattern-distribution-chart";
    if (!document.getElementById(elementId)) return;

    const data = state.data.patternDistribution;
    const labels = data.map((row) => row.pattern);
    const values = data.map((row) => row.value);
    const colors = data.map((row) => patternColors[row.key] || patternColors.mixed);

    Plotly.newPlot(elementId, [{
      type: "bar",
      orientation: "h",
      y: labels,
      x: values,
      marker: {
        color: colors,
        line: {
          color: "rgba(255,255,255,0.85)",
          width: 1
        }
      },
      text: values.map((value) => `${formatDecimal(value)} %`),
      textposition: "auto",
      hovertemplate: "%{y}<br><b>%{x:.1f} %</b><extra></extra>"
    }], basePlotLayout({
      xaxis: {
        title: "Porcentaje",
        ticksuffix: " %",
        range: [0, 50],
        gridcolor: "#e8efec"
      },
      yaxis: {
        automargin: true
      },
      margin: {
        t: 14,
        r: 20,
        b: 48,
        l: 210
      }
    }), plotConfig);
  }

  function renderHighConsumptionHeatmap() {
    const elementId = "high-consumption-heatmap";
    if (!document.getElementById(elementId)) return;

    const data = state.data.highConsumption;
    const groups = data.map((row) => row.group);
    const columns = ["balanced", "mixed", "unhealthy"];
    const zValues = columns.map((key) => data.map((row) => toNumber(row[key]) ?? 0));

    Plotly.newPlot(elementId, [{
      type: "heatmap",
      x: groups,
      y: columns.map((key) => patternLabels[key]),
      z: zValues,
      colorscale: [
        [0, "#f6fbf9"],
        [0.35, "#cde5df"],
        [0.70, "#68aaa2"],
        [1, "#145d58"]
      ],
      colorbar: {
        title: "% alto"
      },
      hovertemplate: "%{y}<br>%{x}: <b>%{z:.1f} %</b><extra></extra>"
    }], basePlotLayout({
      margin: {
        t: 18,
        r: 18,
        b: 130,
        l: 230
      },
      xaxis: {
        tickangle: -35,
        automargin: true
      },
      yaxis: {
        automargin: true
      }
    }), plotConfig);
  }

  function orderSocialRows(variable, rows) {
    const orders = {
      sexo: ["Hombre", "Hombres", "Mujer", "Mujeres"],
      educacion: ["Universitario", "Medio", "Bajo"],
      economia: ["Facilidad", "Alguna facilidad", "Alguna dificultad", "Dificultad"],
      ocupacion: [
        "Alta/profesional-directiva",
        "Intermedia/no manual y servicios",
        "Manual/agraria/elemental"
      ],
      provincia: ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"]
    };

    const order = orders[variable];

    if (!order) return rows;

    return rows.slice().sort((a, b) => {
      const indexA = order.indexOf(a.category);
      const indexB = order.indexOf(b.category);

      if (indexA === -1 && indexB === -1) {
        return String(a.category).localeCompare(String(b.category), "es");
      }

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
  }

  function buildDynamicSocialReading(variable, rows) {
    if (!rows || rows.length === 0) {
      return "No hay datos disponibles para esta variable.";
    }

    const unhealthyRows = rows
      .map((row) => ({
        category: row.category,
        value: toNumber(row.unhealthy) ?? 0
      }))
      .sort((a, b) => b.value - a.value);

    const balancedRows = rows
      .map((row) => ({
        category: row.category,
        value: toNumber(row.balanced) ?? 0
      }))
      .sort((a, b) => b.value - a.value);

    const maxUnhealthy = unhealthyRows[0];
    const minUnhealthy = unhealthyRows[unhealthyRows.length - 1];
    const maxBalanced = balancedRows[0];

    const gap = maxUnhealthy.value - minUnhealthy.value;

    const genericReadings = {
      sexo: `<strong>Sexo:</strong> las diferencias son reducidas. El patrón con tendencia poco saludable es mayor en ${maxUnhealthy.category} (${formatDecimal(maxUnhealthy.value)} %) y menor en ${minUnhealthy.category} (${formatDecimal(minUnhealthy.value)} %), con una diferencia aproximada de ${formatDecimal(gap)} puntos porcentuales.`,

      educacion: `<strong>Educación:</strong> no aparece un gradiente lineal simple. El patrón con tendencia poco saludable es mayor en ${maxUnhealthy.category} (${formatDecimal(maxUnhealthy.value)} %) y menor en ${minUnhealthy.category} (${formatDecimal(minUnhealthy.value)} %).`,

      economia: `<strong>Situación económica:</strong> el patrón con tendencia poco saludable es menor en ${minUnhealthy.category} (${formatDecimal(minUnhealthy.value)} %) y mayor en ${maxUnhealthy.category} (${formatDecimal(maxUnhealthy.value)} %). Esta lectura debe hacerse comparando las categorías ordenadas de mayor a menor facilidad económica.`,

      ocupacion: `<strong>Ocupación:</strong> el patrón con tendencia poco saludable es mayor en ${maxUnhealthy.category} (${formatDecimal(maxUnhealthy.value)} %) y menor en ${minUnhealthy.category} (${formatDecimal(minUnhealthy.value)} %).`,

      provincia: `<strong>Provincia:</strong> el patrón con tendencia poco saludable es mayor en ${maxUnhealthy.category} (${formatDecimal(maxUnhealthy.value)} %) y menor en ${minUnhealthy.category} (${formatDecimal(minUnhealthy.value)} %). El patrón equilibrado alcanza su mayor presencia relativa en ${maxBalanced.category} (${formatDecimal(maxBalanced.value)} %).`
    };

    return genericReadings[variable] || "Selecciona una variable para consultar una lectura breve.";
  }

  function renderPatternProfileChart() {
    const elementId = "pattern-profile-chart";
    if (!document.getElementById(elementId)) return;

    const select = document.getElementById("pattern-profile-select");
    const selectedPattern = select ? select.value : "balanced";

    const rows = state.data.highConsumption
      .map((row) => ({
        group: row.group,
        value: toNumber(row[selectedPattern]) ?? 0
      }))
      .sort((a, b) => b.value - a.value);

    const color = patternColors[selectedPattern] || patternColors.balanced;

    Plotly.newPlot(elementId, [{
      type: "bar",
      orientation: "h",
      y: rows.map((row) => row.group),
      x: rows.map((row) => row.value),
      marker: {
        color
      },
      text: rows.map((row) => `${formatDecimal(row.value)} %`),
      textposition: "auto",
      hovertemplate: "%{y}<br>Consumo alto: <b>%{x:.1f} %</b><extra></extra>"
    }], basePlotLayout({
      margin: {
        t: 8,
        r: 24,
        b: 48,
        l: 150
      },
      xaxis: {
        title: "Porcentaje de consumo alto",
        ticksuffix: " %",
        gridcolor: "#e8efec",
        rangemode: "tozero"
      },
      yaxis: {
        automargin: true,
        autorange: "reversed"
      }
    }), plotConfig);

    updatePatternProfileReading(selectedPattern, rows);
  }

  function updatePatternProfileReading(selectedPattern, rows) {
    const element = document.getElementById("pattern-profile-reading");
    if (!element) return;

    if (!rows || rows.length === 0) {
      element.innerHTML = "No hay datos disponibles para caracterizar este patrón.";
      return;
    }

    const topGroups = rows.slice(0, 3);
    const bottomGroups = rows.slice(-3).reverse();

    const topText = topGroups
      .map((row) => `${escapeHtml(row.group)} (${formatDecimal(row.value)} %)`)
      .join(", ");

    const bottomText = bottomGroups
      .map((row) => `${escapeHtml(row.group)} (${formatDecimal(row.value)} %)`)
      .join(", ");

    const patternName = patternLabels[selectedPattern] || "patrón seleccionado";

    element.innerHTML = `
      <strong>${escapeHtml(patternName)}:</strong>
      los mayores porcentajes de consumo alto se observan en ${topText}.
      Los valores más bajos aparecen en ${bottomText}.
    `;
  }

  function renderSocialDistribution() {
    const elementId = "social-distribution-chart";
    if (!document.getElementById(elementId)) return;

    const select = document.getElementById("social-variable-select");
    const variable = select ? select.value : "sexo";

    const rows = orderSocialRows(
      variable,
      state.data.socialDistribution.filter((row) => row.variable === variable)
    );

    const categories = rows.map((row) => row.category);

    const traces = [
      {
        key: "balanced",
        label: patternLabels.balanced
      },
      {
        key: "mixed",
        label: patternLabels.mixed
      },
      {
        key: "unhealthy",
        label: patternLabels.unhealthy
      }
    ].map((item) => ({
      type: "bar",
      name: item.label,
      x: categories,
      y: rows.map((row) => toNumber(row[item.key]) ?? 0),
      marker: {
        color: patternColors[item.key]
      },
      hovertemplate: `${item.label}<br>%{x}: <b>%{y:.1f} %</b><extra></extra>`
    }));

    Plotly.newPlot(elementId, traces, basePlotLayout({
      barmode: "stack",
      margin: {
        t: 18,
        r: 18,
        b: variable === "provincia" ? 100 : 70,
        l: 62
      },
      xaxis: {
        tickangle: variable === "provincia" ? -30 : 0,
        automargin: true
      },
      yaxis: {
        title: "Distribución dentro de categoría",
        ticksuffix: " %",
        range: [0, 100],
        gridcolor: "#e8efec"
      },
      legend: {
        orientation: "h",
        y: 1.15,
        x: 0,
        traceorder: "reversed"
      }
    }), plotConfig);

    updateSocialMetrics(rows);
    updateSocialReading(variable, rows);
  }

  function updateSocialMetrics(rows) {
    const maxUnhealthyValue = document.getElementById("social-max-unhealthy-value");
    const maxUnhealthyCategory = document.getElementById("social-max-unhealthy-category");
    const minUnhealthyValue = document.getElementById("social-min-unhealthy-value");
    const minUnhealthyCategory = document.getElementById("social-min-unhealthy-category");
    const gapValue = document.getElementById("social-gap-value");
    const maxBalancedValue = document.getElementById("social-max-balanced-value");
    const maxBalancedCategory = document.getElementById("social-max-balanced-category");

    if (
      !maxUnhealthyValue ||
      !maxUnhealthyCategory ||
      !minUnhealthyValue ||
      !minUnhealthyCategory ||
      !gapValue ||
      !maxBalancedValue ||
      !maxBalancedCategory
    ) {
      return;
    }

    if (!rows || rows.length === 0) {
      maxUnhealthyValue.textContent = "—";
      maxUnhealthyCategory.textContent = "—";
      minUnhealthyValue.textContent = "—";
      minUnhealthyCategory.textContent = "—";
      gapValue.textContent = "—";
      maxBalancedValue.textContent = "—";
      maxBalancedCategory.textContent = "—";
      return;
    }

    const unhealthyRows = rows
      .map((row) => ({
        category: row.category,
        value: toNumber(row.unhealthy) ?? 0
      }))
      .sort((a, b) => b.value - a.value);

    const balancedRows = rows
      .map((row) => ({
        category: row.category,
        value: toNumber(row.balanced) ?? 0
      }))
      .sort((a, b) => b.value - a.value);

    const maxUnhealthy = unhealthyRows[0];
    const minUnhealthy = unhealthyRows[unhealthyRows.length - 1];
    const maxBalanced = balancedRows[0];
    const gap = maxUnhealthy.value - minUnhealthy.value;

    maxUnhealthyValue.textContent = `${formatDecimal(maxUnhealthy.value)} %`;
    maxUnhealthyCategory.textContent = maxUnhealthy.category;

    minUnhealthyValue.textContent = `${formatDecimal(minUnhealthy.value)} %`;
    minUnhealthyCategory.textContent = minUnhealthy.category;

    gapValue.textContent = formatDecimal(gap);

    maxBalancedValue.textContent = `${formatDecimal(maxBalanced.value)} %`;
    maxBalancedCategory.textContent = maxBalanced.category;
  }

  function updateSocialReading(variable, rows = null) {
    const element = document.getElementById("social-reading");

    if (!element) return;

    const selectedRows = rows || orderSocialRows(
      variable,
      state.data.socialDistribution.filter((row) => row.variable === variable)
    );

    element.innerHTML = buildDynamicSocialReading(variable, selectedRows);
  }

  function renderProvinceRanking() {
    const elementId = "province-ranking-chart";
    if (!document.getElementById(elementId)) return;

    const rows = state.data.socialDistribution
      .filter((row) => row.variable === "provincia")
      .map((row) => ({
        category: row.category,
        value: toNumber(row.unhealthy) ?? 0
      }))
      .sort((a, b) => b.value - a.value);

    if (rows.length === 0) {
      Plotly.newPlot(elementId, [], basePlotLayout({
        annotations: [{
          text: "No hay datos provinciales disponibles",
          x: 0.5,
          y: 0.5,
          xref: "paper",
          yref: "paper",
          showarrow: false
        }],
        xaxis: {
          visible: false
        },
        yaxis: {
          visible: false
        }
      }), plotConfig);

      return;
    }

    const ordered = rows.slice().reverse();

    Plotly.newPlot(elementId, [{
      type: "bar",
      orientation: "h",
      y: ordered.map((row) => row.category),
      x: ordered.map((row) => row.value),
      marker: {
        color: patternColors.unhealthy
      },
      text: ordered.map((row) => `${formatDecimal(row.value)} %`),
      textposition: "auto",
      hovertemplate: "%{y}<br>Patrón poco saludable: <b>%{x:.1f} %</b><extra></extra>"
    }], basePlotLayout({
      margin: {
        t: 8,
        r: 24,
        b: 48,
        l: 92
      },
      xaxis: {
        title: "Porcentaje",
        ticksuffix: " %",
        gridcolor: "#e8efec",
        rangemode: "tozero"
      },
      yaxis: {
        automargin: true
      }
    }), plotConfig);
  }

  function getFilteredModelRows() {
    const comparison = document.getElementById("comparison-select")?.value || "mixto";
    const model = document.getElementById("model-select")?.value || "educacion";

    return state.data.poissonModels.filter((row) => {
      return row.comparison === comparison && row.model === model;
    });
  }

  function renderModelForestPlot() {
    const elementId = "model-forest-plot";
    if (!document.getElementById(elementId)) return;

    const rows = getFilteredModelRows();

    if (rows.length === 0) {
      Plotly.newPlot(elementId, [], basePlotLayout({
        annotations: [{
          text: "No hay resultados disponibles para esta combinación",
          x: 0.5,
          y: 0.5,
          xref: "paper",
          yref: "paper",
          showarrow: false
        }],
        xaxis: {
          visible: false
        },
        yaxis: {
          visible: false
        }
      }), plotConfig);

      return;
    }

    const labels = rows.map((row) => row.category);
    const rpValues = rows.map((row) => toNumber(row.rp) ?? 0);
    const lowerValues = rows.map((row, index) => toNumber(row.lower) ?? rpValues[index]);
    const upperValues = rows.map((row, index) => toNumber(row.upper) ?? rpValues[index]);

    const markerColors = rows.map((row) => {
      return row.p !== null && row.p < 0.05
        ? patternColors.unhealthy
        : patternColors.balanced;
    });

    const finiteLower = lowerValues.filter(Number.isFinite);
    const finiteUpper = upperValues.filter(Number.isFinite);

    const minValue = Math.min(1, ...finiteLower);
    const maxValue = Math.max(1, ...finiteUpper);

    const left = Math.max(0, Math.floor((minValue - 0.08) * 10) / 10);
    const right = Math.ceil((maxValue + 0.08) * 10) / 10;

    Plotly.newPlot(elementId, [{
      type: "scatter",
      mode: "markers",
      x: rpValues,
      y: labels,
      marker: {
        size: 13,
        color: markerColors,
        line: {
          color: "#ffffff",
          width: 1.5
        }
      },
      error_x: {
        type: "data",
        symmetric: false,
        array: rows.map((row, index) => Math.max(0, upperValues[index] - rpValues[index])),
        arrayminus: rows.map((row, index) => Math.max(0, rpValues[index] - lowerValues[index])),
        thickness: 1.8,
        width: 5,
        color: "#4c5b58"
      },
      text: rows.map((row) => {
        return `Referencia: ${escapeHtml(row.reference)}<br>RP: ${formatDecimal(row.rp, 2)}<br>IC95 %: ${formatConfidenceInterval(row.lower, row.upper)}<br>p: ${formatPValue(row.p)}`;
      }),
      hovertemplate: "<b>%{y}</b><br>%{text}<extra></extra>"
    }], basePlotLayout({
      margin: {
        t: 18,
        r: 32,
        b: 56,
        l: 230
      },
      xaxis: {
        title: "Razón de prevalencia",
        range: [left, right],
        gridcolor: "#e8efec",
        zeroline: false
      },
      yaxis: {
        automargin: true,
        autorange: "reversed"
      },
      shapes: [{
        type: "line",
        x0: 1,
        x1: 1,
        y0: 0,
        y1: 1,
        xref: "x",
        yref: "paper",
        line: {
          color: "#172321",
          width: 1.4,
          dash: "dot"
        }
      }],
      annotations: [{
        text: "RP = 1",
        x: 1,
        y: 1.08,
        xref: "x",
        yref: "paper",
        showarrow: false,
        font: {
          size: 12,
          color: "#536662"
        }
      }]
    }), plotConfig);
  }

  function renderModelTable() {
    const rows = getFilteredModelRows();
    const body = document.getElementById("model-results-body");

    if (!body) return;

    if (rows.length === 0) {
      body.innerHTML = `
        <tr>
          <td colspan="5">No hay resultados disponibles para esta combinación.</td>
        </tr>
      `;

      return;
    }

    body.innerHTML = rows.map((row) => {
      const significant = row.p !== null && row.p < 0.05;

      return `
        <tr>
          <td>${escapeHtml(row.category)}</td>
          <td>${escapeHtml(row.reference)}</td>
          <td><strong>${formatDecimal(row.rp, 2)}</strong></td>
          <td><strong>${formatConfidenceInterval(row.lower, row.upper)}</strong></td>
          <td class="${significant ? "significant" : ""}">${formatPValue(row.p)}</td>
        </tr>
      `;
    }).join("");
  }

  function renderModelSummary() {
    const element = document.getElementById("model-summary-text");
    if (!element) return;

    const rows = getFilteredModelRows();

    if (rows.length === 0) {
      element.innerHTML = "No hay resultados disponibles para esta combinación de comparación y modelo.";
      return;
    }

    element.innerHTML = buildDynamicModelSummary(rows);
  }

  function buildDynamicModelSummary(rows) {
    const comparison = document.getElementById("comparison-select")?.value || "mixto";
    const model = document.getElementById("model-select")?.value || "educacion";

    const comparisonLabels = {
      mixto: "patrón mixto",
      poco_saludable: "patrón con tendencia poco saludable"
    };

    const modelLabels = {
      educacion: "nivel educativo",
      ocupacion: "posición ocupacional",
      economia: "situación económica del hogar"
    };

    const significantRows = rows.filter((row) => row.p !== null && row.p < 0.05);

    const highestRow = rows.slice().sort((a, b) => {
      return (toNumber(b.rp) ?? 0) - (toNumber(a.rp) ?? 0);
    })[0];

    const lowestRow = rows.slice().sort((a, b) => {
      return (toNumber(a.rp) ?? 0) - (toNumber(b.rp) ?? 0);
    })[0];

    const comparisonText = comparisonLabels[comparison] || "patrón analizado";
    const modelText = modelLabels[model] || "modelo seleccionado";

    const highestText = highestRow
      ? `${escapeHtml(highestRow.category)} presenta la RP más alta (${formatDecimal(highestRow.rp, 2)}; IC95 % ${formatConfidenceInterval(highestRow.lower, highestRow.upper)}; p ${formatPValue(highestRow.p)})`
      : "No se identifica una categoría con RP disponible";

    const lowestText = lowestRow
      ? `${escapeHtml(lowestRow.category)} presenta la RP más baja (${formatDecimal(lowestRow.rp, 2)})`
      : "No se identifica una categoría con RP disponible";

    if (significantRows.length === 0) {
      return `
        En el modelo de <strong>${modelText}</strong> para el <strong>${comparisonText}</strong>, no se observan asociaciones estadísticamente significativas bajo el criterio p &lt; 0,05.
        ${highestText}. ${lowestText}. La lectura debe centrarse en la magnitud y dirección de las RP, evitando interpretar estos resultados como efectos causales.
      `;
    }

    const significantText = significantRows.map((row) => {
      return `${escapeHtml(row.category)} (RP ${formatDecimal(row.rp, 2)}; IC95 % ${formatConfidenceInterval(row.lower, row.upper)}; p ${formatPValue(row.p)})`;
    }).join("; ");

    return `
      En el modelo de <strong>${modelText}</strong> para el <strong>${comparisonText}</strong>, se observan asociaciones estadísticamente significativas en: ${significantText}.
      ${highestText}. La interpretación debe hacerse frente a la categoría de referencia indicada en la tabla y sin asumir causalidad.
    `;
  }

  function renderModelOutputs() {
    renderModelForestPlot();
    renderModelTable();
    renderModelSummary();
  }

  function formatConfidenceInterval(lower, upper) {
    if (lower === null || upper === null || lower === undefined || upper === undefined) {
      return "No disponible";
    }

    return `${formatDecimal(lower, 2)}–${formatDecimal(upper, 2)}`;
  }

  function formatDecimal(value, digits = 1) {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return "—";
    }

    return Number(value).toLocaleString("es-ES", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
  }

  function formatPValue(value) {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return "No disponible";
    }

    if (value < 0.001) {
      return "<0,001";
    }

    return Number(value).toLocaleString("es-ES", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setupNavigation() {
    const button = document.querySelector(".nav-toggle");
    const links = document.getElementById("nav-links");

    if (!button || !links) return;

    button.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      button.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setupControls() {
    document.getElementById("social-variable-select")?.addEventListener("change", renderSocialDistribution);
    document.getElementById("comparison-select")?.addEventListener("change", renderModelOutputs);
    document.getElementById("model-select")?.addEventListener("change", renderModelOutputs);
    document.getElementById("pattern-profile-select")?.addEventListener("change", renderPatternProfileChart);
  }

  function renderAll() {
    renderPatternCards();
    renderPatternDistribution();
    renderHighConsumptionHeatmap();
    renderPatternProfileChart();
    renderSocialDistribution();
    renderProvinceRanking();
    renderModelOutputs();
  }

  async function init() {
    setupNavigation();
    setupControls();

    renderAll();

    await loadAvailableData();

    renderAll();
  }

  window.addEventListener("DOMContentLoaded", init);
})();