import React, { useState, useContext } from 'react'
import { AuthContext } from '../../app/auth'
import Text from './../../component/inputs/text'
import Button from './../../component/button'
import './dashboard.scss'

export default function Dashboard() {
    const [text, setText] = useState("")
    const [numberField, setNumberField] = useState("")
    const authContext = useContext(AuthContext)

    return (
        <div>
            <h1 className='page-title'>Dashboard</h1>
            <div className="element-container">
                <div>
                    <Text
                        label="Number Input"
                        variant={`${authContext.dark?"dark":""}`}
                        value={numberField}
                        onChange={(value) => {
                            if(/^\d*\.?\d*$/.test(value)) setNumberField(value)
                        }}
                        style={{ marginTop: 30 }}

                    />
                </div>
                <div>
                    <Text
                        label="Text Input"
                        variant={`${authContext.dark?"dark":""}`}
                        value={text}
                        onChange={setText}
                        style={{ marginTop: 30 }}

                    />
                </div>
                <div>
                    <Button 
                        variant="dark"
                        text="Dark Button"
                        onClick={() => console.log("DARK")}
                        style={{ marginTop: 15 }}
                    />
                </div>
                <div>
                    <Button 
                        variant="primary"
                        text="Primary Button"
                        onClick={() => console.log("PRIMARY")}
                        style={{ marginTop: 15 }}
                    />
                </div>
            </div>
        </div>
    )
}
