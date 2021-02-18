import React, { useState, useRef, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
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
]

function Expenses() {
    toast.configure()
    const uid = firebase.auth().currentUser?.uid

    const [group, setGroup] = useState(false)
    const [rating, setRating] = useState(0)
    const [req, setReq] = useState(true)

    const [dropDownVal, setDropDownVal] = useState('Select Expenses Group')
    const [dropVal, setDropVal] = useState(expList)

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
            priceRef.current.style.border = 'red solid 3px'

            return userMessage(1, '🤨 Please add only number in a price')
        }
        if (nameRef.current.value.length < 1) {
            nameRef.current.style.border = 'red solid 3px'
            return userMessage(1, '😕 Name - Input should not be empty')
        }
        setReq((prev) => !prev)
        const getDat = await firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .get()
        let toDayData = getDat.data()[toDay()]
        if (!getDat.data()?.[toDay()]) {
            toDayData = []
        }

        await firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .set({
                [toDay()]: [
                    {
                        name: nameRef.current.value,
                        value: priceRef.current.value,
                        priority: rating,
                    },
                    ...toDayData,
                ],
            })
        setReq((prev) => !prev)
        return userMessage(1, 'Added successFull')
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .onSnapshot((doc) => {
                setRowData(doc.data()?.[toDay()])
            })
    }, [])

    async function handleDropDownAddVal() {
        console.log(dropVal)
        // if (dropVal.find((el) => el.nameExp === groupNameRef.current.value)) {
        //     return userMessage(
        //         1,
        //         '😕 The group has already been added, you cannot add twice'
        //     )
        // }
        if (groupNameRef.current.value.length === 0) {
            return setGroup(!group)
        }
        const getDropData = await firebase
            .firestore()
            .collection('user')
            .doc(uid)
            .get()
        let setDropDat = getDropData.data()?.dropdown
        if (!setDropDat) {
            setDropDat = []
        }
        await firebase
            .firestore()
            .collection('user')
            .doc(uid)
            .set({
                dropdown: [
                    ...setDropDat,
                    { nameExp: groupNameRef.current.value },
                ],
            })
        setDropDownVal(groupNameRef.current.value)
        setGroup(true)
        return userMessage(
            2,
            '😎 The new group has been successfully added to your account'
        )
    }
    useEffect(() => {
        firebase
            .firestore()
            .collection('user')
            .doc(uid)
            .onSnapshot((doc) => {
                setDropVal((prev) => [...prev, doc.data()?.dropdown].flat())
                console.log([...dropVal, doc.data()?.dropdown].flat())
            })
    }, [])
    return (
        <div className="container ">
            <div className="container ">
                <div className="container add">
                    {group ? (
                        <DropdownButton id="mainColor" title={dropDownVal}>
                            {dropVal.map(({ nameExp }, index) => {
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
                        onClick={
                            group
                                ? () => setGroup(!group)
                                : handleDropDownAddVal
                        }
                    >
                        {group ? '+Create new Group' : 'Add group'}
                    </button>
                </div>

                <div className="add namPrice">
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
                {req ? (
                    <Button
                        className="btn mainColor w-50"
                        onClick={handleAddExpenses}
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
