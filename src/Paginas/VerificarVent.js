import React, { useEffect, useState } from "react";
import CajaItem from "./componentes/CajaItem";
import Chip from "@mui/material/Chip";
import app from "../Servicios/firebases";
import { getDatabase, ref, onValue } from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";
import { getMessaging } from "firebase/messaging";


function VerificarVent() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const database = getDatabase(app);

  const handleChipClick = (chipValue) => {
    setSelectedChip(chipValue === selectedChip ? null : chipValue);
  };
  const fetchData = () => {
    let da = [];

    setLoading(true); // Set loading state to true when fetching data

    const databaseRef = ref(database, "GE/Ventas");
    onValue(databaseRef, (snapshot) => {
      Object.values(snapshot.val()).forEach((estado) => {
        da.push(estado);
      });
      setData(da);
      setLoading(false); // Set loading state to true when fetching data
    });
  };
  useEffect(() => {
    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, []);
  return (
    <div style={{ padding: 8 }}>
      <Chip
        label="Retirados"
        style={{ marginRight: "8px" }} // Add horizontal margin
        clickable
        onClick={() => handleChipClick("Option 1")}
        color={selectedChip === "Option 1" ? "warning" : "default"}
      />

      <Chip
        label="Enviados"
        clickable
        style={{ marginRight: "8px" }} // Add horizontal margin
        onClick={() => handleChipClick("Option 2")}
        color={selectedChip === "Option 2" ? "warning" : "default"}
      />
      <div style={{ marginTop: 10 }}>
        <CajaItem dats={data} venta={true} />
      </div>
    </div>
  );
}

export default VerificarVent;
