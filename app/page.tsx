"use client";
import { useEffect, useState } from "react";
import EmployeeTable from "./components/EmployeeTable";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      })
      .catch((err) => setError("Failed to fetch data: " + err.message));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Zoho Employees</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <EmployeeTable data={data} />
      )}
    </div>
  );
}
