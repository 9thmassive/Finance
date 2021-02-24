import React, { Component } from "react";
//import React from 'react';
import './Hypothec.css'
import ReactDOM from 'react-dom'
//var ReactDOM = require('react-dom')
import { useState, useEffect } from 'react'

//class Hypothec extends React.Component {
var MortgageForm = React.createClass({
    mortgageCalc: function() {
        //findDOMNode to pull entered values into function   
        var principal = React.findDOMNode(this.refs.principal).value,
            rate = React.findDOMNode(this.refs.rate).value,
            term = React.findDOMNode(this.refs.term).value;
        //Can use a whole number percentage or decimal
        if(rate > 1){
            rate = rate * 0.01;
        }else{
            rate = rate;  
        }
        //Can accept term in years or months
        if(term <= 30){
            term = term * 12;
        }else{
            term = term;
        }
        var monthlyRate = rate/12;
        var factor = Math.pow(monthlyRate + 1, term);
        var numerator = monthlyRate * factor;
        var denominator = factor - 1;
        var quotient =  numerator/denominator;
        var payment = principal * quotient;
        console.log('$' + payment.toFixed(2));
        return payment.toFixed(2);
    },
    getInitialState: function() {
        return {value: 0, payment: '0.00'}
    },
    handleChange: function(event) {
        this.setState({value: event.target.value, payment: this.mortgageCalc()});
    },

        render: function() {
            
        return (
          <div className="form-group">
            <h2><center>Hypothec Calculator</center></h2><br/>
            <form className="form-group">
              <input type="number" ref="principal" placeholder="Salary" onChange={this.handleChange}/><br/>
              <input type="number" ref="term" placeholder="How many Years" onChange={this.handleChange}/><br/>
              <input type="number" ref="rate" placeholder="Rate" onChange={this.handleChange}/><br/>
              <input type="number" ref="term" placeholder="Price of the Home" onChange={this.handleChange}/><br/>

               <input type="number" ref="principal" placeholder="Loan Amount" value={this.state.value.principal} onChange={this.handleChange}/><br/>
               <input type="number" ref="rate" placeholder="Interest Rate" value={this.state.value.rate} onChange={this.handleChange}/><br/>
               <input type="number" ref="term" placeholder="Length of loan" value={this.state.value.term} onChange={this.handleChange}/><br/>
               <h4>Your estimated monthly payment is ${this.state.payment}</h4>
            </form>        
          </div>
        )
    }
})

ReactDOM.render(<MortgageForm/>, document.getElementById('form'));

export default MortgageForm //mortgageCalc//MortgageForm//Hypothec 