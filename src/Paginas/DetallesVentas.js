import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import ProductosCard from "./componentes/ProductosCard";
import { useParams } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";
import app from "../Servicios/firebases";

const DetallesCompra = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const [userData, setUserData] = useState([]);
  const [carddata, setcarddata] = useState([]);

  const [extractedData, setExtractedProductos] = useState(null);
  const theme = useTheme();
  const database = getDatabase(app);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { codigo, contexto } = useParams(); // Access the URL parameter

  console.log(codigo);

  useEffect(() => {
    let da = [];
    const fetchData = () => {
      setLoading(true); // Set loading state to true when fetching data

      const databaseRef = ref(database, `GE/Ventas/${codigo}`);
      onValue(databaseRef, (snapshot) => {
        setData(snapshot.val());

        setLoading(false); // Set loading state to true when fetching data
      });
    };

    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, []); // Empty dependency array means this effect runs once after the component mounts
  useEffect(() => {
    if (data.length !== 0) {
      const fetchData = () => {
        const databaseRef = ref(
          database,
          `GE/Vendedores/${data.Vendedor}/MisVentas/${codigo}`
        );
        onValue(databaseRef, (snapshot) => {
          console.log(snapshot.val(), "existe");
          setcarddata([snapshot.val()]);
        });
      };

      fetchData();
    }

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, [data]); // Empty dependency array means this effect runs once after the component mounts

  return (
    <>
      <Box sx={{ marginLeft: "10px" }}>
        <Grid item xs={6}>
          <h2>INFORMACION DE LA COMPRA</h2>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "gray" }}>
                  Codigo
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{data.CompraId}</Typography>
              </Grid>
            </Grid>
          </Box>{" "}
          <ProductosCard data={carddata} />
          {data.Imagen !== null ? (
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "50%", height: "50%" }}>
                <img
                  src={data?.Imagen}
                  alt="Image"
                  style={{
                    width: "100%",
                    height: "50%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          ) : null}
        </Grid>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "20px", marginRight: "14px" }}
          >
            ENVIADO
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ borderRadius: "10px", marginRight: "14px" }}
          >
            Error
          </Button>
        </div>
      </Box>
    </>
  );
};

export default DetallesCompra;
