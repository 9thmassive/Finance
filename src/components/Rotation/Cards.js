import Cart from './../card/Cart'
import incomes from './icons/income.svg'
import expenses from './icons/expense.svg'
import wallet from './icons/wallet.svg'

export default function Cards() {
    let cardInfo = [
        {
            money: '1000$',
            type: 'Balance',
            icon: wallet,
        },
        {
            money: '3000$',
            type: 'Income',
            icon: incomes,
        },
        {
            money: '2000$',
            type: 'Expenses',
            icon: expenses,
        },
    ]
    return (
        <div className="cart-container">
            {cardInfo.map(({ money, type, icon }, index) => {
                return (
                    <Cart money={money} type={type} icon={icon} key={index} />
                )
            })}
            {/* <Cart
                money="1000$"
                type="Balance"
                icon="https://www.flaticon.com/svg/vstatic/svg/584/584026.svg?token=exp=1612339960~hmac=796198bd81a390fbc1f460472324b753"
            />
            <Cart
                font_color="red"
                money="2000$"
                type="Expenses"
                icon="https://www.flaticon.com/svg/vstatic/svg/2867/2867713.svg?token=exp=1612339999~hmac=8a3fac76fdce4b98b363419ddb031977"
            />
            <Cart
                font_color="green"
                money="3000$"
                type="Income"
                icon="https://www.flaticon.com/svg/vstatic/svg/3135/3135706.svg?token=exp=1612340102~hmac=eaf1c236e1ae7a29475e8dd6a1eedce3"
            /> */}
        </div>
    )
}
