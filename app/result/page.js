'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'
import { Container, CircularProgress, Typography, Box } from '@mui/material' // Import necessary components
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return

            try {
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error occurred') // Corrected typo here
            } finally {
                setLoading(false) // Added finally block
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    return (
        <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            <AppBar position="fixed" style={{ width: '100%' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">Login</Button>
                        <Button color="inherit" href="/sign-up">Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 12 }}>
                {loading ? (
                    <>
                        <CircularProgress />
                        <Typography variant="h6">Loading...</Typography>
                    </>
                ) : error ? (
                    <Typography variant="h6">{error}</Typography>
                ) : (
                    <>
                        <Typography variant="h4">
                            {session.payment_status === 'paid' ? 'Thank you for purchasing' : 'Payment Failed'}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Session ID: {session_id}</Typography>
                            <Typography variant="body1">
                                {session.payment_status === 'paid'
                                    ? 'We have received your payment. You will receive an email with the order details shortly.'
                                    : 'Your payment was not successful. Please try again.'}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    )
}

export default ResultPage

