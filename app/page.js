'use client'
import Head from 'next/head';
import { Container, Box, Typography, Button, Grid, Modal, Fade } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Navbar from './components/navbar';
import Image from 'next/image';

export default function Home() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ backgroundColor: '#dde5db' }}>
      <Head>
        <title>InterviewDeck - Ace Your Tech Interviews</title>
        <meta name="description" content="Prepare for your tech interviews with smart flashcards tailored to your needs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            textAlign: 'center',
            padding: 4,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Image
              src="/home.svg"
              alt="Home Illustration"
              width={200} 
              height={200} 
            />
          </Box>

          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#de3f74', fontSize: {xs: '2.5rem', md: '3rem',},}}>
            Ace Your Tech Interviews with InterviewDeck
          </Typography>
          <Typography variant="h5" component="h2" color="text.secondary" gutterBottom sx={{ color: '#de3f74' }}>
            Turn key concepts into flashcards and master your coding interviews.
          </Typography>

          {isSignedIn ? (
            <Link href="/flashcards" passHref>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  backgroundColor: '#de3f74',
                  color: '#dde5db',
                  '&:hover': {
                    backgroundColor: '#c33966',
                  },
                }}
              >
                Get Flashcards
              </Button>
            </Link>
          ) : (
            <SignedOut>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    backgroundColor: '#de3f74',
                    color: '#dde5db',
                    '&:hover': {
                      backgroundColor: '#c33966',
                    },
                  }}
                  onClick={handleOpen}
                >
                  Get Started
                </Button>
              </Box>
            </SignedOut>
          )}
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            padding: 4,
            backgroundColor: '#f5f5f5',
            mt: 1,
            pb: 6,
            borderRadius: 4,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: '#de3f74' }}>
            Why InterviewDeck?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#de3f74' }}>
                  Tailored Flashcards
                </Typography>
                <Typography color="text.secondary" sx={{ color: '#333' }}>
                  Create flashcards from key topics in programming and algorithms.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#de3f74' }}>
                  Structured Learning
                </Typography>
                <Typography color="text.secondary" sx={{ color: '#333' }}>
                  Organize your flashcards by interview topics like Data Structures, Frontend Development, System Design, and more.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#de3f74' }}>
                  Anytime, Anywhere
                </Typography>
                <Typography color="text.secondary" sx={{ color: '#333' }}>
                  Access your flashcards across all your devices, and never miss a study session.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                backgroundColor: '#fff',
                padding: 4,
                borderRadius: 4,
                maxWidth: '500px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#de3f74' }}>
                Join InterviewDeck
              </Typography>
              <Box sx={{ mt: 2 }}>
                <SignedOut>
                  <Link href="../sign-in" passHref>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        backgroundColor: '#de3f74',
                        color: '#dde5db',
                        mr: 2,
                        '&:hover': {
                          backgroundColor: '#c33966',
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="../sign-up" passHref>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        backgroundColor: '#de3f74',
                        color: '#dde5db',
                        '&:hover': {
                          backgroundColor: '#c33966',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SignedOut>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </div>
  );
}
