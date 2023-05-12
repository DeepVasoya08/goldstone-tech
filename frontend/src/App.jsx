import { useEffect, useState } from "react";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading(true);
        const res = await fetch("http://localhost:9000/");
        setData(await res.json());
        isLoading(false);
      } catch (error) {
        alert(error.message);
        isLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id, field, value) => {
    isLoading(true);
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    await fetch(`http://localhost:9000/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ [field]: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setData(updatedData);
    isLoading(false);
  };

  const handleExport = async () => {
    window.location.href = "http://localhost:9000/export";
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <Table data={data} onHandleUpdate={handleUpdate} />
        ) : (
          <p>No data found.</p>
        )}
      </div>
      <button
        style={{
          margin: "5px",
          padding: "5px",
          color: "green",
          borderRadius: "3px",
          height: "30px",
        }}
        onClick={handleExport}
      >
        Export
      </button>
    </>
  );
}

export default App;
