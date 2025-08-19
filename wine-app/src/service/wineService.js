import axios from 'axios'

const url = import.meta.env.VITE_API_URL 

export const wineService = {
    getAverageCount: async () => {
        try {
            const response = await axios.get(`${url}/wines/avg-score-by-country`)
            return response.data
        } catch (error) {
            console.error('Error fetching average count:', error)
            throw error
        }
    },
    getPriceVsPoint: async (query) => {
        try {
            const response = await axios.get(`${url}/wines/price-vs-points?${query}`)
            return response.data
        } catch (error) {
            console.error('Error fetching average count:', error)
            throw error
        }
    },
    askQuestion: async (question) => {
        try {
            const response = await axios.post(`${url}/rag/query`, { question: question })
              console.log("🧠 Received RAG question:", question);
            return response.data
        } catch (error) {
            console.error('Error asking question:', error)
            throw error
        }
    }
}