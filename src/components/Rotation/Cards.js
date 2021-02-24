import Cart from './../card/Cart'
import incomes from './icons/income.svg'
import { useState, useEffect } from 'react'
import expense from './icons/expense.svg'
import wallet from './icons/wallet.svg'
import firebase from 'firebase'

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]

export default function Cards() {
    const [expenses, setExpenses] = useState(0)

    const [income, setIncome] = useState(0)
    const [balanc, setBalanc] = useState(income - expenses)
    const uid = firebase.auth().currentUser?.uid
    let cardInfo = [
        {
            money: balanc,
            type: 'Balance',
            icon: wallet,
        },
        {
            money: income,
            type: 'Income',
            icon: incomes,
        },
        {
            money: expenses,
            type: 'Expenses',
            icon: expense,
        },
    ]

    useEffect(async () => {
        await firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .onSnapshot((doc) => {
                const allData = doc.data()
                let sum = 0
                for (let key in allData) {
                    sum = allData[key].reduce((a, { value }) => a + +value, 0)
                }
                setExpenses(() => sum)
            })
        await firebase
            .firestore()
            .collection('income')
            .doc(uid)
            .onSnapshot((doc) => {
                const allData = doc.data()
                let sum = 0
                for (let key in allData) {
                    sum = allData[key].reduce((a, { value }) => a + +value, 0)
                }
                setIncome(() => sum)
            })
    }, [uid])
    useEffect(() => {
        setBalanc((prev) => (prev = income - expenses))
    }, [income, expense])
    return (
        <div className="cart-container">
            {cardInfo.map(({ money, type, icon }, index) => {
                return (
                    <>
                        <Cart
                            barData={data}
                            font_color={money < 0 ? '#aa2b1d' : null}
                            money={money + ' $'}
                            type={type}
                            icon={icon}
                            key={index}
                        />
                    </>
                )
            })}
        </div>
    )
}
