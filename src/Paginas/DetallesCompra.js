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
import { useNavigate, useParams } from "react-router";
import { getDatabase, ref, onValue, get } from "firebase/database";
import CircularProgress from "@mui/material/CircularProgress";
import app from "../Servicios/firebases";
import Alert from "./componentes/Alert";
import {
  RemoveVaue,
  RemoveVaueDB,
  UpdateDb,
  WriteDb,
  WriteDbPush,
  sendNotif,
} from "../Servicios/DBservices";
import { extract, sendNotification } from "../ayuda";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DetallesCompra = () => {
  const [loading, setLoading] = useState(true);
  const [enviado, setEnviado] = useState("");
  const [mensaje, setmensaje] = useState(
    "Seguro que ya se envio ese producto?"
  );

  const [data, setData] = useState(true);
  const [userData, setUserData] = useState([]);
  const [object, setobject] = useState(null);

  const [carddata, setcarddata] = useState([]);

  const [extractedData, setExtractedProductos] = useState(null);
  const theme = useTheme();
  const database = getDatabase(app);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { codigo, contexto } = useParams(); // Access the URL parameter
  const [open, setOpen] = useState(false);

  const handleOpen = (object) => {
    setOpen(true);
  };

  const receiveForChild = (object, botton) => {
    // checkear el estado si ya se envio o no
    setOpen(true);
    setEnviado(botton);
    if (botton === "Enviado") {
      setobject({
        ...object,
        Estado: "Enviado", // Update the value of Estado field
        Envio: new Date().getTime(),
      });
    } else {
      setmensaje(
        `Seguro que el producto de codigo ${extract(
          String(data.CompraId)
        )} ya fue retirado?\n\n PORFAVOR ASEGURESE!!!`
      );

      setobject({
        ...object,
        Estado: "Retirado", // Update the value of Estado field
        Retiro: new Date().getTime(),
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    // Handle confirm action

    if (enviado !== "Enviado") {
      RemoveVaueDB(
        `GE/Comprador/${data.Comprador}/MisCompras/Enviado/${object.Codigo}`
      )
        .then(() => {
          WriteDb(
            object,
            `GE/Comprador/${data.Comprador}/MisCompras/Retirado/${object.Codigo}`
          );
          UpdateDb({ Estado: "Retirado" }, `GE/Compras/Nacional/${codigo}`);
          WriteDbPush(
            {
              Id: data.Comprador,
              Mensaje: "Su producto ha sido retirado satisfactoriamente",
              Titulo: "Producto Retirado",
            },
            `GE/Notificaciones`
          );
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
          // Handle error situation here
        });
    } else {
      RemoveVaueDB(
        `GE/Comprador/${data.Comprador}/MisCompras/Verificando/${object.Codigo}`
      )
        .then(() => {
          WriteDb(
            object,
            `GE/Comprador/${data.Comprador}/MisCompras/Enviado/${object.Codigo}`
          ).then(() => {
            UpdateDb({ Estado: "Enviado" }, `GE/Compras/Nacional/${codigo}`);
            WriteDbPush(
              {
                Id: data.Comprador,
                Mensaje: "Su producto ha sido enviado satisfactoriamente",
                Titulo: "Producto Enviado",
              },
              `GE/Notificaciones`
            ); // enviar datos al nodo y hacer listening in cservices
          });
          // sendNotif(
          //   data.Comprador,
          //   "Producto Enviado",
          //   "Su producto ha sido enviado satisfactoriamente"
          // );

          // Handle success situation here
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
          // Handle error situation here
        });
    }

    handleClose();
  };

  useEffect(() => {
    let da = [];
    const fetchData = () => {
      setLoading(true); // Set loading state to true when fetching data

      const databaseRef = ref(database, `GE/Compras/${contexto}/${codigo}`);
      onValue(databaseRef, (snapshot) => {
        setData(snapshot.val());
        const productosArray = Object.values(snapshot.val().Productos);

        setUserData(productosArray);
        setLoading(false); // Set loading state to true when fetching data
      });
    };

    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData && userData.length !== 0) {
      const fetchData = (vendedor, codigo) => {
        let valor = data.Estado === "Comprado" ? "Verificando" : "Enviado";
        const databaseRef = ref(
          database,
          `GE/Comprador/${vendedor}/MisCompras/${valor}/${codigo}`
        );
        get(databaseRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setcarddata((prevData) => [...prevData, snapshot.val()]);
              console.log(snapshot.val());
              setHasFetchedData(true);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      userData.forEach((producto) => {
        const id = producto.id;
        const vendedor = data.Comprador;
        console.log(data.Comprador, "bohao");
        fetchData(vendedor, id);
      });

      // Update the state variable to indicate that data has been fetched
    }

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      // Unsubscribe from database
    };
  }, [userData, hasFetchedData]);
  const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };
  return (
    <div>
      {!loading ? (
        <div>
          <Alert
            open={open}
            message={mensaje}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />

          <Grid container>
            {!isMobile ? (
              // Horizontal layout for desktop
              <>
                <Grid item xs={6}>
                  <h2>{`INFORMACION COMPRA\n\nCodigo:${data.CompraId} `}</h2>

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
                          Nombre
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Barrio
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Contacto
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Lugar de Retiro
                        </Typography>

                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Intervalo
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{data.Nombre}</Typography>
                        <Typography variant="body1">
                          {data.Barrio === undefined
                            ? "Sin Especificar"
                            : data.Barrio}
                        </Typography>
                        <div style={{ display: "flex" }}>
                          <Typography variant="body1" marginRight={3}>
                            {data.Contacto}
                          </Typography>

                          <CopyToClipboard
                            text={data.Contacto}
                            onCopy={onCopyText}
                          >
                            <button>Copiar </button>
                          </CopyToClipboard>
                        </div>
                        <Typography variant="body1">
                          {data.RetiroLugar === undefined
                            ? "Sin Especificar"
                            : data.RetiroLugar}
                        </Typography>

                        <Typography variant="body1">
                          {data.Intervalo === undefined
                            ? "Sin Especificar"
                            : data.Intervalo}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

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
                  {data.Contexto === "Exterior" ? (
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
                        Comprado
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        style={{ borderRadius: "10px", marginRight: "14px" }}
                      >
                        Error
                      </Button>
                    </div>
                  ) : null}
                </Grid>
                {enviado === "" ? (
                  <Grid item xs={6}>
                    <h2>{`${carddata.length} PRODUCTOS COMPRADOS `}</h2>

                    <Box
                      sx={{
                        p: 2,

                        flexDirection: "row",
                      }}
                    >
                      <ProductosCard
                        data={carddata}
                        enviado={receiveForChild}
                      />
                    </Box>
                  </Grid>
                ) : null}
              </>
            ) : (
              // Vertical layout for mobile
              <div>
                <button
                  style={{
                    margin: 10,

                    background: "none", // Set background to none
                    border: "none", // Remove border
                  }}
                  onClick={handleBackClick}
                >
                  <ArrowBackIcon style={{ fontSize: 30 }} />
                  {/* Increase the size of the icon */}
                </button>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Grid item xs={10}>
                    <h2>{`INFORMACION COMPRA \n\nCodigo:${data.CompraId} `}</h2>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Nombre
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Barrio
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Contacto
                        </Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Lugar de Retiro
                        </Typography>

                        <Typography variant="body1" sx={{ color: "gray" }}>
                          Intervalo
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{data.Nombre}</Typography>
                        <Typography variant="body1">
                          {data.Barrio === undefined
                            ? "Sin Especificar"
                            : data.Barrio}
                        </Typography>
                        <Typography variant="body1">{data.Contacto}</Typography>
                        <Typography variant="body1">
                          {data.RetiroLugar === undefined
                            ? "Sin Especificar"
                            : data.RetiroLugar}
                        </Typography>

                        <Typography variant="body1">
                          {data.Intervalo === undefined
                            ? "Sin Especificar"
                            : data.Intervalo}
                        </Typography>
                      </Grid>
                    </Grid>
                    <ProductosCard data={carddata} enviado={receiveForChild} />
                  </Grid>
                </Box>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <div>
              {data.Estado === "Comprado" ? (
                data.Imagen !== null ? (
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
                        src={data.Imagen}
                        alt="Image"
                        style={{
                          width: "100%",
                          height: "50%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                ) : null
              ) : null}

              {data.Contexto === "Exterior" ? (
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
                    Comprado
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ borderRadius: "10px", marginRight: "14px" }}
                  >
                    Error
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default DetallesCompra;
