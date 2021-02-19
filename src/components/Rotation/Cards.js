import Cart from './../card/Cart'
import incomes from './icons/income.svg'
import {useState,useEffect} from 'react'
import expenses from './icons/expense.svg'
import wallet from './icons/wallet.svg'
import firebase from 'firebase'

export default function Cards() {
    const [expenses, setExpenses ]= useState(0)
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
                    expDat = doc
                })
            expDat = Object.values(expDat.data())[0]
            expDat = expDat.reduce((b,{value})=>+value+b,0)
            setExpenses(()=>expDat)
            setBalanc(()=>income-expenses)
        },[])
    return (
        <div className="cart-container">
            {cardInfo.map(({ money, type, icon }, index) => {
                return (
                    <Cart money={money} type={type} icon={icon} key={index} />
                )
            })}
            {/* <Cart
                money="1000$"
                type="Balance"
                icon="https://www.flaticon.com/svg/vstatic/svg/584/584026.svg?token=exp=1612339960~hmac=796198bd81a390fbc1f460472324b753"
            />
            <Cart
                font_color="red"
                money="2000$"
                type="Expenses"
                icon="https://www.flaticon.com/svg/vstatic/svg/2867/2867713.svg?token=exp=1612339999~hmac=8a3fac76fdce4b98b363419ddb031977"
            />
            <Cart
                font_color="green"
                money="3000$"
                type="Income"
                icon="https://www.flaticon.com/svg/vstatic/svg/3135/3135706.svg?token=exp=1612340102~hmac=eaf1c236e1ae7a29475e8dd6a1eedce3"
            /> */}
        </div>
    )
}
