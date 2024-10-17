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

    return(
        <form>
            {clientSecret && <PaymentElement/>}
            <button>PAY</button>
        </form>
    )
};

export default CheckoutPage;