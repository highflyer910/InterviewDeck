'use client'
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import db from '@/firebase';
import { Container, Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';  

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchFlashcards() {
      if (!user) return;
      const userDocRef = doc(collection(db, 'users'), user.id);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setFlashcards(userDocSnap.data().flashcards || []);
      } else {
        await setDoc(userDocRef, { flashcards: [] });
      }
    }
    fetchFlashcards();
  }, [user]);

  const handleGenerate = async () => {
    if (!user) return;
    const newFlashcard = { prompt, category };
    const userDocRef = doc(collection(db, 'users'), user.id);

    // Update flashcards in Firestore
    await updateDoc(userDocRef, {
      flashcards: [...flashcards, newFlashcard],
    });

    setPrompt('');
    setCategory('');
  };

  if (!isLoaded || !isSignedIn) {
    return null; 
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#dde5db', 
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth={false} sx={{ padding: '20px 16px', color: '#333' }}> 
          
          <Typography variant="h4" align="center" color="#de3f74" gutterBottom>
            Create Your Flashcards
          </Typography>

          <Box sx={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <TextField
              fullWidth
              label="Enter your prompt"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{
                marginBottom: 2,
                backgroundColor: '#fff',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#de3f74', 
                  },
                },
              }}
            />

            <TextField
              select
              fullWidth
              label="Select a category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                marginBottom: 3,
                backgroundColor: '#fff',
                borderRadius: '4px',
                '& .MuiSelect-outlined': {
                  padding: '12px',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#de3f74', 
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: '#de3f74', 
                },
              }}
            >
              <MenuItem value="computer-science">Computer Science</MenuItem>
              <MenuItem value="algorithms">Algorithms</MenuItem>
              <MenuItem value="system-design">System Design</MenuItem>
              <MenuItem value="data-structures">Data Structures</MenuItem>
              <MenuItem value="frontend">Frontend Development</MenuItem>
              <MenuItem value="backend">Backend Development</MenuItem>
              <MenuItem value="devops">DevOps</MenuItem>
              <MenuItem value="security">Security</MenuItem>
              <MenuItem value="databases">Databases</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerate}
              sx={{
                backgroundColor: '#de3f74',
                color: '#dde5db',
                '&:hover': {
                  backgroundColor: '#c33966',
                },
              }}
            >
              Generate Flashcards
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
