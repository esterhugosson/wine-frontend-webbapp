import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    ToolTip,
    Legend
} from 'chart.js'
import { wineService } from '../../service/wineService'
import { Scatter } from 'react-chartjs-2'
import './Price.css'
import { toast } from 'react-toastify'

ChartJS.register(LinearScale, PointElement, LineElement, ToolTip, Legend)

const config = {
    type: 'scatter',
    data: data,
    options: {
        scales: 'linear',
        position: 'bottom'
    }

}

export const Price = () => {

    const [query, setQuery] = useState()
    const [wines, setWines] = useState([])

    useEffect(() => {
        //Fetching wines from database
        const fetchWines = async(query) => {

            try {
                const data = await wineService.getPriceVsPoint(query)
                setWines(data)
            } catch(err) {

            toast.error('Could not fetch wines. Please try again later!')

            }
        } 

        fetchWines()
        
    }, [])



    return (
        <div>
            <h1 className='title'>Price vs Points</h1>

            <p className='welcome-text-one'> Here you can find the best rated wines, to the lowest price! Best of both worlds! </p>



        </div>


    )
}

export default Price