import React, { useEffect, useState } from "react";
import CajaItem from "./componentes/CajaItem";
import Chip from "@mui/material/Chip";
import {
  getDatabase,
  ref,
  onValue,
  limitToLast,
  query,
} from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";

import app from "./../Servicios/firebases";
function Exterior() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const database = getDatabase(app);

  const handleChipClick = (chipValue) => {
    setSelectedChip(chipValue === selectedChip ? null : chipValue);
  };
  const fetchData = () => {
    setLoading(true); // Set loading state to true when fetching data

    const databaseRef = ref(database, "GE/Compras/Exterior");
    const queryRef = query(databaseRef, limitToLast(10));

    onValue(
      queryRef,
      (snapshot) => {
        const data = Object.values(snapshot.val() || {});
        setData(data);
        setLoading(false); // Set loading state to false after data is fetched
      },
      (error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false even if there's an error
      }
    );
  };
  useEffect(() => {
    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div style={{ padding: 8 }}>
      <div style={{ marginTop: 10 }}>
        {loading ? ( // Display CircularProgress if loading is true
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <CajaItem dats={data} venta={false} />
        )}
      </div>
    </div>
  );
}

export default Exterior;
