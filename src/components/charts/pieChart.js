import { PieChart, Pie, Tooltip, Label } from 'recharts'
import './chart.css'
export default function App(props) {
    return (
        <>
            <div className="labelpie">
                <p className="pieLabel">{props.label}</p>
                <PieChart width={300} height={250}>
                    <Tooltip />
                    <Pie
                        data={props.data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill={props.color}
                        label
                    />
                </PieChart>
            </div>
        </>
    )
}
