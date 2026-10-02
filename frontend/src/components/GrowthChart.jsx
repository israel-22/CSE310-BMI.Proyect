import Chart from 'chart.js/auto'
import { useEffect } from 'react'

window.Chart = Chart

function GrowthChart() {

    useEffect(() => {

        const script = document.createElement('script')

        script.src = '/charts.js'
        script.async = false

        document.body.appendChild(script)

    }, [])

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