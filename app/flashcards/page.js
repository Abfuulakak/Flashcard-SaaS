'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, AppBar, Toolbar, Button, Box } from '@mui/material' // Added Box import
import { collection, doc, getDoc, setDoc } from 'firebase/firestore' // Corrected import
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter() // Add useRouter hook

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }

        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
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
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: 'lightblue' }}> {/* Changed background color to pink */}
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: 'black' }}> {/* Changed text color to white */}
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
