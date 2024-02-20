import React from 'react'
import ActivityCalendar from 'react-activity-calendar'


const Heatmap = () => {
    
    const data = [
        {   "stb": "bibhab",
            "date": "2024-01-01",
            "count": 50,
            "level": 4
        },
        {
            "user": {
                "id": 1,
                "name": "Bibhab Basnet",
                "email": "bbobbasnet@gmail.com"
            },
            "type": "Personal",
            "title": "Bibhab the great",
            "content": "Bibhab is the great",
            "date": "2024-02-20",
            "level": 4,
            "count": 50

        },
        {
            "date" : "2024-01-03",
            "count": 10,
            "level": 4
        },
        {
            "date" : "2025-01-01",
            "count": 10,
            "level": 4
        }
    ]

    return (
        <>
        <ActivityCalendar
            data={data}

            theme ={{
                light: ['#0002', 'green'],
                dark: ['#0008', 'green'],
            }}

            colorscheme='dark'

            showWeekdayLabels

            blockSize={15}
            blockMargin={3}
        />
        </>
    )
}

export default Heatmap