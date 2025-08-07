import axios from 'axios'

const url = import.meta.env.VITE_API_URL 

export const wineService = {
    getAverageCount: async () => {
        try {
            const response = await axios.get(`${url}/avg-score-by-country`)
            return response.data
        } catch (error) {
            console.error('Error fetching average count:', error)
            throw error
        }
    }
}