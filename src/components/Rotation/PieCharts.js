import PieChart from './../charts/pieChart'
import firebase from 'firebase'
import { useState, useEffect, useCallback } from 'react'

export default function PieCharts() {
    const [uid, setUid] = useState(null)
    const [expenseData, setExpenseData] = useState([])
    const [incomeData, setIncomeData] = useState([])

    const pieData = useCallback((data) => {
        let result = []
        for (let [key, value] of Object.entries(data)) {
            result.push({
                name: key,
                value: value.reduce((a, b) => a + +b.value, 0),
            })
        }
        result = result.sort((a, b) => {
            return a.value > b.value ? -1 : 1
        })

        if (result.length > 5) {
            result = result.slice(0, 5)
        }
        return result
    })
    //setting data
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => setUid(user?.uid))
    }, [])
    useEffect(() => {
        if (!uid) {
            return
        }
        firebase
            .firestore()
            .collection('income')
            .doc(uid)
            .onSnapshot((userCredential) => {
                if (!userCredential.data()) {
                    return
                }
                setIncomeData(pieData(userCredential.data()))
            })
        firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .onSnapshot((userCredential) => {
                if (!userCredential.data()) {
                    return
                }
                setExpenseData(pieData(userCredential.data()))
            })
    }, [uid])
    useEffect(() => {
        console.log(incomeData)
    }, [incomeData])

    return (
        <div className="pieChart">
            <PieChart color="#bd2000" label="Top 5 Incomes" data={incomeData} />
            <PieChart
                color="#28527a"
                label="Top 5 Expenses"
                data={expenseData}
            />
        </div>
    )
}
