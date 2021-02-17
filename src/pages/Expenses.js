import React, { useState, useRef, useEffect } from 'react'
import { DropdownButton, Dropdown, Form } from 'react-bootstrap'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import { toast } from 'react-toastify'
import firebase from 'firebase'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Rating from 'react-simple-star-rating'
import './exp.css'
const expList = [
    {
        nameExp: 'Auto insurance.',
    },
    {
        nameExp: 'Health insurance.',
    },
    {
        nameExp: 'Car payment.',
    },
    {
        nameExp: 'Child care',
    },
    {
        nameExp: 'utility',
    },
    {
        nameExp: 'Other',
    },
]

function Expenses() {
    toast.configure()
    const uid = firebase.auth().currentUser?.uid

    const [group, setGroup] = useState(false)
    const [rating, setRating] = useState(0)

    const [dropDownVal, setDropDownVal] = useState('Select Expenses Group')
    const [dorpVal, stDropVal] = useState(expList)

    const [expData, setExpData] = useState([])
    const [rowData, setRowData] = useState([{}])
    //-------------------
    const groupNameRef = useRef()
    const nameRef = useRef()
    const priceRef = useRef()
    //-------------------
    const toDay = () => new Date().toLocaleDateString()

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
    //
    async function handleAddExpenses() {
        if (parseInt(priceRef.current.value) !== +priceRef.current.value) {
            return userMessage(3, 'Please add only number in a price')
        }

        await firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.data()?.[toDay()]) {
                    setExpData(() => doc.data()[toDay()])
                } else {
                    setExpData(() => [])
                }
            })

        await firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .set({
                [toDay()]: [
                    ...expData,
                    {
                        name: nameRef.current.value,
                        value: priceRef.current.value,
                        priority: rating,
                    },
                ],
            })

        // setRowData([
        //     ...rowData,
        //     {
        //         name: nameRef.current.value,
        //         value: priceRef.current.value,
        //         priority: rating,
        //     },
        // ])
        return userMessage(1, 'Added successFull')
    }
    useEffect(() => {
        firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .onSnapshot((doc) => {
                setRowData(() => doc.data()?.[toDay()])
            })
        console.log(rowData)
    }, [expData])

    return (
        <div className="container ">
            <div className="container ">
                <div className="container add">
                    {group ? (
                        <DropdownButton id="mainColor" title={dropDownVal}>
                            {dorpVal.map(({ nameExp }, index) => {
                                return (
                                    <Dropdown.Item
                                        key={index}
                                        className="drop-hover"
                                        as="button"
                                        onClick={(e) => {
                                            setDropDownVal(e.target.outerText)
                                        }}
                                    >
                                        {nameExp}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    ) : (
                        <Form.Control
                            ref={groupNameRef}
                            className="expInput"
                            placeholder="Group name"
                        />
                    )}

                    <button
                        className="btn mainColor expLeft "
                        onClick={() => {
                            setGroup(!group)
                            if (!group) {
                                if (
                                    dorpVal.find(
                                        (el) =>
                                            el.nameExp ===
                                            groupNameRef.current.value
                                    )
                                ) {
                                    return userMessage(
                                        1,
                                        '😕 The group has already been added, you cannot add twice'
                                    )
                                }
                                stDropVal((prev) => [
                                    ...prev,
                                    {
                                        nameExp: groupNameRef.current.value,
                                    },
                                ])
                            }
                        }}
                    >
                        {group ? '+Create new Group' : 'Add group'}
                    </button>
                </div>

                <div className="add namPrice">
                    <Form.Control
                        className="expInput expLeft"
                        placeholder="Name"
                        ref={nameRef}
                    />
                    <Form.Control
                        className="expInput expLeft"
                        placeholder="Price"
                        ref={priceRef}
                    />
                    <Form.Check className="expLeft expCheck" />
                </div>
                <span className="txtc">Cost Priority</span>
                <div className="rate">
                    <Rating
                        onClick={(rate) => {
                            setRating(rate)
                        }}
                        ratingValue={rating}
                        size={25}
                        label
                        transition
                        fillColor="orange"
                        emptyColor="gray"
                    />
                </div>
                <button
                    className="btn mainColor w-50"
                    onClick={handleAddExpenses}
                >
                    Add List
                </button>
            </div>

            <div className="listt ">
                <br />
                <div
                    className="ag-theme-alpine"
                    style={{ height: 400, width: 600 }}
                >
                    <AgGridReact rowData={rowData}>
                        <AgGridColumn field="name"></AgGridColumn>
                        <AgGridColumn field="value"></AgGridColumn>
                        <AgGridColumn field="priority"></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
export default Expenses
