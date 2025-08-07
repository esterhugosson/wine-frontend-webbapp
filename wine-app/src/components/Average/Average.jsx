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
import Select from 'react-select'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const Average = () => {
  const [wines, setWines] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedCountries, setSelectedCountries] = useState([])

  const [countryOptions, setCountryOptions] = useState([])

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await wineService.getAverageCount()
        setWines(data)

        const allCountries = [...new Set(data.map(w => w.country))]
        const options = allCountries.map(country => ({ value: country, label: country }))

        setCountryOptions(options)
        setSelectedCountries(allCountries) // select all initially
      } catch (err) {
        toast.error('Could not fetch wines. Please try again later.')
      }
    }

    fetchWines()
  }, [])

  const filteredData = wines
    .filter(wine =>
      selectedCountries.length === 0 || selectedCountries.includes(wine.country)
    )
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.avgPoints - b.avgPoints
        : b.avgPoints - a.avgPoints
    })

  const chartData = {
    labels: filteredData.map(item => item.country),
    datasets: [
      {
        label: 'Average Wine Score',
        data: filteredData.map(item => item.avgPoints),
        backgroundColor: 'rgba(191, 145, 19, 0.5)'
      }
    ]
  }

  const options = {
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

  const handleSelectAll = () => {
    setSelectedCountries(countryOptions.map(option => option.value))
  }

  const handleDeselectAll = () => {
    setSelectedCountries([])
  }

  return (
    <>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>

      <div className="controls">
        <div className="country-filter">
          <label>Filter by Country:</label>

          <div className="select-buttons">
            <button onClick={handleSelectAll}>Select All</button>
            <button onClick={handleDeselectAll}>Deselect All</button>
          </div>

          <Select
            isMulti
            options={countryOptions}
            value={countryOptions.filter(option => selectedCountries.includes(option.value))}
            onChange={selectedOptions => {
              setSelectedCountries(selectedOptions.map(option => option.value))
            }}
            className="country-select"
            placeholder="Select countries..."
          />
        </div>

        <div className="sort-filter">
          <label>
            Sort by Score:
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
          </label>
        </div>
      </div>
    </>
  )
}
