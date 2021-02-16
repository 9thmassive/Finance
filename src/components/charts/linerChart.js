import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from 'recharts'
const data = [
    {
        name: 'March',
        In: 1200,
        Out: 1300,
    },
    {
        name: 'April',
        In: 6000,
        Out: 3541,
    },
    {
        name: 'May',
        In: 2000,
        Out: 1500,
    },
    {
        name: 'Jun',
        In: 2000,
        Out: 5400,
    },
    {
        name: 'July',
        In: 3800,
        Out: 1400,
    },
    {
        name: 'Ougust',
        In: 2500,
        Out: 3000,
    },
    {
        name: 'July',
        In: 3800,
        Out: 1400,
    },
    {
        name: 'Ougust',
        In: 2500,
        Out: 3000,
    },
    {
        name: 'March',
        In: 1200,
        Out: 1300,
    },
    {
        name: 'April',
        In: 6000,
        Out: 3541,
    },
    {
        name: 'May',
        In: 2000,
        Out: 1500,
    },
    {
        name: 'Jun',
        In: 2000,
        Out: 5400,
    },
    {
        name: 'July',
        In: 3800,
        Out: 1400,
    },
    {
        name: 'Ougust',
        In: 2500,
        Out: 3000,
    },
    {
        name: 'July',
        In: 3800,
        Out: 1400,
    },
    {
        name: 'Ougust',
        In: 5500,
        Out: 6000,
    },
    {
        name: 'March',
        In: 1200,
        Out: 1300,
    },
    {
        name: 'April',
        In: 6000,
        Out: 3541,
    },
    {
        name: 'May',
        In: 2600,
        Out: 500,
    },
    {
        name: 'Jun',
        In: 3000,
        Out: 1000,
    },
    {
        name: 'July',
        In: 800,
        Out: 400,
    },
    {
        name: 'Ougust',
        In: 6500,
        Out: 1000,
    },
    {
        name: 'July',
        In: 2800,
        Out: 4400,
    },
    {
        name: 'Ougust',
        In: 1500,
        Out: 2000,
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
                    dataKey="In"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
                <Area
                    type="monotone"
                    dataKey="Out"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
            </AreaChart>
        </div>
    )
}
