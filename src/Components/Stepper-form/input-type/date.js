import React from 'react';

import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function CommonlyUsedComponents({ value, onChange, style }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
            components={[
            'DatePicker'
            ]}
        >
            <DemoItem valueType="date">
            <DatePicker 
                value={value}
                onChange={onChange}
                style={style}
                label="ปีเกิด(ปี)"/>
            </DemoItem>
        </DemoContainer>
        </LocalizationProvider>
    );
}