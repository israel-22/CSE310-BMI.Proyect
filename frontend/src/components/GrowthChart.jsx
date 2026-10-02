import Chart from 'chart.js/auto'
import { useEffect, useState } from 'react'

window.Chart = Chart

function GrowthChart({ child, controls }) {

    const [chartsReady, setChartsReady] = useState(false)

    useEffect(() => {

        const script = document.createElement('script')

        script.src = 'http://localhost:8080/js/charts.js'
        script.async = false

        script.onload = () => {

            console.log('charts.js loaded successfully')

            setChartsReady(true)

        }

        document.body.appendChild(script)

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

}, [child, controls, chartsReady])

    return (
        <section>

            <h2>Growth Charts</h2>

            <div
                className="chart-container"
                id="heightForAgeBoysContainer"
            >
                <h3>Length/Age - Boys</h3>
                <canvas id="heightForAgeBoysChart"></canvas>
            </div>

            <div
                className="chart-container"
                id="heightForAgeGirlsContainer"
            >
                <h3>Length/Age - Girls</h3>
                <canvas id="heightForAgeGirlsChart"></canvas>
            </div>

            <div
                className="chart-container"
                id="weightForAgeBoysContainer"
            >
                <h3>Weight/Age - Boys</h3>
                <canvas id="weightForAgeBoysChart"></canvas>
            </div>

            <div
                className="chart-container"
                id="weightForAgeGirlsContainer"
            >
                <h3>Weight/Age - Girls</h3>
                <canvas id="weightForAgeGirlsChart"></canvas>
            </div>

            <div
                className="chart-container"
                id="bmiForAgeGirlsContainer"
            >
                <h3>BMI/Age - Girls</h3>
                <canvas id="bmiForAgeGirlsChart"></canvas>
            </div>

            <div
                className="chart-container"
                id="bmiForAgeBoysContainer"
            >
                <h3>BMI/Age - Boys</h3>
                <canvas id="bmiForAgeBoysChart"></canvas>
            </div>

        </section>
    )
}

export default GrowthChart