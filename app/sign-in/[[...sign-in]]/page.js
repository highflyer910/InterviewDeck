import { SignIn } from "@clerk/nextjs";
import { Box } from "@mui/material";
import Navbar from '../../components/navbar';

export default function Page() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sign-In Form */}
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2, 
          backgroundColor: '#dde5db', 
        }}
      >
        <SignIn afterSignInUrl="/flashcards" />
      </Box>
    </>
  );
}
