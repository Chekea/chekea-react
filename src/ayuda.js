import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

import { useEffect } from "react";
import { ref, onValue, off, increment } from "firebase/database";
import app, { messaging } from "./Servicios/firebases";
export const ColorMain = "";

export const extract = (string) => {
  const match = string.match(/\d{5}$/);
  return match ? match[0] : null;
};
// notificacion

export const sendNotification = async (token, title, body) => {
  try {
    axios.post(
      "http://localhost:5000/send-notification",
      {
        token: token,
        title: "Hello",
        body: "This is a notification",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

// Function to send notification

export let analizar = (cod, valores) => {
  const checkmar = (obj) => obj.Codigo === cod;
  return valores.some(checkmar);
};
const useNotificationListener = (
  database,
  decrementValue,
  incrementValue,
  chekeaFecha
) => {
  useEffect(() => {
    const databaseReference = ref(database, "/GE/NotificacionReb");

    const handleData = (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const {
          contexto = "",
          Codigo = "",
          Vendedor = "",
          Comprador = "",
          Fecha = 0,
          isTrue = false,
          Id = "",
          Cantidad = 0,
        } = data;

        if (!isTrue) {
          if (contexto === "Nacional") {
            decrementValue(
              Cantidad,
              `GE/Nacional/Prod/${Codigo}/Cantidad`,
              Vendedor,
              Codigo,
              contexto
            );
            incrementValue(`GE/Nacional/Prod/${Codigo}/Compras`, Codigo);
          } else {
            incrementValue(`GE/Exterior/Prod/${Codigo}/Compras`, Codigo);
          }
        } else {
          chekeaFecha(Fecha, Id, Comprador);
        }
      });
    };

    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        handleData(snapshot);
      } else {
        console.log("No data available");
      }
    };

    const unsubscribe = onValue(databaseReference, handleSnapshot, (error) => {
      console.error("Error fetching data:", error);
    });

    // Clean up listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [database, decrementValue, incrementValue, chekeaFecha]);
};

export default useNotificationListener;
