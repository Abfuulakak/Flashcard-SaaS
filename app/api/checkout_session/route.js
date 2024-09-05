import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}

export async function POST(req) {
    console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY) // Add this line to check the secret key
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Pro Subscription',
                    },
                    unit_amount: formatAmountForStripe(10),
                },
                recurring: {
                    interval: 'month',
                    interval_count: 1,
                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    }

    try {
        const checkoutSession = await stripe.checkout.sessions.create(params)
        return NextResponse.json(checkoutSession, {
            status: 200,
        })
    } catch (
        error
    ) {
        console.error('Error creating checkout session:', error)
        return NextResponse.json({
            status: 500,
            error: 'Internal Server Error',
        })
    }
}
