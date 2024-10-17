'use client'

import React, {useEffect, useState} from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js"
import convertToSubcurrency from "@/lib/convertToSubcurrency"
import { POST } from "@/app/api/create-payment-intent/route";

const CheckoutPage = ({ amount } : {amount: number}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    //USE EFFECT cada que el monto cambia
    useEffect(()=>{
        fetch("/api/create-payment-intent",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount)}),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    //Function for the form
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setLoading(true);

        if(!stripe || !elements){
            return;
        }

        //verificar si existen errores
        const { error : submitError} = await elements.submit();

        if (submitError){
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement/>}
            {errorMessage && <div>{errorMessage}</div>}
            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                >
                {!loading ? `Pay $${amount}`:"Processing ..."}
            </button>
        </form>
    );
};


export default CheckoutPage;