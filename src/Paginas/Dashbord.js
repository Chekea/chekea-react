import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  useTheme,
  Fab,
  Modal,
  useMediaQuery,
} from "@mui/material";
import Form from "./componentes/Form";

const Dashboard = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust breakpoint as needed
  const [totalUsers, setTotalUsers] = useState(0);

  const handleClick = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Grid container spacing={3} paddingRight={5} paddingLeft={5}>
        <Grid marginTop={5} item xs={12} sm={6} md={4}>
          <Box
            bgcolor="pink"
            color="secondary.contrastText"
            p={2}
            sx={{
              borderRadius: "15px", // Add border radius to the Grid item
            }}
          >
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
            >
              Usuarios Registrados
            </Typography>
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
              sx={{ fontSize: "3rem", color: "white" }}
            >
              255
            </Typography>
            <Typography variant="body2" component="p" mt={1} align="center">
              con un average de 40/ dia
            </Typography>
          </Box>
        </Grid>
        <Grid marginTop={5} item xs={12} sm={6} md={4}>
          <Box
            bgcolor="pink"
            color="secondary.contrastText"
            p={2}
            sx={{
              borderRadius: "15px", // Add border radius to the Grid item
            }}
          >
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
            >
              Usuarios Registrados
            </Typography>
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
              sx={{ fontSize: "3rem", color: "white" }}
            >
              255
            </Typography>
            <Typography variant="body2" component="p" mt={1} align="center">
              con un average de 40/ dia
            </Typography>
          </Box>
        </Grid>
        <Grid marginTop={5} item xs={12} sm={6} md={4}>
          <Box
            bgcolor="orange"
            color="secondary.contrastText"
            p={2}
            sx={{
              borderRadius: "15px", // Add border radius to the Grid item
            }}
          >
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
            >
              Usuarios Registrados
            </Typography>
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
              sx={{ fontSize: "3rem", color: "white" }}
            >
              255
            </Typography>
            <Typography variant="body2" component="p" mt={1} align="center">
              con un average de 40/ dia
            </Typography>
          </Box>
        </Grid>
        <Grid marginTop={5} item xs={12} sm={6} md={4}>
          <Box
            bgcolor="pink"
            color="secondary.contrastText"
            p={2}
            sx={{
              borderRadius: "15px", // Add border radius to the Grid item
            }}
          >
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
            >
              Usuarios Registrados
            </Typography>
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
              sx={{ fontSize: "3rem", color: "white" }}
            >
              255
            </Typography>
            <Typography variant="body2" component="p" mt={1} align="center">
              con un average de 40/ dia
            </Typography>
          </Box>
        </Grid>
        <Grid marginTop={5} item xs={12} sm={6} md={4}>
          <Box
            bgcolor="yellow"
            color="secondary.contrastText"
            p={2}
            sx={{
              borderRadius: "15px", // Add border radius to the Grid item
            }}
          >
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
            >
              Usuarios Registrados
            </Typography>
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
              sx={{ fontSize: "3rem", color: "white" }}
            >
              255
            </Typography>
            <Typography variant="body2" component="p" mt={1} align="center">
              con un average de 40/ dia
            </Typography>
          </Box>
        </Grid>
        <Grid marginTop={5} item xs={12} sm={6} md={4}>
          <Box
            bgcolor="green"
            color="secondary.contrastText"
            p={2}
            sx={{
              borderRadius: "15px", // Add border radius to the Grid item
            }}
          >
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
            >
              Usuarios Registrados
            </Typography>
            <Typography
              variant="body1"
              component="p"
              mt={1}
              align="center"
              color={"black"}
              sx={{ fontSize: "3rem", color: "white" }}
            >
              255
            </Typography>
            <Typography variant="body2" component="p" mt={1} align="center">
              con un average de 40/ dia
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              zIndex: 1000, // Ensure the button is above other content
            }}
          >
            <Fab color="primary" aria-label="add" onClick={handleClick}>
              <p>hola</p>
            </Fab>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openForm}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            width: isMobile ? "80%" : "60%", // Set width to 80% on mobile, 60% otherwise
            maxWidth: "600px", // Set maximum width to prevent the form from stretching too wide
          }}
        >
          <Form onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
