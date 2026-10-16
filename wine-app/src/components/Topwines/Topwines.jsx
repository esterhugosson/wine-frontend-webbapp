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
    const [loading, setLoading] = useState(false)
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
    const handleSearch = async () => {
        const query = buildQuery({
            variety: selectedVariety !== "all" ? selectedVariety : undefined,
            limit
        })
        try {
            setLoading(true)
            const data = await wineService.getTopWines(query)
            if (data.length === 0) {
                toast.info("No wines matched your filter criteria.")
            }
            setWines(data)
        } catch {
            toast.error("Could not fetch the filtered wines. Please try again later!")
        } finally {
            setLoading(false)
        }
    }

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
            backgroundColor: 'rgba(114, 47, 55, 0.7)',
            borderColor: '#722f37',
            borderWidth: 1,
            borderRadius: 5,
            barPercentage: 0.75,
            categoryPercentage: 0.8
        }
    ]
}

    const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false
        },

        title: {
            display: true,
            text: 'Highest-Rated Wines',
            color: '#451c22',
            font: {
                family: 'Georgia, serif',
                size: 18,
                weight: '600'
            },
            padding: {
                bottom: 24
            }
        },

        tooltip: {
            backgroundColor: '#451c22',
            titleColor: '#fffaf6',
            bodyColor: '#f7f4ef',
            padding: 12,
            cornerRadius: 8
        }
    },

    scales: {
        x: {
            min: 0,
            max: 100,
            title: {
                display: true,
                text: 'Wine score',
                color: '#77706b'
            },
            ticks: {
                color: '#77706b'
            },
            grid: {
                color: 'rgba(69, 28, 34, 0.07)'
            },
            border: {
                display: false
            }
        },

        y: {
            ticks: {
                color: '#5d5651',
                font: {
                    family: 'Inter, sans-serif',
                    size: 11
                }
            },
            grid: {
                display: false
            },
            border: {
                display: false
            }
        }
    }
}



    
return (
    <main className="topwines-page">

        <header className="page-header">
            <p className="eyebrow">WINE DATA</p>

            <h1>Top Wines</h1>

            <p>
                Discover the highest-rated wines in the dataset.
                Explore standout bottles and compare their scores.
            </p>
        </header>

        <section className="chart-card topwines-chart-card">
            <Bar data={chartData} options={options} />
        </section>

        <section className="topwines-filters filter-card">
            <div className="filter-section-heading">
                <div>
                    <span className="filter-label">Refine your ranking</span>
                    <p>
                        Choose a grape variety and the number of wines to display.
                    </p>
                </div>
            </div>

            <div className="topwines-filter-grid">

                <div className="topwines-filter-field">
                    <label htmlFor="topwine-variety">Grape variety</label>

                    <Select
                        inputId="topwine-variety"
                        className="topwine-variety-select"
                        classNamePrefix="wine-select"
                        options={[
                            { value: "all", label: "All Varieties" },
                            ...varieties.map(c => ({ value: c, label: c }))
                        ]}
                        value={{
                            value: selectedVariety,
                            label: selectedVariety === "all"
                                ? "All Varieties"
                                : selectedVariety
                        }}
                        onChange={option =>
                            setSelectedVariety(option?.value ?? "all")
                        }
                        placeholder="Select variety..."
                    />
                </div>

                <div className="topwines-filter-field">
                    <label htmlFor="topwine-limit">Number of wines</label>
                    <input
                        id="topwine-limit"
                        type="number"
                        min="1"
                        max="100"
                        value={limit ?? ""}
                        onChange={e => {
                            const value = e.target.value
                            setLimit(
                                value === ""
                                    ? undefined
                                    : Math.min(100, Math.max(1, Number(value)))
                            )
                        }}
                        placeholder="Up to 100"
                    />
                </div>

            </div>

            <div className="topwines-filter-actions">
                <span className="filter-hint">
                    {loading
                        ? "Updating ranking..."
                        : "Apply your choices to update the chart."}
                </span>

                <button
                    className="primary-action"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Apply filters"}
                </button>
            </div>
        </section>

    </main>
)

}

export default Topwines