import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { toast } from 'react-toastify'
import { wineService } from '../../service/wineService'
import './Average.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const Average = () => {
  const [wines, setWines] = useState([])

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await wineService.getAverageCount()
        setWines(data)
      } catch (err) {
        toast.error('Could not fetch wines. Please try again later.')
      }
    }

    fetchWines()
  }, []) 

  if (!wines.length) return <p>Loading...</p>

  const chartData = {
    labels: wines.map(item => item.country),
    datasets: [
      {
        label: 'Average Wine Score',
        data: wines.map(item => item.avgPoints), 
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }
    ]
  }

  const options = {
    /* indexAxis: 'y', */
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Average Wine Score per Country'
      }
    }
  }

  return  <div className="chart-container">
    <Bar data={chartData} options={options} />
  </div>
}
