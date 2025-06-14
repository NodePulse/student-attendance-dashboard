// "use client"

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

const PieChartComponent = ({ attendanceList }) => {

    const [data, setData] = useState([])
    console.log(data)
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];

    useEffect(() => {
        if (attendanceList) {
            const totalStud = getUniqueRecord(attendanceList);
            const today = moment().format("D");
            const precentagePresent =
                (attendanceList?.length / (totalStud.length * Number(today))) * 100;
            setData([
                {
                    name: "Total Present",
                    value: Number(precentagePresent.toFixed(1)),
                    fill: "#4c8cf8"
                },
                {
                    name: "Total Absent",
                    value: 100 - Number(precentagePresent.toFixed(1)),
                    fill: "#1fe6d1"
                }
            ])
        }
    }, [attendanceList]);

    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();

        attendanceList?.forEach((element) => {
            if (!existingUser.has(element.studentId)) {
                existingUser.add(element.studentId);
                uniqueRecord.push(element);
            }
        });

        return uniqueRecord;
    };

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Monthly Attendance</h2>
            <ResponsiveContainer width={"100%"} height={300}>
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey={"value"} nameKey={"name"} cx={"50%"} cy={"50%"} innerRadius={60} outerRadius={80} label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent