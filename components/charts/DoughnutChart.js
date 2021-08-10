import { Doughnut } from 'react-chartjs-2'

const options = {
  plugins: {   
    legend: {
      align: 'start',
    },
  },
}

export default function DoughnutChart(props) {
  return (
    <Doughnut {...props} options={props.options || options}/>
  )
}