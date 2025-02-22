import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import BaseLayout from './BaseLayout';

import axios from 'axios'


<link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
    rel="stylesheet"
></link>;

function SignIn() {

    //------------------sign in----------------------
    const [usernamesignin, setUsernamesignin] = useState('');
    const [passwordsignin, setPasswordsignin] = useState('');
    const [showPasswordsignin, setShowPasswordsignin] = useState(false); // สถานะการแสดงรหัสผ่าน

    const callSignin = async () => {
        // ตรวจสอบว่าได้กรอกข้อมูลทั้งหมดหรือไม่
        if (!usernamesignin || !passwordsignin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all the fields!',
            });
            return;
        }
    
        try {
            const res = await axios.post("http://localhost:3001/api/signin", {
                email: usernamesignin,
                password: passwordsignin
            });

            // เก็บ token ใน localStorage
            const userData = {
                id: res.data.user.id,
                token: res.data.token,
                email: res.data.user.email,
                role: res.data.user.role
            }
        
            // แปลงเป็น JSON string ก่อนเก็บ
            localStorage.setItem('user', JSON.stringify(userData));
    
            // จัดการข้อมูลเมื่อเข้าสู่ระบบสำเร็จ
            Swal.fire({
                title: 'Signed in successfully!',
                icon: 'success',
                confirmButtonText: 'OK', // กำหนดปุ่ม OK
            }).then((result) => {
                if (result.isConfirmed) {
                    // นำทางไปที่ User.js

                    navigate('/user'); // เปลี่ยนเส้นทางที่นี่
                }
            });


    
        } catch (e) {
            // จัดการข้อผิดพลาดจากการเข้าสู่ระบบ
            if (e.response) {
                // ตรวจสอบสถานะและแสดงข้อความที่เหมาะสม
                switch (e.response.status) {
                    case 400:
                    case 403:
                        if(e.response.data.message === 'You need to change your password. It has been more than 90 days since the last change.'){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: e.response.data.message || 'Error occurred.',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // นำทางไปที่ User.js
                                    navigate('/update-password'); // เปลี่ยนเส้นทางที่นี่
                                }
                            });
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: e.response.data.message || 'Error occurred.',
                            });
                        }
                        //console.log(e.response.data); // ดู JSON ที่ส่งกลับจากเซิร์ฟเวอร์
                        
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'An unexpected error occurred. Please try again later.',
                        });
                }
            } else {
                // กรณีไม่มีการตอบสนองจากเซิร์ฟเวอร์
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Could not connect to the server. Please check your internet connection.',
                });
            }
        }
    };
    

    const handleInputChange = (e) => {
        setUsernamesignin(e.target.value);
    };

    const handleInputChange2 = (e) => {
        //showpassword sign in
        setPasswordsignin(e.target.value);
    };

    const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
    const handleSignUpClick = () => navigate('/signup'); // ไปหน้า Sign Up
    const handleForgotPasswordClick = () => navigate('/request-reset-password'); // ไปหน้า Reset Password

    //---------------- sweet alert Sign in ---------------
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSigninsweet = () => {
        callSignin();
    };


    return (

        <BaseLayout>
            <div
                style={{
                    transform: 'scale(0.8)',
                    transformOrigin: 'center',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 1)', // กรอบโปร่งแสงสำหรับเนื้อหาฟอร์ม
                        padding: '35px',
                        borderRadius: '20px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                        position: 'relative', // เพิ่ม position relative
                    }}
                >
                    <h1
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            fontSize: '28px',
                            marginTop: '0px',
                            color: '#292724',
                        }}
                    >
                        Sign In
                    </h1>
                    <h2
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            fontSize: '17px',
                            marginRight: '90%',
                        }}
                    >
                        Email:
                    </h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={usernamesignin}
                        onChange={handleInputChange}
                        style={{
                            padding: '14px',
                            width: '450px',
                            fontSize: '17px',
                            borderRadius: '12px',
                            fontFamily: 'Montserrat, sans-serif',
                            backgroundColor: '#F4EEAD',
                            border: 'none',
                            outline: 'none',
                        }}
                    />

                    <h2
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            fontSize: '17px',
                            marginRight: '90%',
                            marginTop: '20px',
                        }}
                    >
                        Password:
                    </h2>
                    <div style={{ position: 'relative', width: '450px' }}>
                        <input
                            type={showPasswordsignin ? 'text' : 'password'} // เปลี่ยนเป็น type password ตามสถานะ
                            placeholder="Enter your password"
                            value={passwordsignin}
                            onChange={handleInputChange2}
                            style={{
                                padding: '14px',
                                width: '100%', // ใช้ width 100% เพื่อให้พอดีกับ div
                                fontSize: '17px',
                                borderRadius: '12px',
                                fontFamily: 'Montserrat, sans-serif',
                                backgroundColor: '#F4EEAD',
                                border: 'none',
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={() => setShowPasswordsignin(!showPasswordsignin)} // เปลี่ยนสถานะเมื่อคลิก
                            style={{
                                position: 'absolute',
                                right: '0px', // ปรับตำแหน่งปุ่มให้ไปอยู่ขวา
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: '#F4EEAD', // สีพื้นหลัง
                                border: 'none',
                                color: '#b8811d',
                                cursor: 'pointer',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: '15px', // ขนาดฟอนต์
                                width: '50px', // ความกว้าง
                                height: '40px', // ความสูง
                                borderRadius: '8px', // มุมโค้ง
                                display: 'flex', // ใช้ flexbox เพื่อจัดแนวข้อความ
                                alignItems: 'center', // จัดแนวแนวตั้ง
                                justifyContent: 'center', // จัดแนวนอน
                            }}
                        >
                            {showPasswordsignin ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <h3
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            fontSize: '17px',
                            marginRight: '60%',
                            marginTop: '35px',
                            color: '#a3181a',
                            cursor: 'pointer'
                        }}
                        onClick={handleForgotPasswordClick} // เมื่อคลิกจะเปลี่ยนกลับไปหน้า Reset password
                    >
                        Forgot your password?
                    </h3>



                    <div style={{ marginTop: '35px' }}>
                        <button
                            onClick={handleSigninsweet}
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 900,
                                padding: '10px 20px',
                                fontSize: '20px',
                                borderRadius: '12px',
                                width: '350px',
                                background: '#E8B774',
                                color: '#292724',
                                marginTop: '-30px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // เพิ่มเงา
                                transition: 'all 0.3s ease', // เพิ่มการเปลี่ยนแปลง
                                height: '50px',
                                border: 'none',
                                outline: 'none'

                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.boxShadow =
                                    '0 6px 12px rgba(0, 0, 0, 0.3)'; // เพิ่มเงาเมื่อเมาส์อยู่เหนือ
                                e.currentTarget.style.transform = 'translateY(-2px)'; // ยกปุ่มขึ้น
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.boxShadow =
                                    '0 4px 8px rgba(0, 0, 0, 0.2)'; // กลับเงาเป็นปกติ
                                e.currentTarget.style.transform = 'translateY(0)'; // กลับตำแหน่งปุ่ม
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 1)', // กรอบโปร่งแสงสำหรับเนื้อหาฟอร์ม
                        padding: '35px',
                        borderRadius: '20px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                        position: 'relative', // เพิ่ม position relative
                        marginTop: '50px', // เพิ่มระยะห่างจากกล่องข้างบน
                        width: '480px',
                        height: '25px', // ปรับความสูงให้เหมาะสม
                        display: 'flex', // ใช้ flexbox
                        alignItems: 'center', // จัดแนวกลางในแนวตั้ง
                        justifyContent: 'center', // จัดแนวกลางในแนวนอน
                        textAlign: 'center' // จัดการจัดแนวข้อความ
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '10px', color: '#a3181a' }}>
                            don't have an account?
                        </h3>
                        <h3
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#292724' }}
                            onClick={handleSignUpClick} // เมื่อคลิกจะเปลี่ยนไปหน้า Sign Up
                        >
                            Create an account
                        </h3>
                    </div>
                </div>
            </div>

        </BaseLayout>


    );
}

export default SignIn;
