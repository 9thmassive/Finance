import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts'
import firebase from 'firebase'
import { useEffect, useState } from 'react'
const data = [
    {
        name: 'March',
        inc: 1200,
        exp: 1300,
    },
]

export default function App() {
    const [uid, setUid] = useState(null)
    const [income, setIncome] = useState([])
    const [expense, setExpense] = useState([])
    const [mergeIncomeExpense, setMergeIncomeExpense] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUid(user?.uid)
        })
    }, [])
    //setting income and expense data to state
    useEffect(() => {
        if (!uid) {
            return
        }
        firebase
            .firestore()
            .collection('income')
            .doc(uid)
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setIncome(
                        Object.entries(doc.data()).map(([data, arrOfData]) => {
                            return [
                                data,
                                arrOfData.reduce((a, { value }) => {
                                    return a + +value
                                }, 0),
                            ]
                        })
                    )
                }
            })
        firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .onSnapshot((doc) => {
                if (doc.data()) {
                    setExpense(
                        Object.entries(doc.data()).map(([data, arrOfData]) => {
                            return [
                                data,
                                arrOfData.reduce((a, { value }) => {
                                    return a + +value
                                }, 0),
                            ]
                        })
                    )
                }
            })
    }, [uid])
    //----

    //merging expense and income include merging
    useEffect(() => {
        let mergeResult = {}
        expense.forEach(([date, value]) => {
            mergeResult[date] = { income: 0, expense: value }
        })
        income.forEach(([date, value]) => {
            if (mergeResult[date]) {
                mergeResult[date].income = value
            } else {
                mergeResult[date] = { expense: 0, income: value }
            }
        })
        mergeResult = Object.entries(mergeResult)
            .map(([date, { income, expense }]) => {
                return { income, expense, name: date }
            })
            .sort((a, b) => {
                return +a.name.split('-')[1] - +b.name.split('-')[1]
            })
        setMergeIncomeExpense(mergeResult)
    }, [income, expense])
    useEffect(() => {
        console.log(expense)
    }, [expense])

    return (
        <div className="linerChart-container">
            <AreaChart
                width={730}
                height={250}
                data={mergeIncomeExpense}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                className="linerChartPosition"
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0a043c" stopOpacity={1} />
                        <stop
                            offset="95%"
                            stopColor="#a3ddcb"
                            stopOpacity={0.5}
                        />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={1} />
                        <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0.5}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
            </AreaChart>
        </div>
    )
}
