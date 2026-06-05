# Web TFM — Patrones alimentarios y desigualdades sociales en Andalucía

Web estática e interactiva para presentar resultados del TFM sobre patrones alimentarios en población adulta andaluza a partir de la Encuesta Andaluza de Salud 2016.

## Estructura

```text
06_web_github_pages/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── data/
│   └── coloca aquí tus CSV reales
├── figures/
│   └── figuras PNG opcionales
└── README.md
```

## Tecnología

- HTML + CSS + JavaScript vanilla.
- Plotly.js vía CDN para gráficos interactivos.
- PapaParse vía CDN para leer CSV.
- Sin React, sin backend y sin dependencias de compilación.


## CSV esperados

La web intenta cargar estos archivos desde `data/`:

```text
data/distribucion_patrones.csv
data/caracterizacion_consumo_alto_patron.csv
data/distribucion_patrones_sociales.csv
data/29_02_modelos_poisson_independientes_posicion_social_12_grupos_2016_memoria.csv
```

Si algún archivo no existe, la web no se queda en blanco: muestra un aviso y utiliza datos de ejemplo incluidos en `assets/js/app.js`.

## Formatos de CSV recomendados

### 1. Distribución de patrones

```csv
patron,porcentaje
Patrón equilibrado con tendencia saludable,32.6
Patrón mixto,27.3
Patrón con tendencia poco saludable,40.0
```

### 2. Caracterización de consumo alto por patrón

Formato largo recomendado:

```csv
grupo_alimentario,patron,porcentaje
Fruta,Patrón equilibrado con tendencia saludable,74.0
Fruta,Patrón mixto,70.0
Fruta,Patrón con tendencia poco saludable,48.0
```

También se acepta formato ancho:

```csv
grupo_alimentario,equilibrado,mixto,poco_saludable
Fruta,74.0,70.0,48.0
Verduras,68.0,66.0,44.0
```

### 3. Distribución de patrones por variables sociales

Formato largo recomendado:

```csv
variable,categoria,patron,porcentaje
sexo,Hombres,Patrón equilibrado con tendencia saludable,31.5
sexo,Hombres,Patrón mixto,27.0
sexo,Hombres,Patrón con tendencia poco saludable,41.5
```

Variables reconocidas:

```text
sexo
educacion
economia
ocupacion
provincia
```

También se acepta formato ancho:

```csv
variable,categoria,equilibrado,mixto,poco_saludable
sexo,Hombres,31.5,27.0,41.5
sexo,Mujeres,33.6,27.6,38.8
```

### 4. Modelos de Poisson robustos

Formato recomendado:

```csv
comparacion,modelo,categoria,referencia,rp,ic95_inf,ic95_sup,p
mixto,educacion,Medio,Universitario,1.04,0.90,1.20,0.589
poco_saludable,economia,Dificultad,Facilidad,1.25,1.14,1.36,0.0005
```

Valores válidos para `comparacion`:

```text
mixto
poco_saludable
```

Valores válidos para `modelo`:

```text
educacion
ocupacion
economia
```
