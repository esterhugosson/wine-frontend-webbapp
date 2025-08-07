import { wineService } from "../../service/wineService"
import { toast } from 'react-toastify'
import { useState } from 'react'
import './Rag.css'

// Rag component for asking questions about wine
// Uses a form to submit questions and displays answers with sources
// Handles loading state and error messages
export const Rag = () => {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false)

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setAnswer("")

        console.log("Asking question:", question)

        try {
            const res = await wineService.askQuestion(question)
            setAnswer(res.answer)
            setSources(res.sources)
        } catch (err) {
            toast.error("Error fetching answer. Please try again later.")
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="chat-cont">
            <form onSubmit={handleSubmit} className="form-rag">
                <input
                    type="text"
                    value={question}
                    placeholder="Ask about wine..."
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                >
                    Ask
                </button>
            </form>

            {loading && <p>Thinking...</p>}

            {answer && (
                <div className="answer-div">
                    <p><strong>Answer:</strong></p>
                    <p>{answer}</p>

                    
                </div>
            )}
        </div>
    )

}