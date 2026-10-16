
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { Rag } from '../Rag/Rag'
import './Home.css'

export const Home = () => {
    return (
        <main className="home-page">

            {/* Hero */}
            <section className="home-hero">
                <span className="home-eyebrow">
                    WINE, DATA & DISCOVERY
                </span>

                <h1>
                    A different perspective
                    <br />
                    on <span>wine.</span>
                </h1>

                <p className="hero-description">
                    Explore the stories behind wine scores, prices
                    and varieties. Discover what the data reveals
                    and ask questions along the way.
                </p>

              

                <div className="hero-decoration" aria-hidden="true">
                    <span>W</span>
                </div>
            </section>


            {/* Explore the data */}
            <section className="explore-section" id="explore">
                <div className="section-heading">
                    <div>
                        <span className="section-eyebrow">
                            THE COLLECTION
                        </span>
                        <h2>Explore the data</h2>
                    </div>

                    <p>
                        Four ways to look closer at the world of wine.
                    </p>
                </div>

                <div className="explore-grid">

                    <Link to="/average" className="explore-card">
                        <span className="explore-number">01</span>
                        <h3>Average Scores</h3>
                        <p>Compare wine ratings across countries.</p>
                        <ArrowUpRight className="explore-arrow" size={20} />
                    </Link>

                    <Link to="/price" className="explore-card">
                        <span className="explore-number">02</span>
                        <h3>Price vs Points</h3>
                        <p>Explore the relationship between price and score.</p>
                        <ArrowUpRight className="explore-arrow" size={20} />
                    </Link>

                    <Link to="/topwines" className="explore-card">
                        <span className="explore-number">03</span>
                        <h3>Top Wines</h3>
                        <p>Discover the highest-rated wines.</p>
                        <ArrowUpRight className="explore-arrow" size={20} />
                    </Link>

                    <Link to="/count" className="explore-card">
                        <span className="explore-number">04</span>
                        <h3>Wine Count</h3>
                        <p>Explore the wines represented in the dataset.</p>
                        <ArrowUpRight className="explore-arrow" size={20} />
                    </Link>

                </div>
            </section>


            {/* AI chat */}
            <section className="ai-section">
                <div className="ai-intro">
                    <span className="section-eyebrow">
                        <Sparkles size={14} />
                        YOUR WINE COMPANION
                    </span>

                    <h2>
                        Curious about wine?
                        <br />
                        <span>Let's find out.</span>
                    </h2>

                    <p>
                        Ask a question and let the Wine Lab assistant
                        help you explore wine knowledge using AI.
                    </p>
                </div>

                <div className="ai-chat-card">
                    <div className="chat-card-heading">
                        <div className="chat-status-dot" />
                        <span>Wine Lab Assistant</span>
                        <span className="chat-ai-label">AI</span>
                    </div>

                    <p className="chat-prompt">
                        What would you like to know?
                    </p>

                    <Rag />
                </div>
            </section>

            <footer className="home-footer">
                <span>Wine Lab</span>
                <span>Explore. Discover. Enjoy.</span>
            </footer>

        </main>
    )
}

export default Home
