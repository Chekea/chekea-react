import { Box, Button, Grid } from "@mui/material";
import React from "react";

function ProductosCard({ data, enviado }) {
  const passToParent = (item) => {
    console.log("kiee", item);
    if (item.Estado === "Enviado") {
      enviado(item, "Retirado");
    } else {
      enviado(item, "Enviado");
    }
  };
  return data.map((item) => (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10}>
        <div style={{ marginTop: 15 }}>
          {item.Estado !== "Comprado" ? (
            <div style={{ paddingLeft: "10px" }}>
              <Button
                onClick={() => passToParent(item)}
                variant="contained"
                color="primary"
                style={{
                  borderRadius: "20px",
                  marginRight: "14px",
                }}
              >
                {item.Estado === "Enviado" ? "Retirado" : "Enviado"}
              </Button>
            </div>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              p={1}
              borderRadius={8}
              boxShadow={3}
              width="100%" // Set width to 100%
            >
              <img
                src={item.Imagen}
                alt="Sample"
                style={{
                  borderRadius: "30%",
                  width: "100%",
                  maxWidth: "80px",
                  marginRight: "16px",
                }}
              />
              <div>
                <h3>{item.Titulo}</h3>
                <p>{item.Detalles}</p>
              </div>
              {item.contexto === "Nacional" ? (
                <div style={{ paddingLeft: "10px" }}>
                  <Button
                    onClick={() => passToParent(item)}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "20px",
                      marginRight: "14px",
                    }}
                  >
                    {"Enviado"}
                  </Button>
                </div>
              ) : null}
            </Box>
          )}
        </div>
      </Grid>
    </Grid>
  ));
}

export default ProductosCard;
