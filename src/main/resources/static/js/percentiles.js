
// Children's Length/Age Chart Boys

const ctx = document.getElementById("heightForAgeBoysChart").getContext("2d");
const heightForAgeBoysChart = new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [
      // +3 SD
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 55.5 },
          { x: 1, y: 83 },
          { x: 2, y: 97 },
          { x: 3, y: 107 },
          { x: 4, y: 116 },
          { x: 5, y: 124 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      // +2 SD
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 53.5 },
          { x: 1, y: 80.5 },
          { x: 2, y: 94 },
          { x: 3, y: 103.5 },
          { x: 4, y: 112 },
          { x: 5, y: 119 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      // Mediana (0 SD)
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 50 },
          { x: 1, y: 75.5 },
          { x: 2, y: 86.5 },
          { x: 3, y: 96 },
          { x: 4, y: 103 },
          { x: 5, y: 110 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      // -2 SD
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 46 },
          { x: 1, y: 71 },
          { x: 2, y: 81 },
          { x: 3, y: 89 },
          { x: 4, y: 95 },
          { x: 5, y: 101 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      // -3 SD
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 44 },
          { x: 1, y: 69 },
          { x: 2, y: 78.5 },
          { x: 3, y: 85 },
          { x: 4, y: 91 },
          { x: 5, y: 96 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Calculated Point",
        borderColor: "blue",
        borderWidth: 2,
        data: [],
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  },

  options: {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    const point = context.raw;

                    return [
                        `Control Date: ${point.controlDate}`,
                        `Height: ${point.height} cm`,
                        `Weight: ${point.weight} kg`
                    ];
                }
            }
        }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years and months),"
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          callback: function (value) {
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },

      y: {
        title: {
          display: true,
          text: "Height/Length (m)",
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },

      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
    },
  },
});



// Children's Length/Age Chart Girls
const ctx2 = document.getElementById("heightForAgeGirlsChart").getContext("2d");
const heightForAgeGirlsChart = new Chart(ctx2, {
  type: "scatter",
  data: {
    datasets: [

      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 55 },
          { x: 1, y: 82 },
          { x: 2, y: 96 },
          { x: 3, y: 106 },
          { x: 4, y: 116 },
          { x: 5, y: 124 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 53 },
          { x: 1, y: 79.5 },
          { x: 2, y: 93 },
          { x: 3, y: 103 },
          { x: 4, y: 111 },
          { x: 5, y: 119 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 49.5 },
          { x: 1, y: 74 },
          { x: 2, y: 86 },
          { x: 3, y: 95 },
          { x: 4, y: 103 },
          { x: 5, y: 109 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 45 },
          { x: 1, y: 69 },
          { x: 2, y: 80 },
          { x: 3, y: 87 },
          { x: 4, y: 94 },
          { x: 5, y: 100 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 43.5 },
          { x: 1, y: 66.5 },
          { x: 2, y: 77 },
          { x: 3, y: 84 },
          { x: 4, y: 90 },
          { x: 5, y: 95 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      {
        label: "Calculated Point",
        borderColor: "blue",
        borderWidth: 2,
        data: [],
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    const point = context.raw;

                    return [
                        `Control Date: ${point.controlDate}`,
                        `Height: ${point.height} cm`,
                        `Weight: ${point.weight} kg`
                    ];
                }
            }
        }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years and months)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,

          callback: function (value) {

            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;

            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Height/Length (m)",
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
    },
  },
});

// Weight-for-age chart (boy)
const ctx3 = document.getElementById("weightForAgeBoysChart").getContext("2d");
const weightForAgeBoysChart = new Chart(ctx3, {
  type: "scatter",
  data: {
    datasets: [

      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
       data: [
         { x: 0, y: 5.0 },
         { x: 1, y: 13.3 },
         { x: 2, y: 17.1 },
         { x: 3, y: 20.7 },
         { x: 4, y: 24.2 },
         { x: 5, y: 27.9 },
       ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 4.4 },
          { x: 1, y: 12.0 },
          { x: 2, y: 15.3 },
          { x: 3, y: 18.3 },
          { x: 4, y: 21.5 },
          { x: 5, y: 24.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
      data: [
        { x: 0, y: 3.3 },
        { x: 1, y: 9.6 },
        { x: 2, y: 12.2 },
        { x: 3, y: 14.3 },
        { x: 4, y: 16.3 },
        { x: 5, y: 18.3 },
      ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 2.5 },
          { x: 1, y: 7.7 },
          { x: 2, y: 9.7 },
          { x: 3, y: 11.3 },
          { x: 4, y: 12.7 },
          { x: 5, y: 14.1 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
       data: [
         { x: 0, y: 2.1 },
         { x: 1, y: 6.9 },
         { x: 2, y: 8.6 },
         { x: 3, y: 10.0 },
         { x: 4, y: 11.3 },
         { x: 5, y: 12.4 },
       ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      {
        label: "Calculated Point",
        borderColor: "blue",
        borderWidth: 2,
        data: [],
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  },
  options: {
    responsive: true,
     plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const point = context.raw;

                        return [
                            `Control Date: ${point.controlDate}`,
                            `Weight: ${point.weight} kg`,
                            `Height: ${point.height} cm`
                        ];
                    }
                }
            }
        },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years and months)"
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,

          callback: function (value) {

            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;

            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (kg)"
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
    },
  },
});

