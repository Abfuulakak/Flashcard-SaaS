'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box, Typography, Card, CardActionArea, CardContent, Button } from '@mui/material'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Toolbar } from '@mui/material'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })

            setFlashcards(flashcards)
        }

        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>
    }

    return (
        <Container maxWidth="100vw">

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
            <Grid container spacing={3} sx={{ mt: 12 }}>
            {flashcards.length > 0 && (
                    <Box sx={{ mt: 4, width: '100%' }}>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={6} key={index}> {/* Ensure 2 flashcards per line */}
                                    <Card sx={{ height: '200px', perspective: '1000px' }}> {/* Adjusted card height */}
                                        <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                                            <Box sx={{
                                                height: '100%',
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            }}>
                                                <Box sx={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    backgroundColor: 'lightblue', // Added background color for the front
                                                }}>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    transform: 'rotateY(180deg)',
                                                    backgroundColor: 'lightgreen', // Added background color for the back
                                                }}>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Container>
    )
}