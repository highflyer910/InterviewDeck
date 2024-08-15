import { loadStripe } from "@stripe/stripe-js";

export const handleCheckout = async (priceId) => {
    const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
    });

    const session = await response.json();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (error) {
        console.error(error.message);
    }
};