import './Topwines.css'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { toast } from 'react-toastify'
import { wineService } from '../../service/wineService'
import Select from 'react-select'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export const Topwines = () => {


    const [wines, setWines] = useState([])
    const [varieties, setVarieties] = useState([])
    const [selectedVariety, setSelectedVariety] = useState("all")

    const [limit, setLimit] = useState()


    useEffect(() => {
        //Fetching wines from database
        const fetchWines = async () => {
            try {
                const data = await wineService.getTopWines()
                setWines(data)
            } catch (err) {
                toast.error('Could not fetch wines. Please try again later!')
            }
        }

        //Fetching the different varietes
        const fetchVarieties = async () => {
            try {
                const dataVarieties = await wineService.getVarieties()
                setVarieties(dataVarieties)
            } catch (err) {
                toast.error('Could not fetch varieties. Please try again later!')
            }
        }
        fetchWines()
        fetchVarieties()
    }, [])


    //When filter changes changes
    useEffect(() => {
        const fetchFilteredWines = async () => {
            const query = buildQuery({
                variety: selectedVariety !== "all" ? selectedVariety : undefined,
                limit: limit
            })
            try {
                const data = await wineService.getTopWines(query)
                if (data.length === 0) {
                    toast.info("No wines matched your filter criteria.")
                }
                setWines(data)
            } catch {
                toast.error("Could not fetch the filtered wines. Please try again later!")
            }
        }

        fetchFilteredWines()
    }, [selectedVariety, limit])

    const buildQuery = ({ variety, limit }) => {
        const params = new URLSearchParams()
        if (variety?.length) params.append("variety", variety)
        if (limit) params.append("limit", limit)
        return params.toString()
    }


    const chartData = {
        labels: wines.map(item => item.title),
        datasets: [
            {
                label: 'Points',
                data: wines.map(item => item.points),
                backgroundColor: 'rgba(191, 145, 19, 0.5)'
            }
        ]
    }

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Top Wines'
            }
        }
    }



    return (
        <div>
            <h1 className='title'>Top Wines</h1>

            <p className='welcome-text-one'>The highest ranked wines in our database! 100 is the highest rank. </p>

            <div className="chart-wine-container">
                <Bar data={chartData} options={options} />
            </div>

            <div className='controls'>

                <Select
                    options={[{ value: "all", label: "All Varieties" }, ...varieties.map(c => ({ value: c, label: c }))]}
                    value={{ value: selectedVariety, label: selectedVariety === "all" ? "All Varieties" : selectedVariety }}
                    onChange={(option) => setSelectedVariety(option.value)}
                    className="country-price-select"
                    placeholder="Select variety..."
                />

                <input
                    type='number'
                    max={100}
                    onChange={(e) => {
                        const val = Math.min(parseFloat(e.target.value), 100)
                        setLimit(val)
                    }}
                    placeholder="Limit (max 100)..."
                />

            </div>


        </div>


    )
}

export default Topwines