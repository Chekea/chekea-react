import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import CajaItem from "./componentes/CajaItem";
import Chip from "@mui/material/Chip";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  limitToLast,
  update,
  runTransaction,
  get,
  endAt,
  startAt,
} from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";

import app from "./../Servicios/firebases";
import useNotificationListener, { analizar } from "../ayuda";
import {
  RemoveVaueDB,
  decrementValue,
  incrementValue,
} from "../Servicios/DBservices";
import { Button, IconButton } from "@mui/material";

const MemoizedCajaItem = memo(CajaItem);

function Nacional() {
  const [selectedChip, setSelectedChip] = useState(
    localStorage.getItem("selectedChip") || "Comprado"
  );
  const [loading, setLoading] = useState(true);
  const [endloading, setendloading] = useState(true);
  const [ultimo, setultimo] = useState("");

  const divRef = useRef(null);

  const database = getDatabase(app);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const handleChipClick = useCallback(
    (chipValue) => {
      setData([]);
      setLoading(true);

      if (selectedChip !== chipValue) {
        console.log(chipValue, selectedChip);
        let a = selectedChip;
        setSelectedChip(chipValue);
        fetchData("", chipValue);

        // if (data.length !== 0) {
        //   localStorage.setItem(`a${a}`, JSON.stringify(data));
        //   console.log("dentreo", chipValue);
        //   checkfetch(chipValue);
        // }
      }
    },
    [selectedChip]
  );
  useEffect(() => {
    // Store the state in local storage when the component unmounts
    return () => {
      localStorage.setItem("selectedChip", selectedChip);
      localStorage.setItem("data", JSON.stringify(data));
    };
  }, [selectedChip, data]);

  const fetchData = (codigo, estado) => {
    const databaseRef = ref(database, "GE/Compras/Nacional");
    let queryRef;

    if (data.length !== 0) {
      console.log("volvio 0");

      queryRef = query(
        databaseRef,
        orderByChild("Codigo"),
        endAt(codigo),
        limitToLast(6)
      );
    } else {
      console.log("volvio 1");

      queryRef = query(databaseRef, limitToLast(16));
    }

    get(queryRef)
      .then((snapshot) => {
        const newData = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (childData && !analizar(childData.Codigo, data)) {
            if (childData.Estado === estado) {
              console.log(childData.Estado, "an");

              newData.unshift(childData);
            }
          }
        });
        if (data.length !== 0) {
          console.log("mantenimiento");
          setData((old) => [...old, ...newData]);
        } else {
          setData(newData);
        }
        setLoading(false);

        if (newData.length === 0) {
          console.log("no existe");
          setendloading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleScroll = useCallback(() => {
    let valor = data.slice(-1)[0];

    if (
      divRef.current.scrollTop + divRef.current.clientHeight >=
      divRef.current.scrollHeight
    ) {
      console.log("end reach");

      fetchData(valor.Codigo, selectedChip);
    } else {
      console.log("not reached!");
    }
  }, [data.length]);

  useEffect(() => {
    divRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData("", selectedChip);

    return () => {
      // Unsubscribe from database
    };
  }, []);

  return (
    <div style={{ padding: 8, overflowY: "auto", height: "95vh" }} ref={divRef}>
      <Chip
        label="Comprado"
        style={{ marginRight: "8px" }}
        clickable
        onClick={() => handleChipClick("Comprado")}
        color={selectedChip === "Comprado" ? "primary" : "default"}
      />
      <Chip
        label="Enviado"
        clickable
        style={{ marginRight: "8px" }}
        onClick={() => handleChipClick("Enviado")}
        color={selectedChip === "Enviado" ? "primary" : "default"}
      />
      <Chip
        label="Retirado"
        clickable
        style={{ marginRight: "8px" }}
        onClick={() => handleChipClick("Retirado")}
        color={selectedChip === "Retirado" ? "primary" : "default"}
      />

      <div style={{ marginTop: 10 }}>
        {loading ? (
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
          <MemoizedCajaItem dats={data} venta={false} />
        )}
      </div>
    </div>
  );
}

export default Nacional;
