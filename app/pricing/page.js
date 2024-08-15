"use client"
import React from 'react';
import { Container, Typography, Grid, Button, Paper } from '@mui/material';
import { handleCheckout } from '@/utils/get_stripe';


const Pricing = () => {
    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Our Pricing Plans
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{ padding: '2rem' }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Basic Plan
                        </Typography>
                        <Typography variant="h4" align="center" gutterBottom>
                            $9.99/month
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            Access to basic features.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleCheckout('price_1XXXXXX')}
                        >
                            Get Started
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{ padding: '2rem' }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Pro Plan
                        </Typography>
                        <Typography variant="h4" align="center" gutterBottom>
                            $19.99/month
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            Access to all features.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleCheckout('price_1XXXXXX')}
                        >
                            Get Started
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};


export default Pricing;
