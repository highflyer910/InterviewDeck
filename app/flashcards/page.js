'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, Grid } from '@mui/material';
import Navbar from '../components/navbar';

export default function Flashcard() {
  const { isLoaded, isSignedIn } = useUser();
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = async (selectedCategory) => {
    try {
      const response = await fetch('/api/generateFlashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `Generate 16 detailed flashcards about ${selectedCategory}. Each flashcard should include:
        - A clear and concise question
        - A comprehensive answer that provides an in-depth explanation or multiple sentences if necessary. 

        Format each flashcard as follows:
        Question: [The question goes here]
        Answer: [The detailed answer goes here]

        Repeat this format for all 16 flashcards. Ensure that the answers are informative and provide enough context for the question.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data.flashcards || []);

    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    handleGenerate(selectedCategory);
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
              select
              fullWidth
              label="Select a category"
              variant="outlined"
              value={category}
              onChange={handleCategoryChange}
              sx={{
                marginBottom: 3,
                backgroundColor: '#F0F0F0',
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

            <TextField
              fullWidth
              label="Add additional prompts (optional)"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{
                marginBottom: 2,
                backgroundColor: '#F0F0F0',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#de3f74', 
                  },
                },
              }}
            />
          </Box>

          {flashcards.length > 0 && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5" gutterBottom>Generated Flashcards:</Typography>
              <Grid container spacing={2}>
                {flashcards.map((card, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                      sx={{
                        perspective: '1000px',
                        height: '300px', 
                        cursor: 'pointer',
                        overflow: 'visible',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d',
                          '&:hover': {
                            transform: 'rotateY(180deg)',
                          },
                          transformOrigin: 'center',
                          perspective: '1000px',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                            border: '2px solid #de3f74',
                          }}
                        >
                          <Typography variant="body1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.question}</Typography>
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            padding: '16px',
                            transform: 'rotateY(180deg)',
                            overflowY: 'auto',
                            maxHeight: '300px', 
                            boxSizing: 'border-box',
                            paddingTop: '20px', 
                            textAlign: 'left',
                            border: '2px solid #de3f74',
                          }}
                        >
                          <Typography variant="body1">{card.answer}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
