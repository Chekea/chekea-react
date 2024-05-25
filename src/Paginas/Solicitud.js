import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 3,
  },
  formControl: {
    minWidth: 120,
  },
  chip: {
    margin: 0.5,
  },
}));

const Solicitud = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    Cantidad: 6,
    Categoria: "Complementos para Peques",
    Codigo: "-NoFkqxvCvB_lDrvxaoD",
    Color: {
      "-NoFkqy86DgjqNjGq5uV": {
        Codigo: "-NoFkqy86DgjqNjGq5uV",
        label: "Azul",
      },
      "-NoFkqyDJe0KYgL9yeMb": {
        Codigo: "-NoFkqyDJe0KYgL9yeMb",
        label: "Rosado ",
      },
    },
    Detalles: "Colores: Azul  Rosado \n\n  ",

    Imagen:
      "https://firebasestorage.googleapis.com/v0/b/chekeaapp-f5abe.appspot.com/o/Imagenes%2FProductos%2F1705383260170.jpeg?alt=media&token=ca342ab7-8a8d-4ff6-8e26-32cf05166865",
    Imagenes: {
      "-NoFksXNsGAYeqwpdd8s": {
        Codigo: "-NoFksXNsGAYeqwpdd8s",
        Imagen:
          "https://firebasestorage.googleapis.com/v0/b/chekeaapp-f5abe.appspot.com/o/Imagenes%2FProductos%2F1705383261850.jpeg?alt=media&token=6f26b9bd-d2d8-4973-9540-90f8c859caa5",
      },
      "-NoFksXRuOYba01RU82F": {
        Codigo: "-NoFksXRuOYba01RU82F",
        Imagen:
          "https://firebasestorage.googleapis.com/v0/b/chekeaapp-f5abe.appspot.com/o/Imagenes%2FProductos%2F1705383261737.jpeg?alt=media&token=58a3edf3-2dbd-4f3a-b206-48efa83e2c09",
      },
    },
    Precio: 2500,
    Stock: true,
    Titulo: "Protector de rodillas para bebés ",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (color, value) => {
    setFormData({
      ...formData,
      Color: {
        ...formData.Color,
        [color.Codigo]: { ...color, label: value },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log(formData);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Actualizar Producto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Imágenes</Typography>
            {Object.values(formData.Imagenes).map((imagen) => (
              <Chip
                key={imagen.Codigo}
                label={imagen.Imagen}
                className={classes.chip}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Cantidad"
              label="Cantidad"
              value={formData.Cantidad}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Colores</Typography>
            {Object.values(formData.Color).map((color) => (
              <FormControl key={color.Codigo} className={classes.formControl}>
                <InputLabel>{color.label}</InputLabel>
                <Select
                  value={color.label}
                  onChange={(e) => handleColorChange(color, e.target.value)}
                >
                  <MenuItem value="Azul">Azul</MenuItem>
                  <MenuItem value="Rosado">Rosado</MenuItem>
                  {/* Add more color options as needed */}
                </Select>
              </FormControl>
            ))}
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="Detalles"
              label="Detalles"
              value={formData.Detalles}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="Precio"
              label="Precio"
              value={formData.Precio}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="Stock"
                  checked={formData.Stock}
                  onChange={(e) =>
                    setFormData({ ...formData, Stock: e.target.checked })
                  }
                />
              }
              label="En stock"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="Titulo"
              label="Título"
              value={formData.Titulo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Actualizar
        </Button>
      </form>
    </div>
  );
};

export default Solicitud;
