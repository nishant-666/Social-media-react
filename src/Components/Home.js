import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { Input, Button, Divider } from "antd";
import { SendOutlined } from '@ant-design/icons';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import moment from "moment";
export default function Home({ database }) {
    const dataRef = collection(database, 'SocialData')
    const { TextArea } = Input;
    const [textState, setText] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [statusData, setStatusData] = useState([]);
    let navigate = useNavigate();
    const getText = (event) => {
        setText(event.target.value)
    }
    useEffect(() => {
        let token = sessionStorage.getItem('Token');
        setUserEmail(localStorage.getItem('userEmail'));
        setUserName(localStorage.getItem('userName'))
        setUserImage(localStorage.getItem('UserImage'));
        getData();
        if (!token) {
            navigate('/')
        }
    }, [])

    const addData = () => {
        addDoc(dataRef, {
            statusUpdate: textState,
            userName: userName,
            email: userEmail,
            avatar: userImage,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
        })
            .then(() => {
                alert('Status Updated')
                getData()
                setText('')
            })
            .catch((err) => {
                alert('Status Update Failed')
            })
    }

    const getData = async () => {
        await getDocs(dataRef)
            .then((response) => {
                setStatusData(response.docs.map((items) => {
                    return items.data()
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <Header />
            <div className="textArea-container">
                <TextArea
                    showCount
                    maxLength={100}
                    rows={4}
                    value={textState}
                    placeholder="Type Something Useful.."
                    onChange={getText} />
                <div className="btn-container">
                    <Button
                        type="primary"
                        onClick={addData}
                        disabled={textState ? false : true}
                        icon={<SendOutlined />}
                        size="medium">
                        Send
                    </Button>
                </div>

                <div className="readStatuses">
                    <Divider />
                    {statusData.map((status) => {
                        return (
                            <div>
                                <div className="status-row-1">
                                    <div>
                                        <img className="Avatar" src={status.avatar} />
                                    </div>
                                    <div className="status-data">
                                        <p className="status-username">{status.userName}</p>
                                        <p className="status-timestamp">{status.timestamp}</p>
                                    </div>
                                </div>
                                <h2 className="status-header">{status.statusUpdate}</h2>
                                <Divider />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}