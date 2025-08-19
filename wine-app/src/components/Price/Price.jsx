import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    plugins
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { wineService } from '../../service/wineService'
import { Scatter } from 'react-chartjs-2'
import './Price.css'
import { toast } from 'react-toastify'
import Select from 'react-select'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, zoomPlugin)



export const Price = () => {

    const [wines, setWines] = useState([])

    const [countries, setCountries] = useState([])
    const [varieties, setVarieties] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("all")
    const [selectedVariety, setSelectedVariety] = useState("all")

    const [maxPrice, setMaxPrice] = useState()
    const [minPoints, setMinPoints] = useState()





    useEffect(() => {
        //Fetching wines from database
        const fetchWines = async () => {

            try {
                const data = await wineService.getPriceVsPoint()

                setWines(data)

            } catch (err) {

                toast.error('Could not fetch wines. Please try again later!')
                console.log(err.message)

            }
        }

        const fetchCountriesAndVarieties = async () => {
            try {
                const dataCountries = await wineService.getCountries()
                const dataVarieties = await wineService.getVarieties()

                setCountries(dataCountries)
                setVarieties(dataVarieties)

            } catch (err) {

                toast.error('Could not fetch countries and varieties. Please try again later!')

            }
        }

        fetchWines()
        fetchCountriesAndVarieties()

    }, [])

    //When filter changes changes
    useEffect(() => {
        const fetchFilteredWines = async () => {
            const query = buildQuery({
                country: selectedCountry !== "all" ? selectedCountry : undefined,
                variety: selectedVariety !== "all" ? selectedVariety : undefined,
                maxPrice: maxPrice,
                minPoints: minPoints
            })
            try {
                const data = await wineService.getPriceVsPoint(query)
                setWines(data)
            } catch {
                toast.error("Could not fetch the filtered wines. Please try again later!")
            }
        }

        fetchFilteredWines()
    }, [selectedCountry, selectedVariety, minPoints, maxPrice])




    const buildQuery = ({ country, variety, maxPrice, minPoints }) => {
        const params = new URLSearchParams()
        if (country?.length) params.append("country", country)
        if (variety?.length) params.append("variety", variety)
        if (maxPrice) params.append("maxPrice", maxPrice)
        if (minPoints) params.append("minPoints", minPoints)
        return params.toString()
    }

    const counts = {}
    wines.forEach(w => {
        const key = `${w.price}-${w.points}`
        counts[key] = (counts[key] || 0) + 1
    })





    const chartData = {
        datasets: [
            {
                label: 'Price vs Points',
                data: wines.map(w => ({ x: w.price, y: w.points })),
                backgroundColor: 'rgba(191, 145, 19, 0.5)',
                pointRadius: wines.map(w => {
                    const key = `${w.price}-${w.points}`
                    return 2 + counts[key] * 2
                })
            }
        ]
    }


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Wine Price vs Points'
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const wine = wines[context.dataIndex]
                        return `${wine.title} (${wine.country}, ${wine.variety}) - $${wine.price}, ${wine.points} pts`
                    }
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy'
                }

            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Price ($)' }
            },
            y: {
                title: { display: true, text: 'Points' }
            }
        }
    }






    return (
        <div>
            <h1 className='title'>Price vs Points</h1>

            <p className='welcome-text-one'> Here you can find the best rated wines, to the lowest price! Best of both worlds! </p>

            <div className='chart-scatter-container'>
                <Scatter data={chartData} options={options} />

            </div>

            <div className='controls'>

                <Select
                    options={[{ value: "all", label: "All Countries" }, ...countries.map(c => ({ value: c, label: c }))]}
                    value={{ value: selectedCountry, label: selectedCountry === "all" ? "All Countries" : selectedCountry }}
                    onChange={(option) => setSelectedCountry(option.value)}
                    className="country-price-select"
                    placeholder="Select country..."
                />


                <Select
                    options={[{ value: "all", label: "All Varieties" }, ...varieties.map(c => ({ value: c, label: c }))]}
                    value={{ value: selectedVariety, label: selectedVariety === "all" ? "All Varieties" : selectedVariety }}
                    onChange={(option) => setSelectedVariety(option.value)}
                    className="country-price-select"
                    placeholder="Select variety..."
                />

                <input
                    type='number'
                    onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                    placeholder="Select maximum price..."
                />

                <input
                    type='number'
                    onChange={(e) => setMinPoints(parseFloat(e.target.value))}
                    placeholder="Select minimum points..."
                />



            </div>


        </div >


    )
}

export default Price