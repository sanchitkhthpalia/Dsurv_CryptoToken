import React, { useState } from "react";
import { canisterId , createActor } from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client";
function Faucet(props) {

  const [ isDisabled , setDisable ] = useState(false);
  const [ buttonText , setText ] = useState("Gimme Gimme");
  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },

    });
    
    const result = await authenticatedCanister.payOut();
    setText(result);
    //setDisable(false);

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free JAGSN tokens here! Claim 10,000 JAGSN tokens to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
