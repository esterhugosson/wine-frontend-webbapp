
# 🍷 Wine Lab

**An interactive wine analytics platform combining data visualization with AI-powered exploration.**

Wine Lab is a full-stack web application that lets users explore wine data through interactive charts, compare prices with ratings, discover highly rated wines, and ask questions about the dataset using an AI-powered chatbot.

The project combines frontend development, backend APIs, database management, data visualization, and retrieval-augmented generation (RAG) in one application.

## ✨ Features

- **Wine analytics dashboard** — Explore wine data through interactive visualizations.
- **Average scores by country** — Compare wine ratings across countries and filter the results.
- **Price vs. points** — Investigate the relationship between wine prices and ratings using a scatter plot, with filtering and zooming.
- **Top-rated wines** — Explore highly rated wines and filter results by grape variety or result limit.
- **Wine count by region** — Planned feature for exploring the distribution of wines across regions.
- **AI-powered wine chatbot** — Ask natural-language questions about the wine dataset using a RAG-based approach.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Chart.js and react-chartjs-2
- React Select
- React Toastify
- CSS

### Backend and Data
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI and Search
- OpenAI API
- Pinecone vector database
- Retrieval-Augmented Generation (RAG)
- Text embeddings

## 🧠 AI-Powered Wine Exploration

Wine Lab includes a chatbot designed to answer questions about wine data.

The RAG approach combines relevant information retrieved from a vector database with a language model to generate contextual answers. This connects the AI functionality to the project's underlying data rather than relying only on general model knowledge.

## 📊 Data Visualization

The analytics pages use interactive charts to make wine data easier to explore:

- Bar charts for comparing average ratings.
- Scatter plots for exploring the relationship between price and points.
- Horizontal bar charts for comparing top-rated wines.

Filters allow users to narrow the results and investigate specific parts of the dataset.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Access to the backend API
- MongoDB and any required AI service credentials if running the full application locally

## 🔗 Links

- **GitHub — Frontend:** [View source code](https://github.com/esterhugosson/wine-frontend-webbapp)
- **GitHub — Backend:** [View backend repository](https://github.com/esterhugosson/rag-express-api)
- **Live Demo:** [Explore Wine Lab](https://clinquant-sawine-ea3d36.netlify.app/)

## 🎯 Project Goals

Wine Lab was developed as a portfolio project to practise and demonstrate:

- Building responsive user interfaces with React.
- Designing and consuming REST APIs.
- Working with MongoDB and data aggregation.
- Creating interactive data visualizations.
- Integrating AI APIs and vector search into a full-stack application.
- Structuring maintainable application code across frontend and backend components.

## 👩‍💻 Author

**Ester Hugosson**

Web Developer | Full-Stack Development

[GitHub](https://github.com/esterhugosson)

---

*Built as a portfolio project · 2026*
