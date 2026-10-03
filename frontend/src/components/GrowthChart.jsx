import Chart from 'chart.js/auto'
import { useEffect, useState } from 'react'

window.Chart = Chart

function GrowthChart({ child, controls }) {

    const isGirl =
        child.gender === 'Female' ||
        child.gender === 'FEMALE' ||
        child.gender === 'Girl' ||
        child.gender === 'GIRL'

    const [chartsReady, setChartsReady] = useState(false)

  useEffect(() => {

      async function loadCharts() {

          try {

              const response = await fetch('/js/charts.js')

              if (!response.ok) {
                  throw new Error('Failed to load charts.js')
              }

              const source = await response.text()

              const runCharts = new Function(
                  'Chart',
                  `
                  ${source}

                  return {
                      addWeightForAgePoint,
                      addHeightForAgePoint,
                      addBmiForAgePoint
                  }
                  `
              )

              const chartFunctions = runCharts(Chart)

              window.addWeightForAgePoint =
                  chartFunctions.addWeightForAgePoint

              window.addHeightForAgePoint =
                  chartFunctions.addHeightForAgePoint

              window.addBmiForAgePoint =
                  chartFunctions.addBmiForAgePoint

              console.log('charts.js executed successfully')

              setChartsReady(true)

          } catch (error) {

              console.error('Error loading charts.js:', error)

          }
      }

      loadCharts()

  }, [])

useEffect(() => {

    if (!chartsReady) {
        return
    }

    if (
        typeof window.addWeightForAgePoint !== 'function' ||
        typeof window.addHeightForAgePoint !== 'function' ||
        typeof window.addBmiForAgePoint !== 'function'
    ) {
        console.error('Chart functions are not available yet')
        return
    }

    const chartIds = [
        'heightForAgeBoysChart',
        'heightForAgeGirlsChart',
        'weightForAgeBoysChart',
        'weightForAgeGirlsChart',
        'bmiForAgeGirlsChart',
        'bmiForAgeBoysChart'
    ]

    chartIds.forEach(chartId => {
        const chart = Chart.getChart(chartId)

        if (!chart) {
            return
        }
         console.log(
             chartId,
             chart.data.datasets.map(dataset => ({
                 label: dataset.label,
                 points: dataset.data.length,
                 data: JSON.stringify(dataset.data)
             }))
         )

        const calculatedDataset = chart.data.datasets.find(
            dataset => dataset.label === 'Calculated Point'
        )

        if (calculatedDataset) {
            calculatedDataset.data = []
        }


    })

    if (!controls || controls.length === 0) {
        return
    }

    controls.forEach(control => {

        window.addWeightForAgePoint({
            ...control,
            child
        })

        window.addHeightForAgePoint({
            ...control,
            child
        })

        window.addBmiForAgePoint({
            ...control,
            child
        })

    })
    console.log(
        'AFTER POINTS',
        chartIds.map(chartId => {
            const chart = Chart.getChart(chartId)

            if (!chart) {
                return null
            }

            return {
                chartId,
                datasets: chart.data.datasets.map(dataset => ({
                    label: dataset.label,
                    points: dataset.data.length
                }))
            }
        })
    )

}, [child, controls, chartsReady])

   return (
       <section>
           <h2>Growth Charts</h2>

           <div
               className="chart-container"
               id="heightForAgeBoysContainer"
               style={{ display: isGirl ? 'none' : 'block' }}
           >
               <h3>Length/Age - Boys</h3>
               <canvas id="heightForAgeBoysChart"></canvas>
           </div>

           <div
               className="chart-container"
               id="heightForAgeGirlsContainer"
               style={{ display: isGirl ? 'block' : 'none' }}
           >
               <h3>Length/Age - Girls</h3>
               <canvas id="heightForAgeGirlsChart"></canvas>
           </div>

           <div
               className="chart-container"
               id="weightForAgeBoysContainer"
               style={{ display: isGirl ? 'none' : 'block' }}
           >
               <h3>Weight/Age - Boys</h3>
               <canvas id="weightForAgeBoysChart"></canvas>
           </div>

           <div
               className="chart-container"
               id="weightForAgeGirlsContainer"
               style={{ display: isGirl ? 'block' : 'none' }}
           >
               <h3>Weight/Age - Girls</h3>
               <canvas id="weightForAgeGirlsChart"></canvas>
           </div>

           <div
               className="chart-container"
               id="bmiForAgeGirlsContainer"
               style={{ display: isGirl ? 'block' : 'none' }}
           >
               <h3>BMI/Age - Girls</h3>
               <canvas id="bmiForAgeGirlsChart"></canvas>
           </div>

           <div
               className="chart-container"
               id="bmiForAgeBoysContainer"
               style={{ display: isGirl ? 'none' : 'block' }}
           >
               <h3>BMI/Age - Boys</h3>
               <canvas id="bmiForAgeBoysChart"></canvas>
           </div>
       </section>
   )
}

export default GrowthChart