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
    const [dorpVal, setDropVal] = useState(expList)

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
        setGroup(!group)
        if (!group) {
            if (
                dorpVal.find((el) => el.nameExp === groupNameRef.current.value)
            ) {
                return userMessage(
                    1,
                    '😕 The group has already been added, you cannot add twice'
                )
            }
            if (groupNameRef.current.value.length < 1) {
                return setGroup(!group)
            }
            setDropVal((prev) => [
                ...prev,
                {
                    nameExp: groupNameRef.current.value,
                },
            ])
        }
        const getDropData = await firebase
            .firestore()
            .collection('user')
            .doc(uid)
            .get('dropdown')
        console.log()
        if (getDropData.data().dropdown) {
            await firebase
                .firestore()
                .collection('user')
                .doc(uid)
                .set({
                    dropdown: [
                        ...getDropData?.data()?.dropdown,
                        { expData: groupNameRef.current.value },
                    ],
                })
        } else {
            await firebase
                .firestore()
                .collection('user')
                .doc(uid)
                .set({
                    dropdown: [{ expData: groupNameRef.current.value }],
                })
        }
        return userMessage(
            2,
            '😎 The new group has been successfully added to your account'
        )
    }

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