// Weight-for-age chart (girl)
const ctx4 = document.getElementById("weightForAgeGirlsChart").getContext("2d");
const weightForAgeGirlsChart = new Chart(ctx4, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 4.8 },
          { x: 1, y: 13.1 },
          { x: 2, y: 16.7 },
          { x: 3, y: 20.4 },
          { x: 4, y: 24.0 },
          { x: 5, y: 27.8 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 4.2 },
          { x: 1, y: 11.5 },
          { x: 2, y: 14.8 },
          { x: 3, y: 17.9 },
          { x: 4, y: 21.2 },
          { x: 5, y: 24.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 3.2 },
          { x: 1, y: 8.9 },
          { x: 2, y: 11.5 },
          { x: 3, y: 13.9 },
          { x: 4, y: 16.1 },
          { x: 5, y: 18.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 2.4 },
          { x: 1, y: 7.0 },
          { x: 2, y: 9.0 },
          { x: 3, y: 10.8 },
          { x: 4, y: 12.3 },
          { x: 5, y: 13.7 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 2.0 },
          { x: 1, y: 6.3 },
          { x: 2, y: 8.1 },
          { x: 3, y: 9.8 },
          { x: 4, y: 11.1 },
          { x: 5, y: 12.4 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Blue",
        borderColor: "blue",
        borderWidth: 2,
        data: [],
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
      {
          label: "Calculated Point",
          data: [],
          showLine: false,
          pointRadius: 6
      }
    ],
  },
  options: {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    const point = context.raw;

                    return [
                        `Control Date: ${point.controlDate}`,
                        `Weight: ${point.weight} kg`,
                        `Height: ${point.height} cm`
                    ];
                }
            }
        }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years and months)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,

          callback: function (value) {

            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (kg)",
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
    },
  },
});



// BMI / AGE GIRL
const ctx5 = document.getElementById("bmiForAgeGirlsChart").getContext("2d");

const bmiForAgeGirlsChart = new Chart(ctx5, {
  type: "scatter",

  data: {
    datasets: [

      // +3 SD
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 17.7 },
          { x: 1, y: 21.6 },
          { x: 2, y: 20.3 },
          { x: 2.0, y: 20.5 },
          { x: 2.1, y: 20.5 },
          { x: 3, y: 20.3 },
          { x: 4, y: 20.6 },
          { x: 5, y: 21.1 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      // +2 SD
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 16.1 },
          { x: 1, y: 19.6 },
          { x: 2, y: 18.4 },
          { x: 2.0, y: 18.6 },
          { x: 2.1, y: 18.6 },
          { x: 3, y: 18.4 },
          { x: 4, y: 18.5 },
          { x: 5, y: 18.8 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 13.3 },
          { x: 1, y: 16.4 },
          { x: 2, y: 15.4 },
          { x: 2.0, y: 15.6 },
          { x: 2.1, y: 15.6 },
          { x: 3, y: 15.4 },
          { x: 4, y: 15.3 },
          { x: 5, y: 15.3 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 11.1 },
          { x: 1, y: 13.8 },
          { x: 2, y: 13.1 },
          { x: 2.0, y: 13.3 },
          { x: 2.1, y: 13.3 },
          { x: 3, y: 13.1 },
          { x: 4, y: 12.8 },
          { x: 5, y: 12.7 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 10.1 },
          { x: 1, y: 12.7 },
          { x: 2, y: 12.1 },
          { x: 2.0, y: 12.3 },
          { x: 2.1, y: 12.3 },
          { x: 3, y: 12.1 },
          { x: 4, y: 11.8 },
          { x: 5, y: 11.6 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Calculated Point",
        borderColor: "blue",
        borderWidth: 2,
        data: [],
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },

    ],
  },

  options: {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    const point = context.raw;

                    return [
                        `Control Date: ${point.controlDate}`,
                        `BMI: ${point.bmi}`,
                        `Weight: ${point.weight} kg`,
                        `Height: ${point.height} cm`
                    ];
                }
            }
        }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years and months)",
        },

        type: "linear",
        position: "bottom",

        ticks: {
          stepSize: 0.1,

          callback: function (value) {
            return value.toFixed(1);
          },
        },

        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,

          color: function (context) {
            const tickValue = context.tick.value;
            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },

      y: {
        title: {
          display: true,
          text: "BMI",
        },

        ticks: {
          stepSize: 1,

          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },

        min: 9,
        max: 24,
      },

      y1: {
        position: "right",

        title: {
          display: true,
        },

        ticks: {
          stepSize: 1,

          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },

        min: 9,
        max: 24,
      },
    },
  },
});


