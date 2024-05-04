import * as tfvis from '@tensorflow/tfjs-vis'

export function drawHistogram(data: any[], name: string, tab: string){
  tfvis.render.histogram({name,tab}, data.map((d: any) => d.e), {height: 300})
}

export function drawTable(data: any[], name: string, tab: string){
  tfvis.render.table({name,tab}, {
    headers: Object.keys(data[0]),
    values: data.map((d: any) => Object.values(d))
  });
}

export function drawModelSummary(model: any, name: string, tab: string){
  tfvis.show.modelSummary({name, tab}, model);
  tfvis.show.layer({name, tab}, model);
}

 function drawScatterPlotForTwoFeatureOfOneDataset(featureOne: string, featureTwo: string, data: any[], name: string, tab: string){
  const values = data.map((d: any) => ({x: d[featureOne], y: d[featureTwo]}))
  tfvis.render.scatterplot({name, tab}, {values}, {
    xLabel: featureOne,
    yLabel: featureTwo,
    height: 300
  })
}

export function drawScatterPlot(data:any[], name: string, tab: string){
    const features = Object.keys(data[0])
    for(let i = 0; i < features.length; i++){
      for(let j = i + 1; j < features.length; j++){
        drawScatterPlotForTwoFeatureOfOneDataset(features[i], features[j], data, `${features[i]} vs ${features[j]}`, tab)
      }
    }
}

function drawLineForTwoFeaturesOfOneDataset(featureOne: string, featureTwo: string, data: any[], name: string, tab: string){
  const values = data.map((d: any) => ({x: d[featureOne], y: d[featureTwo]}))
  tfvis.render.linechart({name, tab}, {values}, {
    xLabel: featureOne,
    yLabel: featureTwo,
    height: 300
  })
}

export function drawLine(data:any[], name: string, tab: string){
    const features = Object.keys(data[0])
    for(let i = 0; i < features.length; i++){
      for(let j = i + 1; j < features.length; j++){
        drawLineForTwoFeaturesOfOneDataset(features[i], features[j], data, `${features[i]} vs ${features[j]}`, tab)
      }
    }
}

export function drawBarChartOfEachFeatureOfOneDataset(data: any[], name: string, tab: string){
  const features = Object.keys(data[0])
  features.forEach((feature) => {
    const values = data.map((d: any) => d[feature])
    tfvis.render.barchart({name: feature, tab}, {values} as any, {
      xLabel: feature,
      yLabel: 'Count',
      height: 300
    })
  })
}

export function drawConfusionMatrix(data: any[], name: string, tab: string){
  const values = data.map((d: any) => ({x: d[0], y: d[1]}))
  tfvis.render.confusionMatrix({name, tab}, {values} as any)
}

export function drawHeatMap(data: any[], name: string, tab: string){
  const values = data.map((d: any) => ({x: d[0], y: d[1], value: d[2]}))
  tfvis.render.heatmap({name, tab}, {values} as any)
}



