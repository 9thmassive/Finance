import React, { Component } from 'react'
//import React from 'react';
import './Hypothec.css'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

function Hypothec() {
    const [yearAmount, setYearAmount] = useState('')
    const [rateAmount, setRateAmount] = useState('')
    const [homeAmount, setHomeAmount] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState('')

    //Can use a whole number percentage or decimal
    /*if(rateAmount > 1){
            rateAmount = rateAmount * 0.01;
        }else{
            rateAmount = rateAmount;  
        }
        //Can accept term in years or months
        if(yearAmount <= 30){
            yearAmount = yearAmount * 12;
        }else{
            yearAmount = yearAmount;
        }*/

    /*var factor = Math.pow( (rate/12) + 1, term );
        var numerator = monthlyRate * factor;
        var payment = principal * ( numerator/(factor - 1) );*/

    return (
        <div className="form-group">
            <h2>
                <center>Hypothec Calculator</center>
            </h2>
            <br />
            <form className="form-group-hyp">
                <input
                    type="number"
                    placeholder="How many Years"
                    value={yearAmount}
                    onChange={(e) => setYearAmount(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="number"
                    placeholder="Rate"
                    value={rateAmount}
                    onChange={(e) => setRateAmount(e.target.value)}
                />
                <br />
                <br />
                <input
                    type="number"
                    placeholder="Price of the Home"
                    value={homeAmount}
                    onChange={(e) => setHomeAmount(e.target.value)}
                />
                <br />
                <h4>
                    Your estimated monthly payment is {monthlyPayment + '€'}
                </h4>
            </form>

            <button
                onClick={() => {
                    let result = homeAmount
                    result = (homeAmount * rateAmount) / 100
                    result = result * yearAmount
                    result = result + homeAmount
                    result = result / 12
                    result = (result / yearAmount).toFixed(2)
                    setMonthlyPayment(result)
                }}
                className="hypothecButton"
                type="submit"
            >
                Calculate
            </button>
        </div>
    )
}

export default Hypothec
