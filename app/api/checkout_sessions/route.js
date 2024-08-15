import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

export async function POST(req) {
    const { priceId } = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
        });

        return new Response(JSON.stringify({ id: session.id }), {
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}
