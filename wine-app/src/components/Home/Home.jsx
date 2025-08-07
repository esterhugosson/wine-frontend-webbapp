import './Home.css'
import { Rag } from '../Rag/Rag'

export const Home = () => {

    return (
        <div>
            <h1 className='title'>The Wine Lab</h1>

            <p className='welcome-text-one'>Welcome to The Wine Lab, your go-to place for exploring the world of wines. Discover average wine scores, compare prices, and learn about the best varieties.</p>

            <p className='welcome-text-2'>Use the navigation bar to explore different sections of the app.</p>

            <h2 className='ask-me'> Ask me something about wine and I might answer</h2>
            <Rag />



        </div>


    )
}

export default Home