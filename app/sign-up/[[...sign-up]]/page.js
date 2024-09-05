import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Toolbar, Typography, Button, } from '@mui/material'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'
import Head from 'next/head'

export default function SignUpPage() {
  return (
    <div style={{ width: '100vw', backgroundColor: 'white' }}>
      <Head>
        <title>Sign Up - Flashcard SaaS</title>
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
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '64px' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" gutterBottom>Sign Up</Typography>
          <SignUp />
        </Box>
      </Container>
    </div>
  )
}
