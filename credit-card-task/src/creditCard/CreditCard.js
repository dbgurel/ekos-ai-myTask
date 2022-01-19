import React, { useEffect, useState } from 'react';
import './CreditCard.css';
import validator from 'validator';
import { RiVisaFill } from 'react-icons/ri';
import { FaCcMastercard } from "react-icons/fa";


function CreditCard() {

    const [toggle, setToggle] = useState(true)
    const [ccv, setCCV] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expDateMonth, setExpDateMonth] = useState('')
    const [expDateYear, setExpDateYear] = useState('')
    const [errorMsg, setSetErrorMsg] = useState('')
    const [validNumbers, setValidNumbers] = useState([])


    useEffect(() => {
        fetch('https://mocki.io/v1/a5ae8585-b42d-486b-a4ff-25ebfebbaddf')
            .then((res) => res.json())
            .then((data) => {
                setValidNumbers(data)
            })
    }, [])
    const paymentConfirm = () => {

        validNumbers.map((item) => {
            if (cardNumber == item.number && (expDateMonth + '/' + expDateYear) == item.exp && ccv == item.ccv) {
                alert('Payment is Successful')
            }
        })
        if (validator.isLength(cardNumber, { max: 15 })) {
            setSetErrorMsg('Please enter a valid card number')
        }
        else if (cardNumber.startsWith('4') == false && cardNumber.startsWith('5') == false) {
            setSetErrorMsg('Please enter a valid card number')
        }
    }

    const dateHandleChangeMonth = (e) => {
        setExpDateMonth(e)
    }
    const dateHandleChangeYear = (e) => {
        setExpDateYear(e)
        let newDate = new Date(('20' + expDateYear), (expDateMonth - 1))
        if (validator.isDate(newDate, { format: 'MM/YY' })) {
            setSetErrorMsg('')
        }
        else {
            setSetErrorMsg('Invalid Date, it should be in MM/YY format');
        }
    }
    return (
        <div className='creditCardContainer'>
            <div className='btnContainer'>
                <button onClick={() => { paymentConfirm() }} className='btn'>Confirm Payment</button>
            </div>
            <div className={toggle == true ? 'frontView' : 'disabled'}>
                <div className='content'>

                    <div className='frontChip'>
                        <RiVisaFill className={cardNumber.startsWith('4') ? 'icon' : 'disabled'} />
                        <FaCcMastercard className={cardNumber.startsWith('5') ? 'icon' : 'disabled'} />
                    </div>
                    <div className='cardNumbers'>
                        <input type='text' className='numberInput' value={cardNumber} placeholder='Enter a valid card number' maxLength={16} onChange={(e) => { setCardNumber(e.target.value) }}></input>
                    </div>
                </div>
            </div>
            <div className={toggle == true ? 'disabled' : 'backView'}>
                <div className='cardStrip'></div>
                <div className='content backContent'>
                    <input className='dateInput' type='text' value={expDateMonth} placeholder='MM' maxLength={2} onChange={(e) => { dateHandleChangeMonth(e.target.value) }}></input>
                    <span>/</span>
                    <input className='dateInput' type='text' value={expDateYear} placeholder='YY' maxLength={2} onChange={(e) => { dateHandleChangeYear(e.target.value) }}></input>
                    <input className='ccvInput' type='tel' placeholder='CCV' maxLength={3} onChange={(e) => { setCCV(e.target.value) }}></input>



                </div>

            </div>
            <div className='altBtnContainer'>
                <button className='btn' onClick={() => setToggle(!toggle)}>Change Card View</button>
            </div>
            <div className='errorContainer'>
                {errorMsg !== '' ? (<span>***{errorMsg}</span>) : (<></>)}
            </div>
        </div>
    )
}

export default CreditCard;