import { NextRequest } from "next/server";
//secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request : NextRequest) {
    try {
        const {amount} = await request.json();
    } catch (error) {
        
    }
    
}