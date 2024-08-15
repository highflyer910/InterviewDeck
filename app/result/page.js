"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import Link from 'next/link';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        try {
            const response = fetch(`/api/checkout_sessions/${sessionId}`)
            const data = response.json()
            if (!response.ok) {
                throw new Error(data.error.message);
            }
            setSession(data);   
        } catch (error) {
            console.error(error);

        }
        finally {
            setLoading(false);
        }
    }, [sessionId]);

    if (loading) {
        return (
            <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                {session && sessionId ? "Payment Successful!" : "Payment Cancelled"}
            </Typography>
            {session ? (
                <>
                    <Typography variant="body1" gutterBottom>
                        Thank you for your purchase of {session.plan_name}. Your subscription is now active.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Payment ID: {session.payment_intent}
                    </Typography>
                </>
            ) : (
                <Typography variant="body1" gutterBottom>
                    Your payment was not completed. Please try again.
                </Typography>
            )}
            <Link href="/">
                <Button variant="contained" color="primary">
                    Go to Home
                </Button>
            </Link>
        </Container>
    );
};

export default ResultPage;
