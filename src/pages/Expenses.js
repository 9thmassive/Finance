import React, { useState, useRef, useEffect } from 'react'
import { Button, Spinner, OverlayTrigger, Popover } from 'react-bootstrap'
import { DropdownButton, Dropdown, Form } from 'react-bootstrap'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import { toast } from 'react-toastify'
import firebase from 'firebase'
import Swal from 'sweetalert2'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Rating from 'react-simple-star-rating'
import './exp.css'
// import myGrupRemoveIcoN from './img/dropRemov.svg'
//
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
        nameExp: 'Utility',
    },
]
toast.configure()

function Expenses() {
    const [uid, setUid] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUid(currentUser?.uid)
        })
    }, [])

    const [emptyData, setEmptyData] = useState(false)

    const [group, setGroup] = useState(false)
    const [rating, setRating] = useState(0)
    const [req, setReq] = useState(true)

    const [dropDownVal, setDropDownVal] = useState('Select Expenses Group')
    const [dropVal, setDropVal] = useState(expList)
    const [rowData, setRowData] = useState([])
    const [fullData, setFullData] = useState()
    //-------------------
    const groupNameRef = useRef()
    const nameRef = useRef()
    const priceRef = useRef()
    const [selectedGroup, setSelectedGroup] = useState('Car Payment')
    //-------------------
    const toDay = () => new Date().toLocaleDateString().split('/').join('-')
    const thisTime = () => new Date().toLocaleTimeString()

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
    useEffect(() => {
        if (uid) {
            firebase
                .firestore()
                .collection('expenses')
                .doc(uid)
                .get((doc) => {
                    if (!doc.data()[toDay()]) {
                        setEmptyData(!emptyData)
                    }
                })
        }
    }, [uid])
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
        if (emptyData) {
            await firebase
                .firestore()
                .collection('expenses')
                .doc(uid)
                .set({
                    [toDay()]: [
                        {
                            group: selectedGroup,
                            name: nameRef.current.value,
                            value: priceRef.current.value,
                            priority: rating,
                            date: toDay() + thisTime(),
                        },
                    ],
                })
            setEmptyData((prev) => !prev)
        } else {
            await firebase
                .firestore()
                .collection('expenses')
                .doc(uid)
                .update({
                    [toDay()]: firebase.firestore.FieldValue.arrayUnion({
                        group: selectedGroup,
                        name: nameRef.current.value,
                        value: priceRef.current.value,
                        priority: rating,
                        date: toDay() + thisTime(),
                    }),
                })
        }

        setReq((prev) => !prev)
        return userMessage(1, 'Added successFull')
    }

    useEffect(() => {
        if (!uid) {
            return
        }
        firebase
            .firestore()
            .collection('expenses')
            .doc(uid)
            .onSnapshot((doc) => {
                if (doc.data()[toDay()]) {
                    setRowData(doc.data()[toDay()].reverse())
                }
            })
    }, [uid])

    async function handleDropDownAddVal() {
        if (dropVal.find((el) => el.nameExp === groupNameRef.current.value)) {
            return userMessage(
                1,
                '😕 The group has already been added, you cannot add twice'
            )
        }
        if (groupNameRef.current.value.length === 0) {
            return setGroup(!group)
        }
        await firebase
            .firestore()
            .collection('user')
            .doc(uid)
            .update({
                dropdown: firebase.firestore.FieldValue.arrayUnion({
                    nameExp: groupNameRef.current.value,
                }),
            })
        setDropDownVal(groupNameRef.current.value)
        setGroup((prev) => !prev)
        return userMessage(
            2,
            '😎 The new group has been successfully added to your account'
        )
    }
    useEffect(() => {
        if (!uid) {
            return
        }
        firebase
            .firestore()
            .collection('user')
            .doc(uid)
            .onSnapshot((doc) => {
                if (doc.data()?.dropdown) {
                    setDropVal(() => [...dropVal, ...doc.data()?.dropdown])
                    //remove dubllicate from dropdown data
                    setDropVal((prev) =>
                        prev.filter(
                            (v, i, a) =>
                                a.findIndex((t) => t.nameExp === v.nameExp) ===
                                i
                        )
                    )
                }
            })
    }, [uid])
    async function handleRemoveGroup(e) {
        Swal.fire({
            title: 'Are you sure?',
            text:
                'If you delete then all information on this group is deleted.!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            const targetGroup = e.target.parentNode.innerHTML.split('<')[0]
            if (result.isConfirmed) {
                await firebase
                    .firestore()
                    .collection('expenses')
                    .doc(uid)
                    .onSnapshot((doc) => {
                        setFullData(() => doc.data())
                    })
                setFullData((p) => JSON.stringify(p))
                console.log(fullData)
                let cleanData = []
                // fullData.forEach((date) => {
                //     date.forEach(({ group, index }) => {
                //         if (group === targetGroup) {
                //             delete date[index]
                //         }
                //     })
                // })

                Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            }
        })
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3" className="headerTooltip">
                Popover right
            </Popover.Title>
            <Popover.Content>How important is your spending?</Popover.Content>
        </Popover>
    )

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
                                            setDropDownVal(
                                                () => e.target.outerText
                                            )
                                            setSelectedGroup(
                                                () => e.target.outerText
                                            )
                                        }}
                                    >
                                        <p className="dropDownData">
                                            {nameExp}
                                            {!expList.find(
                                                ({ nameExp: val }) =>
                                                    val === nameExp
                                            ) ? (
                                              null
                                                // <img
                                                //     onClick={handleRemoveGroup}
                                                //     className="remove_group_dropdown"
                                                //     src={myGrupRemoveIcoN}
                                                // />
                                            ) : null}
                                        </p>
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
                    <OverlayTrigger
                        trigger="hover"
                        placement="right"
                        overlay={popover}
                    >
                        <p className="ratingPriority">?</p>
                    </OverlayTrigger>
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
                    style={{ height: 400, width: 'auto' }}
                >
                    <AgGridReact rowData={rowData}>
                        <AgGridColumn field="group"></AgGridColumn>
                        <AgGridColumn field="name"></AgGridColumn>
                        <AgGridColumn field="value"></AgGridColumn>
                        <AgGridColumn field="priority"></AgGridColumn>
                        <AgGridColumn field="date"></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
export default Expenses
