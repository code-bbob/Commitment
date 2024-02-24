import React, { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import axios from 'axios';

const Heatmap = ({data}) => {

    return (
        <>
            <ActivityCalendar
               const data = {data.concat([{
                "date" : "2025-01-01",
                "count": 10,
                "level": 4
            }])}
            
                theme={{
                    light: ['#0002', 'green'],
                    dark: ['#0008', 'green'],
                }}

                colorscheme='dark'

                showWeekdayLabels

                blockSize={15}
                blockMargin={3}
            />
        </>
    );
};

export default Heatmap;
