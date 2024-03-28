import { CircularProgress, Box, Container } from "@mui/material";
import styled from "styled-components";



export const Spinner = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "250px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Container>
  );
};
