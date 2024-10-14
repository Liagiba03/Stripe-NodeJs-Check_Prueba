'use client';


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Agregada para saber que la clave publica esté definida
if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined()");
}


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  //Variable definida para colocar el MONTO a pagar
  const amount =4.99;

  return (
    <div className="">
        <h1>MAIN</h1>
    </div>
  );
}
