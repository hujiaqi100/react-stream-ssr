import React, { useState, useEffect } from 'react';
import { Button } from 'antd'
import './one.less'
import { Link } from 'react-router-dom'
const One = () => {
    return (
        <div className='xx' >
            <Button type='primary'>
                <Link to={'/aa'} >jump to aa</Link>
            </Button>

        </div>
    )
}
export default One