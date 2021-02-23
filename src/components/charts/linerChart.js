import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts';
const data = [
    {
        name: 'March',
        inc: 1200,
        exp: 1300,
    },
]

export default function App() {

    return (
        <div className="linerChart-container">
            <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                className="linerChartPosition"
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0a043c" stopOpacity={1} />
                        <stop
                            offset="95%"
                            stopColor="#a3ddcb"
                            stopOpacity={0.5}
                        />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={1} />
                        <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0.5}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="Out"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
                <Area
                    type="monotone"
                    dataKey="In"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
            </AreaChart>
        </div>
    )
}
