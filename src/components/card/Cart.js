import React, { PureComponent } from 'react'
import { BarChart, Bar, Tooltip, Legend } from 'recharts'
export default function App(props) {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ]

    return (
        <div className="cart">
            <div className="cart_and_icon_card">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                    <image href={props.icon} height="30" width="30" />
                </svg>

                <BarChart width={80} height={30} data={data}>
                    <Bar dataKey="uv" fill="#8884d8" />

                    <Tooltip />
                </BarChart>
            </div>
            <div className="card_type_money">
                <span className="card_type">{props.type}</span>
                <span
                    style={{ color: `${props.font_color}` }}
                    className="card_money"
                >
                    {props.money}
                </span>
            </div>
        </div>
    )
}
