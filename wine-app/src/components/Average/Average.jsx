import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";
import { wineService } from "../../service/wineService";
import "./Average.css";
import Select from "react-select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const Average = () => {
  const [wines, setWines] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCountries, setSelectedCountries] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await wineService.getAverageCount();
        setWines(data);

        const allCountries = [...new Set(data.map((w) => w.country))];
        const options = allCountries.map((country) => ({
          value: country,
          label: country,
        }));

        setCountryOptions(options);
        setSelectedCountries(allCountries); // select all initially
      } catch (err) {
        toast.error("Could not fetch wines. Please try again later.");
      }
    };

    fetchWines();
  }, []);

  const filteredData = wines
    .filter(
      (wine) =>
        selectedCountries.length === 0 ||
        selectedCountries.includes(wine.country),
    )
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.avgPoints - b.avgPoints
        : b.avgPoints - a.avgPoints;
    });

  const chartData = {
    labels: filteredData.map((item) => item.country),
    datasets: [
      {
        label: "Average Wine Score",
        data: filteredData.map((item) => item.avgPoints),
        backgroundColor: "rgba(114, 47, 55, 0.65)",
        borderColor: "#722f37",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#77706b",
          font: {
            family: "Inter, sans-serif",
            size: 13,
          },
        },
      },

      title: {
        display: true,
        text: "Average Wine Score per Country",

        color: "#451c22",

        font: {
          family: "Georgia, serif",
          size: 18,
          weight: "600",
        },

        padding: {
          bottom: 24,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#77706b",
        },

        grid: {
          display: false,
        },
      },

      y: {
        ticks: {
          color: "#77706b",
        },

        grid: {
          color: "rgba(69, 28, 34, 0.08)",
        },
      },
    },
  };

  const handleSelectAll = () => {
    setSelectedCountries(countryOptions.map((option) => option.value));
  };

  const handleDeselectAll = () => {
    setSelectedCountries([]);
  };

  return (
    <main className="average-page">
      <header className="page-header">
        <p className="eyebrow">WINE DATA</p>

        <h1>Average Wine Score</h1>

        <p>Explore how wine scores vary across countries in the dataset.</p>
      </header>

      <section className="chart-card">
        <Bar data={chartData} options={options} />
      </section>

      <section className="controls">
        <div className="filter-card country-filter">
          <div className="filter-header">
            <div>
              <span className="filter-label">Countries</span>
              <p>Select the countries you want to compare.</p>
            </div>
          </div>

          <div className="select-buttons">
            <button onClick={handleSelectAll}>Select All</button>

            <button onClick={handleDeselectAll}>Deselect All</button>
          </div>

          <Select
            isMulti
            options={countryOptions}
            value={countryOptions.filter((option) =>
              selectedCountries.includes(option.value),
            )}
            onChange={(selectedOptions) => {
              setSelectedCountries(
                selectedOptions.map((option) => option.value),
              );
            }}
            className="country-select"
            placeholder="Select countries..."
          />
        </div>

        <div className="filter-card sort-filter">
          <div>
            <span className="filter-label">Sort by Score</span>
            <p>Change the order of the countries.</p>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Highest to Lowest</option>
            <option value="asc">Lowest to Highest</option>
          </select>
        </div>
      </section>
    </main>
  );
};
