
import './Count.css'

export const Count = () => {
    return (
        <main className="count-page">
            <header className="page-header">
                <span className="page-eyebrow">WINE DATA</span>

                <h1>Wine Count by Region</h1>

                <p>
                    Explore the distribution of wines across different
                    regions and discover where the collection comes from.
                </p>
            </header>

            <section className="count-placeholder">
                <div className="count-placeholder-icon">
                    <span>✳</span>
                </div>

                <span className="count-status">COMING SOON</span>

                <h2>A closer look at wine regions</h2>

                <p>
                    This part of the Wine Lab is still in the works.
                    Soon, you'll be able to explore how wines are
                    distributed across regions.
                </p>
            </section>
        </main>
    )
}

export default Count
