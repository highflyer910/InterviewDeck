'use client'
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultMenuItems = [
    { label: 'Pricing', href: '/pricing' },
  ];

  const signedOutMenuItems = [
    { label: 'Sign In', href: '/sign-in' },
    { label: 'Sign Up', href: '/sign-up' },
  ];

  return (
    <AppBar position="static" color="primary" elevation={3} sx={{ backgroundColor: '#de3f74' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#dde5db' }}>
          <Link href="/" passHref>
            InterviewDeck
          </Link>
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiMenu-paper': {
                  backgroundColor: '#dde5db', 
                  color: '#de3f74', 
                },
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: '#de3f74', 
                    color: '#dde5db', 
                  },
                },
              }}
            >
              {/* Default menu items */}
              {defaultMenuItems.map((item) => (
                <MenuItem key={item.label} onClick={handleClose}>
                  <Link href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.label}
                  </Link>
                </MenuItem>
              ))}

              <SignedOut>
                {signedOutMenuItems.map((item) => (
                  <MenuItem key={item.label} onClick={handleClose}>
                    <Link href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                      {item.label}
                    </Link>
                  </MenuItem>
                ))}
              </SignedOut>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/pricing" passHref>
              <Button
                sx={{
                  color: '#dde5db',
                  backgroundColor: '#de3f74',
                  mr: 2,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#c33966',
                    color: '#f5f5f5',
                    boxShadow: 'none',
                  },
                }}
                variant="contained"
              >
                Pricing
              </Button>
            </Link>

            <SignedOut>
              <Link href="/sign-in" passHref>
                <Button
                  sx={{
                    color: '#de3f74',
                    backgroundColor: '#dde5db',
                    mr: 2,
                    border: '2px solid #dde5db',
                    '&:hover': {
                      backgroundColor: '#c2ccc1',
                      color: '#de3f74',
                      boxShadow: 'none',
                      border: '2px solid #dde5db',
                    },
                  }}
                  variant="outlined"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" passHref>
                <Button
                  sx={{
                    color: '#dde5db',
                    backgroundColor: '#de3f74',
                    boxShadow: 'none',
                    border: '1px solid #dde5db',
                    '&:hover': {
                      backgroundColor: '#c33966',
                      color: '#f5f5f5',
                      boxShadow: 'none',
                    },
                  }}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Link>
            </SignedOut>
          </Box>
        )}

        <SignedIn>
          <UserButton afterSignOutUrl="/" sx={{ color: '#dde5db', ml: 2 }} />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
