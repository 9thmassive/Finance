import Cart from './../card/Cart'
import incomes from './icons/income.svg'
import {useState,useEffect} from 'react'
import expenses from './icons/expense.svg'
import wallet from './icons/wallet.svg'
import firebase from 'firebase'

export default function Cards() {
    const [expenses, setExpenses ]= useState(254000)
    const [income,setIncome] = useState(345000)
    const [balanc,setBalanc] = useState(income-expenses)
    const uid = firebase.auth().currentUser?.uid
    let cardInfo = [
        {
            money: balanc+ ' $',
            type: 'Balance',
            icon: wallet,
        },
        {
            money: income + ' $',
            type: 'Income',
            icon: incomes,
        },
        {
           money: expenses + ' $',
            type: 'Expenses',
            icon: expenses,
        },
    ]


    useEffect(
        async ()=>{

            let  expDat = await firebase
                .firestore()
                .collection('expenses')
                .doc(uid)
                .get((doc)=>{
                    expDat = doc.data()
                })
            console.log(expDat)
            // console.log(expDat?.data())
            // if(!expDat.data()){
            //     expDat = Object.values(expDat.data())[0]
            //     expDat = expDat.reduce((b,{value})=>+value+b,0)
            //     setExpenses(()=>expDat)
            //     setBalanc(()=>income-expenses)
            // }

        },[])
    return (
        <div className="cart-container">
            {cardInfo.map(({ money, type, icon }, index) => {
                return (
                    <Cart money={money} type={type} icon={icon} key={index} />
                )
            })}

        </div>
    )
}
