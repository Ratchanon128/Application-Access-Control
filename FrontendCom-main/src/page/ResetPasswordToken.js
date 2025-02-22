import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom'; // import useParams
import BaseLayout from './BaseLayout';
import axios from 'axios';

function ResetPasswordToken() {
    const { token } = useParams(); // ดึงค่า token จาก URL

    //------------------ Password Reset ----------------------
    const [passwordReset, setpasswordReset] = useState('');
    const [passwordResetconfirm, setpasswordResetconfirm] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false); // สถานะการแสดงรหัสผ่าน
    const [showNewPasswordconfirm, setShowNewPasswordConfirm] = useState(false); // สถานะการแสดงรหัสผ่าน

    const callResetPassword = async () => {
        // ตรวจสอบว่าได้กรอกข้อมูลทั้งหมดหรือไม่
        if (!token || !passwordReset) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all the fields!',
            });
            return;
        }

        if (passwordReset !== passwordResetconfirm) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password not match',
            });
            return;
        }

        

        try {
            const res = await axios.post("http://localhost:3001/api/reset-password", {
                newPassword: passwordReset,
                token: token
            });

            // จัดการข้อมูลเมื่อเข้าสู่ระบบสำเร็จ
            Swal.fire({
                title: 'Password has been reset successfully!',
                icon: 'success',
                confirmButtonText: 'OK', // กำหนดปุ่ม OK
            }).then((result) => {
                if (result.isConfirmed) {
                    // นำทางไปที่ User.js
                    navigate('/signin'); // เปลี่ยนเส้นทางที่นี่
                }
            });

        } catch (e) {
            // จัดการข้อผิดพลาดจากการเข้าสู่ระบบ
            if (e.response) {
                // ตรวจสอบสถานะและแสดงข้อความที่เหมาะสม
                switch (e.response.status) {
                    case 400:
                        console.log(e.response.data); // ดู JSON ที่ส่งกลับจากเซิร์ฟเวอร์
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: e.response.data.message || 'Error occurred.',
                        });
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

    const handleInputpasswordReset = (e) => {
        setpasswordReset(e.target.value);
    };

    const handleInputpasswordResetconfirm = (e) => {
        setpasswordResetconfirm(e.target.value);
    };

    const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
    const handleSignInClick = () => navigate('/signin'); // ไปหน้า Sign In

    //------------------ sweet alert password reset --------------
    const handlepasswordResetsweet = () => {
        // ทำสิ่งที่ต้องการเมื่อ valid email
        
        callResetPassword();
        console.log("Reset password for token:", token);
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
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        padding: '35px',
                        borderRadius: '20px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                    }}
                >
                    <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '28px', marginTop: '0px', color: '#292724' }}>
                        Password Reset
                    </h1>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '72%' }}>
                        New Password:
                    </h2>
                    <div style={{ position: 'relative', width: '450px' }}>
                        <input
                            type={showNewPassword ? 'text' : 'password'} // เปลี่ยนเป็น type password ตามสถานะ
                            placeholder="Enter your new password"
                            value={passwordReset}
                            onChange={handleInputpasswordReset}
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
                        <button
                            onClick={() => setShowNewPassword(!showNewPassword)} // เปลี่ยนสถานะเมื่อคลิก
                            style={{
                                position: 'absolute',
                                right: '0px', // ปรับตำแหน่งปุ่มให้ไปอยู่ขวา
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: '#d1ed9a', // สีพื้นหลัง
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
                                justifyContent: 'center' // จัดแนวนอน
                            }}
                        >
                            {showNewPassword ? 'Hide' : 'Show'}
                        </button>
                        
                    </div>

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '65%' }}>
                        Confirm Password:
                    </h2>
                    <input
                        type={showNewPasswordconfirm ? 'text' : 'password'} // เปลี่ยนเป็น type password ตามสถานะ
                        placeholder="Confirm new password"
                        value={passwordResetconfirm}
                        onChange={handleInputpasswordResetconfirm}
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
                            onClick={handlepasswordResetsweet}
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
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'all 0.3s ease',
                                height: '50px',
                                border: 'none',
                                outline: 'none',
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
                        onClick={handleSignInClick} // เมื่อคลิกจะเปลี่ยนกลับไปหน้า Sign In
                    >
                        back to sign in
                    </h3>
                </div>
            </div>
        </BaseLayout>
    );
}

export default ResetPasswordToken;
