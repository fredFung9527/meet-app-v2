import { Bar } from 'react-chartjs-2'

const options = {
  plugins: {   
    legend: {
      display: false
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

export default function DoughnutChart(props) {
  return (
    <Bar data={props.data} options={props.options || options}/>
  )
}