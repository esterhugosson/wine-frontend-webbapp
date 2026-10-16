import { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { wineService } from "../../service/wineService";
import { Scatter } from "react-chartjs-2";
import "./Price.css";
import { toast } from "react-toastify";
import Select from "react-select";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  zoomPlugin,
);

export const Price = () => {
  const [wines, setWines] = useState([]);

  const [countries, setCountries] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedVariety, setSelectedVariety] = useState("all");

  const [maxPrice, setMaxPrice] = useState();
  const [minPoints, setMinPoints] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Fetching wines from database
    const fetchWines = async () => {
      try {
        const data = await wineService.getPriceVsPoint();

        setWines(data);
      } catch (err) {
        toast.error("Could not fetch wines. Please try again later!");
        console.log(err.message);
      }
    };

    const fetchCountriesAndVarieties = async () => {
      try {
        const dataCountries = await wineService.getCountries();
        const dataVarieties = await wineService.getVarieties();

        setCountries(dataCountries);
        setVarieties(dataVarieties);
      } catch (err) {
        toast.error(
          "Could not fetch countries and varieties. Please try again later!",
        );
      }
    };

    fetchWines();
    fetchCountriesAndVarieties();
  }, []);

  //When filter changes, handle search
  const handleSearch = async () => {
    const query = buildQuery({
      country: selectedCountry !== "all" ? selectedCountry : undefined,
      variety: selectedVariety !== "all" ? selectedVariety : undefined,
      maxPrice,
      minPoints,
    });
    try {
      setLoading(true);
      const data = await wineService.getPriceVsPoint(query);
      if (data.length === 0) {
        toast.info("No wines matched your filter criteria.");
      }
      setWines(data);
    } catch {
      toast.error(
        "Could not fetch the filtered wines. Please try again later!",
      );
    } finally {
      setLoading(false);
    }
  };
  const buildQuery = ({ country, variety, maxPrice, minPoints }) => {
    const params = new URLSearchParams();
    if (country?.length) params.append("country", country);
    if (variety?.length) params.append("variety", variety);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minPoints) params.append("minPoints", minPoints);
    return params.toString();
  };

  const counts = useMemo(() => {
    const map = {};
    wines.forEach((w) => {
      const key = `${w.price}-${w.points}`;
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [wines]);

  const chartData = {
    datasets: [
      {
        label: "Price vs Points",
        data: wines.map((w) => ({ x: w.price, y: w.points })),
        backgroundColor: "rgba(114, 47, 55, 0.55)",
        borderColor: "#722f37",
        borderWidth: 1,
        pointRadius: wines.map((w) => {
          const key = `${w.price}-${w.points}`;
          return 2 + counts[key] * 2;
        }),
        pointHoverRadius: 7,
        pointHitRadius: 8,
      },
    ],
  };

 const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#77706b',
                usePointStyle: true,
                padding: 20,
                font: {
                    family: 'Inter, sans-serif',
                    size: 12
                }
            }
        },

        title: {
            display: true,
            text: 'Wine Price vs Points',
            color: '#451c22',
            font: {
                family: 'Georgia, serif',
                size: 18,
                weight: '600'
            },
            padding: {
                bottom: 24
            }
        },

        tooltip: {
            backgroundColor: '#451c22',
            titleColor: '#fffaf6',
            bodyColor: '#f7f4ef',
            padding: 12,
            cornerRadius: 8,
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
            title: {
                display: true,
                text: 'Price ($)',
                color: '#77706b'
            },
            ticks: {
                color: '#77706b'
            },
            grid: {
                color: 'rgba(69, 28, 34, 0.07)'
            },
            border: {
                display: false
            }
        },

        y: {
            title: {
                display: true,
                text: 'Points',
                color: '#77706b'
            },
            ticks: {
                color: '#77706b'
            },
            grid: {
                color: 'rgba(69, 28, 34, 0.07)'
            },
            border: {
                display: false
            }
        }
    }
}

  return (
    <main className="price-page">
      <header className="page-header">
        <p className="eyebrow">WINE DATA</p>

        <h1>Price vs Points</h1>

        <p>
          Does a higher price mean a better wine? Explore the relationship
          between wine prices and ratings.
        </p>
      </header>

      <section className="chart-card price-chart-card">
        <Scatter data={chartData} options={options} />
      </section>

      <section className="price-filters filter-card">
        <div className="filter-section-heading">
          <div>
            <span className="filter-label">Refine your search</span>
            <p>Adjust the filters to explore different wines.</p>
          </div>
        </div>

        <div className="price-filter-grid">
          <div className="price-filter-field">
            <label htmlFor="price-country">Country</label>
            <Select
              inputId="price-country"
              className="country-price-select"
              classNamePrefix="wine-select"
              options={[
                { value: "all", label: "All Countries" },
                ...countries.map((c) => ({ value: c, label: c })),
              ]}
              value={{
                value: selectedCountry,
                label:
                  selectedCountry === "all" ? "All Countries" : selectedCountry,
              }}
              onChange={(option) => setSelectedCountry(option?.value ?? "all")}
              placeholder="Select country..."
            />
          </div>

          <div className="price-filter-field">
            <label htmlFor="price-variety">Grape variety</label>
            <Select
              inputId="price-variety"
              className="country-price-select"
              classNamePrefix="wine-select"
              options={[
                { value: "all", label: "All Varieties" },
                ...varieties.map((c) => ({ value: c, label: c })),
              ]}
              value={{
                value: selectedVariety,
                label:
                  selectedVariety === "all" ? "All Varieties" : selectedVariety,
              }}
              onChange={(option) => setSelectedVariety(option?.value ?? "all")}
              placeholder="Select variety..."
            />
          </div>

          <div className="price-filter-field">
            <label htmlFor="max-price">Maximum price ($)</label>
            <input
              id="max-price"
              type="number"
              min="0"
              value={maxPrice ?? ""}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
              placeholder="Any price"
            />
          </div>

          <div className="price-filter-field">
            <label htmlFor="min-points">Minimum score</label>
            <input
              id="min-points"
              type="number"
              min="0"
              max="100"
              value={minPoints ?? ""}
              onChange={(e) =>
                setMinPoints(
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
              placeholder="Any score"
            />
          </div>
        </div>

        <div className="price-filter-actions">
          <span className="filter-hint">
            {loading
              ? "Updating wines..."
              : "Apply your filters to update the chart."}
          </span>

          <button
            className="primary-action"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Apply filters"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Price;
