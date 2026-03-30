# The Anatomy of Plots

Data visualization is one of those things that seems simple until you actually try to do it well. A chart is more than just lines and bars -- it's a communication tool. Every element serves a purpose. Let's break down what makes a plot readable, informative, and honest.

## The Core Components

Every statistical plot shares a common anatomy. Understanding each part helps you build better visualizations, regardless of whether you're using D3, matplotlib, or a spreadsheet.

![Anatomy of a plot](/assets/images/blog/plot-anatomy.svg)

### Axes

The axes define the coordinate space. The x-axis typically represents the independent variable (time, categories, input), while the y-axis represents the dependent variable (measurements, counts, output).

A few rules:

- **Always label your axes.** A chart without axis labels is a chart that lies by omission.
- **Include units.** "Revenue" is ambiguous. "Revenue (MSEK)" is not.
- **Start at zero for bar charts.** Truncated axes on bar charts exaggerate differences. Line charts get more leeway here since they show trends, not magnitudes.

### Dual Axes

Sometimes you need to show two different scales. The screenshot above uses this -- bars for net profit (left axis, TKR) and a line for units sold (right axis). This is powerful but dangerous:

- Two unrelated metrics can appear correlated simply because of how you scale the axes.
- Readers may confuse which data maps to which axis.
- Use dual axes sparingly, and always differentiate clearly (color, line style, legend).

### Grid Lines

Subtle horizontal grid lines help readers trace values from the data point to the axis. They should be barely visible -- if you notice the grid before the data, it's too prominent.

### Legends

A legend maps visual encodings (color, line style, marker shape) to their meaning. Place it close to the data when possible. The best chart is one where the legend is unnecessary because the labels are directly on the data (annotations), but that's not always feasible.

## Choosing the Right Chart Type

### Bar Charts

Best for comparing discrete categories or showing magnitudes. The example shows net profit per year as bars -- you can immediately see which years were profitable (green) and which weren't (red/brown). The visual weight of bars makes magnitude comparisons intuitive.

### Line Charts

Best for showing trends over continuous data (usually time). The orange line series for "antal salda" (units sold) in the example clearly shows the rise and fall pattern that would be harder to read as bars.

### Combined Charts

Overlaying bars and lines (as in the example) lets you show both magnitude and trend simultaneously. The trade-off is complexity -- you need clear visual differentiation and a well-placed legend.

## Color as Information

Color should encode meaning, not decoration:

- **Green/red for positive/negative** is a strong convention (but consider colorblind accessibility -- use patterns or labels as backup).
- **Consistent color mapping** -- if blue means "revenue" in one chart, it should mean "revenue" in every chart in your report.
- **Limit your palette.** Three to five colors is usually enough. More than that and readers can't keep track.

## Common Mistakes

### Truncated Axes

Starting a bar chart's y-axis at 95 instead of 0 makes a 2% difference look like a 40% difference. This is the most common way charts mislead.

### Too Many Series

If your line chart has 12 lines, it's not a chart -- it's a plate of spaghetti. Filter, facet, or highlight the important series.

### Missing Context

A chart showing "Sales dropped 50%!" is alarming. A chart showing "Sales dropped 50% during a global pandemic, in line with the entire industry" is context. Always ask: what would a reader misunderstand without additional context?

### 3D Charts

Don't. Perspective distortion makes values impossible to read accurately. There is no dataset that is better communicated in 3D than in 2D.

## Tools

For quick exploration:

- **Spreadsheets** (Google Sheets, Excel) -- fine for simple charts, limited customization.
- **Python** (matplotlib, seaborn, plotly) -- full control, reproducible, great for analysis.
- **JavaScript** (D3.js, Chart.js, Observable Plot) -- best for interactive/web charts.

For production dashboards:

- **Grafana** -- time-series monitoring.
- **Metabase / Superset** -- SQL-based business dashboards.
- **Custom D3** -- when nothing else gives you the control you need.

## Summary

A good plot is one where the reader understands the data without needing the author to explain it. Label your axes, choose appropriate chart types, use color with intent, and always provide context. The goal is clarity, not beauty -- though the best charts tend to be both.
