'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Toolbar, Button, Container, Typography, Box, Grid, Card, CardContent, LinearProgress } from '@mui/material'
import { useUser } from '@clerk/nextjs'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'



export default function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcardCount, setFlashcardCount] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        async function fetchFlashcardData() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcardCount(collections.length)
                // Assuming each collection has a 'progress' field
                const totalProgress = collections.reduce((acc, curr) => acc + (curr.progress || 0), 0)
                setProgress(totalProgress / collections.length)
            }
        }

        fetchFlashcardData()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>
    }

    return (
        <>
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
            <Container sx={{ mt: 10 }}> {/* Added margin-top to avoid content being hidden */}
                <Typography variant="h3">Dashboard</Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4">Flashcard Topics: {flashcardCount}</Typography>
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Progress Monitor</Typography>
                            <LinearProgress variant="determinate" value={progress} />
                            <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    )
}
