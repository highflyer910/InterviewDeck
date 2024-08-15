"use client";
import React from "react";
import { Container, Typography, Grid, Button, Paper, Box, Divider } from "@mui/material";
import Navbar from "../components/navbar"; // Assuming the Navbar component is in the components folder
import getStripe from "@/utils/get-stripe";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#dde5db", // Background color
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "24px", // Reduced padding to move content closer to the navbar
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#de3f74" }} // Using your color for the title
          >
            Our Pricing Plans
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: "2rem",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ color: "#333" }} // Dark text color
                >
                  Basic Plan
                </Typography>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ color: "#de3f74" }} // Using your color for the price
                >
                  $9.99/month
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Access to basic features.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#de3f74", // Using your color for the button
                    color: "#FAFFEE", // Light text color for the button
                    "&:hover": {
                      backgroundColor: "#b0315d", // Darker shade on hover
                    },
                    marginTop: "16px",
                  }}
                  onClick={() => handleCheckout("price_1XXXXXX")}
                >
                  Get Started
                </Button>
                <Divider sx={{ margin: "16px 0" }} />
                <Typography variant="body2" align="left" sx={{ color: "#333" }}>
                  - Access to DB<br />
                  - Algorithms and DSA<br />
                  - Limited storage: 100 cards<br />
                  - Basic support
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: "2rem",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ color: "#333" }} // Dark text color
                >
                  Pro Plan
                </Typography>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ color: "#de3f74" }} // Using your color for the price
                >
                  $19.99/month
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Access to all features.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#de3f74", // Using your color for the button
                    color: "#FAFFEE", // Light text color for the button
                    "&:hover": {
                      backgroundColor: "#b0315d", // Darker shade on hover
                    },
                    marginTop: "16px",
                  }}
                  onClick={handleCheckout}
                >
                  Get Started
                </Button>
                <Divider sx={{ margin: "16px 0" }} />
                <Typography variant="body2" align="left" sx={{ color: "#333" }}>
                  - Unlimited flashcards<br />
                  - Unlimited storage<br />
                  - Priority support<br />
                  - Exclusive updates and features
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const handleCheckout = async () => {
  const response = await fetch("/api/checkout_session", {
    method: "POST",
  });
  const { id } = await response.json();
  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({ sessionId: id });
  if (error) {
    console.error(error);
  }
};

export default Pricing;
