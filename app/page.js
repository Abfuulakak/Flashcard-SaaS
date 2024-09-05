'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Container, AppBar, Toolbar, Typography, Button, Grid, Box } from '@mui/material'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


export default function Home() {
  return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f0f0f0', fontFamily: 'Afacad, sans-serif', display: 'flex', flexDirection: 'column' }}>
        <Head>
          <title>Flashcard SaaS</title>
          <meta name="description" content="Create flashcard from your text" />
        </Head>

        <AppBar position="fixed" style={{ width: '100%' }}>
          <Toolbar>
            <Button 
              color="inherit" 
              href="/" 
              sx={{ padding: '10px 20px', fontSize: '1.3rem', minWidth: '180px' }} // Adjusted button size
            >
              Flashcard SaaS
            </Button>
            <Box sx={{ flexGrow: 1 }} /> 
            <Button color="inherit" href="/dashboard">Dashboard</Button> {/* Added Dashboard button */}
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '1px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Adjusted marginTop from 80px to 60px */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <Typography variant="h2"></Typography>
            <Typography variant="h3" style={{ fontWeight: 'bold', fontFamily: 'Afacad, sans-serif' }} gutterBottom>
              The easiest way to learn and create flashcards 
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, padding: '12px 24px', fontSize: '1rem', minWidth: '160px', mr: 2 }} 
              href="/generate"
            >
              Get Started
            </Button>
            <SignedOut>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ mt: 2, padding: '12px 24px', fontSize: '1rem', minWidth: '160px' }} 
                href="/sign-in"
              >
                YOUR FLASHCARDS
              </Button>
            </SignedOut>
            <SignedIn>
              <Button 
                variant="contained" 
                color="secondary" 
                sx={{ mt: 2, padding: '12px 24px', fontSize: '1rem', minWidth: '160px' }} 
                href="/flashcards"
              >
                YOUR FLASHCARDS
              </Button>
            </SignedIn>
          </div>
          <Typography variant="h4" component="h2" sx={{ my: 6, textAlign: 'center' }}>
          </Typography>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6">Easy Text Input</Typography>
                <Typography>
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
                <Typography>
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
                <Typography>
                  Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>Collaborate with Friends</Typography>
                <Typography>
                  Share your flashcards with friends and study together. Collaboration has never been easier.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>Track Your Progress</Typography>
                <Typography>
                  Monitor your study progress and see how much you've learned over time.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" gutterBottom>Customizable Flashcards</Typography>
                <Typography>
                  Customize your flashcards with different colors and fonts to make studying more enjoyable.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
  )
}