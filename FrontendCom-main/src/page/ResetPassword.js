import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import axios from 'axios';

function ResetPassword() {
    const { token } = useParams();
    const [email, setEmail] = useState('');

    const callRequestPassword = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/request-password-reset", { email: email });
            const data = await res.data;
            console.log(data);
            return true; // Indicate that the request was successful
        } catch (e) {
            console.log(e);
            return false; // Indicate that there was an error
        }
    };

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    };

    const navigate = useNavigate();
    const handleSignInClick = () => navigate('/signin');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailsweet = async () => {
        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email format!',
            });
            return;
        }

        const response = await callRequestPassword();

        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Already sent link to your email',
                text: 'Please check your inbox for further instructions.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed to send email',
                text: 'Please try again later.',
            });
        }
        console.log("Reset password for token:", token);
    };

    return (
        <BaseLayout>
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                }}>
                    <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '28px', marginTop: '0px', color: '#292724' }}>
                        Password Reset
                    </h1>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '90%' }}>
                        Email:
                    </h2>
                    <input
                        type="email"
                        placeholder="Enter your email to reset the password"
                        value={email}
                        onChange={handleInputEmail}
                        style={{
                            padding: '14px',
                            width: '450px',
                            fontSize: '17px',
                            borderRadius: '12px',
                            fontFamily: 'Montserrat, sans-serif',
                            backgroundColor: '#d1ed9a',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                    <div style={{ marginTop: '35px' }}>
                        <button
                            onClick={handleEmailsweet}
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 900,
                                padding: '10px 20px',
                                fontSize: '20px',
                                borderRadius: '12px',
                                width: '350px',
                                background: '#ed9abe',
                                color: '#292724',
                                marginTop: '-30px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // เพิ่มเงา
                                transition: 'all 0.3s ease', // เพิ่มการเปลี่ยนแปลง
                                height: '50px',
                                border: 'none',
                                outline: 'none'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'; // เพิ่มเงาเมื่อเมาส์อยู่เหนือ
                                e.currentTarget.style.transform = 'translateY(-2px)'; // ยกปุ่มขึ้น
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // กลับเงาเป็นปกติ
                                e.currentTarget.style.transform = 'translateY(0)'; // กลับตำแหน่งปุ่ม
                            }}
                        >
                            Reset password
                        </button>
                    </div>

                    <h3
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            fontSize: '19px',
                            marginTop: '20px',
                            marginBottom: '-3%',
                            color: '#a3181a',
                            cursor: 'pointer'
                        }}
                        onClick={handleSignInClick}
                    >
                        back to sign in
                    </h3>
                </div>
            </div>
        </BaseLayout>
    );
}

export default ResetPassword;
