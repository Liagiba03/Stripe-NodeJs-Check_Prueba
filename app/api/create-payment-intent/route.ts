import { NextRequest, NextResponse } from "next/server";
//secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request : NextRequest) {
    try {
        const {amount} = await request.json();

        //CREATE A PAYMENT INTENT
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {enabled:true}, //De a cuerdo al navegador da los pagos disponibles
        });

        //Da el client secret
        return NextResponse.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        console.error("Internal Error: ", error);

        return NextResponse.json(
            {error: `Internal Server Error: ${error}`},
            {status: 500}
        );
    }
    
}