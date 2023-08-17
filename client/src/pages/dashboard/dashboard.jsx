import React, { useState, useContext } from 'react'
import { AuthContext } from '../../app/auth'
import Text from './../../component/inputs/text'
import Button from './../../component/button'
import Switch from '../../component/switch'
import SubNav from '../../component/subnav'
import Modal from '../../component/modal';
import { UilHome, UilAt, UilInfoCircle } from '@iconscout/react-unicons'
import './dashboard.scss'

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState("Home")
    const [text, setText] = useState("")
    const [numberField, setNumberField] = useState("")
    const [switchOne, setSwitchOne] = useState(false)
    const [switchTwo, setSwitchTwo] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const authContext = useContext(AuthContext)

    return (
        <div>
            <h1 className='page-title'>Dashboard</h1>
            <div style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                <SubNav 
                    selected={selectedTab}
                    onChange={(item) => setSelectedTab(item.title)}
                    menuItems={[
                        {
                            icon: <UilHome />,
                            title: 'Home',
                        },
                        {
                            icon: <UilInfoCircle />,
                            title: 'About',
                        },
                        {
                            icon: <UilAt />,
                            title: 'Contact',
                        }
                    ]}
                />
            </div>
            <div style={{ marginLeft: 20, marginTop: 20 }}>
                <SubNav 
                    type="fit"
                    selected={selectedTab}
                    onChange={(item) => setSelectedTab(item.title)}
                    menuItems={[
                        {
                            icon: <UilHome />,
                            title: 'Home',
                        },
                        {
                            icon: <UilInfoCircle />,
                            title: 'About',
                        },
                        {
                            icon: <UilAt />,
                            title: 'Contact',
                        }
                    ]}
                />
            </div>
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
                <div>
                    <div style={{ display: 'flex', marginTop: 15 }}>
                        <Switch 
                            checked={switchOne}
                            onChange={setSwitchOne}
                        />
                        <Switch 
                            checked={switchTwo}
                            onChange={setSwitchTwo}
                            style={{ marginLeft: 20 }}
                        />
                        <Switch 
                            variant="dark"
                            checked={switchTwo}
                            onChange={setSwitchTwo}
                            style={{ marginLeft: 20 }}
                        />
                        <Switch 
                            variant="primary"
                            checked={switchTwo}
                            onChange={setSwitchTwo}
                            style={{ marginLeft: 20 }}
                        />
                    </div>
                </div>
                <div>
                    <Button 
                        variant="primary"
                        text="Open Modal"
                        onClick={() => setIsModalOpen(true)}
                        style={{ marginTop: 15 }}
                    />
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Modal Title`}>
                        <p>Modal data</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
