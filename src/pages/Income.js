import React, { useState, useRef, useEffect } from 'react'
import { Button, Spinner} from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import { toast } from 'react-toastify'
import firebase from 'firebase'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import './exp.css'
import './inc.css'
toast.configure()

function Income() {
    const [uid, setUid] = useState(null);
    const [incomeGridData, setIncomeGridData] = useState([]);
    const [incomeData, setIncomeData] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUid(currentUser?.uid)
        })
    }, []);

    useEffect(() => {
      if(uid === null) {
        return
      }
      firebase.firestore().collection('income').doc(uid).onSnapshot(doc => {
        setIncomeData(doc.data());

      })
    },[uid]);

    useEffect(() => {
      if(!incomeData) return;
        let dataResult = [];
        for(let data of Object.values(incomeData)) {
          dataResult = [ ...dataResult, ...data]
        }
        setIncomeGridData(dataResult);
    },[incomeData])

    const [req, setReq] = useState(true)

    //-------------------
    const nameRef = useRef()
    const priceRef = useRef()
    //-------------------

    const toDay = () => new Date().toLocaleDateString().split('/').join('-')
    const thisTime = () => ' - ' + new Date().toLocaleTimeString()

    function userMessage(num, msg) {
        if (num === 1) {
            return toast.info(msg, {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (num === 2) {
            return toast.success(msg, {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        if (num === 3) {
            return toast.error(msg, {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }


    async function handleAddIncome() {

        if (parseInt(priceRef.current.value) !== +priceRef.current.value) {
            priceRef.current.style.border = 'red solid 3px'

            return userMessage(1, '🤨 Please add only number in a price')
        }
        if (nameRef.current.value.length < 1) {
            nameRef.current.style.border = 'red solid 3px'
            return userMessage(1, '😕 Name - Input should not be empty')
        }
        setReq((prev) => !prev)
        //My code here
        if(!incomeData || !incomeData[toDay()]) {
          await firebase
                .firestore()
                .collection('income')
                .doc(uid)
                .set({
                  [toDay()]: [
                    {
                      name: nameRef.current.value,
                      value: priceRef.current.value,
                      date: toDay() + thisTime(),
                    }
                  ]
                })
        } else {
          await firebase
                .firestore()
                .collection('income')
                .doc(uid)
                .update({
                  [toDay()]: firebase.firestore.FieldValue.arrayUnion({
                      name: nameRef.current.value,
                      value: priceRef.current.value,
                      date: toDay() + thisTime(),
                  })
                })
        }

        setReq((prev) => !prev)
        return userMessage(1, 'Added successFull')
    }

    return (
        <div className="container">
            <div className="container ">
                <div className="add namPrice incomeData">
                    <Form.Control
                        className="expInput expLeft"
                        placeholder="Name"
                        ref={nameRef}
                        onChange={() => {
                            nameRef.current.style.border = 'none'
                        }}
                    />
                    <Form.Control
                        className="expInput expLeft"
                        placeholder="Price"
                        ref={priceRef}
                        onChange={() => {
                            priceRef.current.style.border = 'none'
                        }}
                    />
                </div>
                <br/>
                <div className="incomeData">


                {req ? (
                    <Button
                        className="btn mainColor w-50"
                        onClick={handleAddIncome}
                    >
                        Add List
                    </Button>
                ) : (
                    <Button
                        className="w-50 mainColor"
                        variant="primary"
                        disabled
                    >
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                    </Button>
                )}
                </div>
            </div>
            <br/>

            <div className="listt incomeData">
                <br />
                <div
                    className="ag-theme-alpine"
                    style={{ height: 400, width: 600 }}
                >
                    <AgGridReact rowData={incomeGridData}>
                        <AgGridColumn field="name"></AgGridColumn>
                        <AgGridColumn field="value"></AgGridColumn>
                        <AgGridColumn field="date"></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
export default Income


