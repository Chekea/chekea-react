import React from "react";
import { Routes, Route } from "react-router-dom";
import Nacional from "./Nacional";

import Exterior from "./Exterior";
import Dashbord from "./Dashbord";
import DetallesCompra from "./DetallesCompra";
import DetallesVentas from "./DetallesVentas";
import Solicitud from "./Solicitud";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Solicitud />} />
        <Route path="/Nacional" element={<Nacional />} />
        <Route path="/Exterior" element={<Exterior />} />

        <Route
          path="/Exterior/Detalles/:codigo/:contexto"
          element={<DetallesCompra />}
        />
      </Routes>
    </>
  );
};
