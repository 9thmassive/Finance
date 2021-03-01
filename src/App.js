import firebase from 'firebase'
import './App.css'
import { useState, useEffect } from 'react'
import Login from './components/registration/Login'
import Signup from './components/registration/Signup'

import ForgotPassword from './components/registration/ForgotPassword'
import Navbar from './components/NavBar/Navbar'
import { Tabs, Tab } from 'react-bootstrap'

import LeadingPage from './components/leadingPage/LeadingPage'
import Hypotec from './components/Hypothec/Hypothec'

import MainDeposit from './components/Deposit/MainDeposit'

import Transaction from './pages/Transaction'
import Income from './pages/Income'
import Expenses from './pages/Expenses'
import FindSaving from './components/findSaving/FindSaving'
import Profile from './components/profile/Profile'
import Dashboard from './components/Rotation/Dashboard'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    useHistory,
} from 'react-router-dom'

function App() {
    let history = useHistory()
    const [user, setUser] = useState(null)
    const [income, setIncome] = useState(null)
    const [expenses, setExpenses] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            async function manageIncomeExpenses() {
                const firestoreCurrentCollection = await firebase
                    .firestore()
                    .collection('income')
                    .doc(firebaseUser.uid)
                    .get()
            }
            setUser(firebaseUser)
            if (firebaseUser) {
                firebase
                    .firestore()
                    .collection('user')
                    .doc(firebaseUser.uid)
                    .update({
                        displayName: firebaseUser.displayName,
                    })
            }
        })
    }, [])

    return (
        <div className="App">
            <Router>
                {user ? <Navbar /> : null}

                <Switch>
                    <Route path="/transaction" exact component={Transaction} />
                    <Route path="/income" component={Income} />
                    <Route path="/expenses" component={Expenses} />
                    <Route exact path="/">
                        {user ? <Dashboard /> : <LeadingPage />}
                    </Route>
                    <Router exact path="/dashboard">
                        {user ? <Dashboard /> : <LeadingPage />}
                    </Router>
                    <Router exact path="/registration">
                        {user ? <Dashboard /> : <Signup />}
                    </Router>
                    <Route exact path="/login">
                        {user ? <Dashboard /> : <Login />}
                    </Route>
                    <Route exact path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route exact path="/find-saving">
                        <FindSaving />
                    </Route>
                    <Route exact path="/calculator">
                        <div className="calc">
                            <div className="tabs-calc">
                                <Tabs
                                    defaultActiveKey="Hypotec"
                                    id="uncontrolled-tab-example"
                                >
                                    <Tab eventKey="Deposit" title="Deposit">
                                        <MainDeposit />
                                    </Tab>
                                    <Tab eventKey="Hypotec" title="Hypotec">
                                        <Hypotec />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
