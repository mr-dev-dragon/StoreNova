import express from "express";
import fetch from "node-fetch"; // If Node >=18, you can use global fetch

const app = express();
const PORT = 3000;
const API_KEY = "XpDNOzyfKczk0wvv4xIPbQ==MlQIbya1b0NvETkl";

app.use(express.json());

// --- Fetch cars from API Ninjas ---
async function fetchCars(params) {
  const query = new URLSearchParams(params).toString();
  const url = `https://api.api-ninjas.com/v1/cars?${query}`;

  const res = await fetch(url, {
    headers: { "X-Api-Key": API_KEY },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

// --- GET /cars => search/filter/sort ---
app.get("/cars", async (req, res) => {
  try {
    const apiData = await fetchCars(req.query);

    // Filtering (local)
    let data = apiData;

    if (req.query.min_year) {
      data = data.filter((c) => c.year >= Number(req.query.min_year));
    }
    if (req.query.max_year) {
      data = data.filter((c) => c.year <= Number(req.query.max_year));
    }

    // Sorting
    if (req.query.sort_by) {
      const field = req.query.sort_by;
      const order = req.query.order === "desc" ? -1 : 1;

      data = data.sort((a, b) => {
        if (a[field] > b[field]) return order;
        if (a[field] < b[field]) return -order;
        return 0;
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Example: Get makes ---
app.get("/makes", async (req, res) => {
  try {
    const url = "https://api.api-ninjas.com/v1/carmakes";
    const r = await fetch(url, { headers: { "X-Api-Key": API_KEY } });
    const json = await r.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