// BMI / AGE BOY
const ctx6 = document.getElementById("bmiForAgeBoysChart").getContext("2d");

const bmiForAgeBoysChart = new Chart(ctx6, {
  type: "scatter",

  data: {
    datasets: [

      // +3 SD
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 18.1 },
          { x: 1, y: 21.6 },
          { x: 2, y: 20.3 },
          { x: 2.0, y: 20.6 },
          { x: 2.1, y: 20.6 },
          { x: 3, y: 20.0 },
          { x: 4, y: 19.9 },
          { x: 5, y: 20.3 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      // +2 SD
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 16.3 },
          { x: 1, y: 19.8 },
          { x: 2, y: 18.5 },
          { x: 2.0, y: 18.8 },
          { x: 2.1, y: 18.8 },
          { x: 3, y: 18.4 },
          { x: 4, y: 18.2 },
          { x: 5, y: 18.3 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 13.4 },
          { x: 1, y: 16.8 },
          { x: 2, y: 15.7 },
          { x: 2.0, y: 16.0 },
          { x: 2.1, y: 16.0 },
          { x: 3, y: 15.6 },
          { x: 4, y: 15.3 },
          { x: 5, y: 15.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 11.1 },
          { x: 1, y: 14.4 },
          { x: 2, y: 13.6 },
          { x: 2.0, y: 13.8 },
          { x: 2.1, y: 13.8 },
          { x: 3, y: 13.4 },
          { x: 4, y: 13.1 },
          { x: 5, y: 12.9 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },


      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 10.2 },
          { x: 1, y: 13.4 },
          { x: 2, y: 12.7 },
          { x: 2.0, y: 12.9 },
          { x: 2.1, y: 12.9 },
          { x: 3, y: 12.4 },
          { x: 4, y: 12.1 },
          { x: 5, y: 12.0 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
       {
              label: "Calculated Point",
              borderColor: "blue",
              borderWidth: 2,
              data: [],
              showLine: false,
              pointRadius: 5,
              pointBackgroundColor: "blue",
            },

    ],
  },

  options: {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    const point = context.raw;

                    return [
                        `Control Date: ${point.controlDate}`,
                        `BMI: ${point.bmi}`,
                        `Weight: ${point.weight} kg`,
                        `Height: ${point.height} cm`
                    ];
                }
            }
        }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years and months)",
        },

        type: "linear",
        position: "bottom",

        ticks: {
          stepSize: 0.1,

          callback: function (value) {
            return value.toFixed(1);
          },
        },

        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,

          color: function (context) {
            const tickValue = context.tick.value;

            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },

      y: {
        title: {
          display: true,
          text: "BMI",
        },

        ticks: {
          stepSize: 1,

          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },

        min: 9,
        max: 24,
      },

      y1: {
        position: "right",

        title: {
          display: true,
        },

        ticks: {
          stepSize: 1,

          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },

        min: 9,
        max: 24,
      },
    },
  },
});

function addWeightForAgePoint(control) {

    const birthDate = new Date(control.child.birthDate);
    const controlDate = new Date(control.controlDate);

    const ageInYears =
        (controlDate - birthDate) /
        (1000 * 60 * 60 * 24 * 365.25);

    const chart =
        control.child.gender === 'Female'
            ? weightForAgeGirlsChart
            : weightForAgeBoysChart;

    chart.data.datasets[5].data.push({
        x: ageInYears,
        y: control.weight,
        controlDate: control.controlDate,
            weight: control.weight,
            height: control.height,
            bmi: control.bmi
    });

    chart.update();
}

function addHeightForAgePoint(control) {

    const birthDate = new Date(control.child.birthDate);
    const controlDate = new Date(control.controlDate);

    const ageInYears =
        (controlDate - birthDate) /
        (1000 * 60 * 60 * 24 * 365.25);

    const chart =
        control.child.gender === 'Female'
            ? heightForAgeGirlsChart
            : heightForAgeBoysChart;

    chart.data.datasets[5].data.push({
        x: ageInYears,
        y: control.height,
        controlDate: control.controlDate,
            weight: control.weight,
            height: control.height,
            bmi: control.bmi
    });

    chart.update();
}

function addBmiForAgePoint(control) {

    const birthDate = new Date(control.child.birthDate);
    const controlDate = new Date(control.controlDate);

    const ageInYears =
        (controlDate - birthDate) /
        (1000 * 60 * 60 * 24 * 365.25);

    const chart =
        control.child.gender === 'Female'
            ? bmiForAgeGirlsChart
            : bmiForAgeBoysChart;

    chart.data.datasets[5].data.push({
        x: ageInYears,
        y: control.bmi,
         controlDate: control.controlDate,
            weight: control.weight,
            height: control.height,
            bmi: control.bmi
    });

    chart.update();
}