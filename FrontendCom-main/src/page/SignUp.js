import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import axios from 'axios'

function SignUp() {

    //------------------sign up-----------------------
    const [usernamesignup, setUsernamesignup] = useState('');
    const [passwordsignup, setPasswordsignup] = useState('');
    const [passwordsignup2, setPasswordsignup2] = useState('');
    const [showPasswordsignup, setShowPasswordsignup] = useState(false); // สถานะการแสดงรหัสผ่าน

    const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
    const handleSignInClick = () => navigate('/signin'); // ไปหน้า Sign In


    const handleInputChangesignup = (e) => {
        setUsernamesignup(e.target.value);
    };

    const handleInputChangesignup2 = (e) => {
        //showpassword sign up
        setPasswordsignup(e.target.value);
    };

    const handleInputconfirmpass = (e) => {
        setPasswordsignup2(e.target.value);
    };

    // const handleSignup = () => {
    //     alert(`สวัสดีจร้า Sing up เรียบร้อย, ${usernamesignup}`);
    // }; 

    //----------------- sweet alert Sign up ----------------

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const callsignup = async()=>{
        try{
            const res = await axios.post("http://localhost:3001/api/signup",{
                email: usernamesignup,
                password: passwordsignup
            })
            
            // เก็บ token ใน localStorage
            const userData = {
                id: res.data.user.id,
                token: res.data.token,
                email: res.data.user.email,
                role: res.data.user.role
            }
        
            // แปลงเป็น JSON string ก่อนเก็บ
            localStorage.setItem('user', JSON.stringify(userData));

            Swal.fire({
                title: 'Signed up successfully!',
                icon: 'success',
                confirmButtonText: 'OK', // กำหนดปุ่ม OK
            }).then((result) => {
                if (result.isConfirmed) {
                    // นำทางไปที่ User.js
                    navigate('/user'); // เปลี่ยนเส้นทางที่นี่
                }
            });

        } catch(e){
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
    }


    const handleSignupsweet = () => {
        // ตรวจสอบรบ
        if (!usernamesignup || !passwordsignup || !passwordsignup2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all the fields!',
            });
            return;
        }


        if (!validateEmail(usernamesignup)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email format!',
            });
            return;
        }

        // ตรวจสอบว่ารหัสผ่านตรงกันมั้ย
        if (passwordsignup !== passwordsignup2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            });
            return;
        }
        
        callsignup();
    };

    return (
        <BaseLayout>
            < div style={{
                transform: 'scale(0.8)',
                transformOrigin: 'center'
            }
            }>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)', // กรอบโปร่งแสงสำหรับเนื้อหาฟอร์ม
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                    position: 'relative' // เพิ่ม position relative
                }}>
                    <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '28px', marginTop: '0px', color: '#292724' }}>Sign Up</h1>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '90%' }}>Email:</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={usernamesignup}
                        onChange={handleInputChangesignup}
                        style={{
                            padding: '14px',
                            width: '450px',
                            fontSize: '17px',
                            borderRadius: '12px',
                            fontFamily: 'Montserrat, sans-serif',
                            backgroundColor: '#F4EEAD',
                            border: 'none',
                            outline: 'none'
                        }}
                    />

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '90%', marginTop: '20px' }}>Password:</h2>
                    <div style={{ position: 'relative', width: '450px' }}>
                        <input
                            type={showPasswordsignup ? 'text' : 'password'} // เปลี่ยนเป็น type password ตามสถานะ
                            placeholder="Enter your password"
                            value={passwordsignup}
                            onChange={handleInputChangesignup2}
                            style={{
                                padding: '14px',
                                width: '100%', // ใช้ width 100% เพื่อให้พอดีกับ div
                                fontSize: '17px',
                                borderRadius: '12px',
                                fontFamily: 'Montserrat, sans-serif',
                                backgroundColor: '#F4EEAD',
                                border: 'none',
                                outline: 'none'
                            }}
                        />


                        <button
                            onClick={() => setShowPasswordsignup(!showPasswordsignup)} // เปลี่ยนสถานะเมื่อคลิก
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
                                justifyContent: 'center' // จัดแนวนอน
                            }}
                        >
                            {showPasswordsignup ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {/* confirm password */}

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '67%', marginTop: '20px' }}>Confirm Password:</h2>
                    <div style={{ position: 'relative', width: '450px' }}>
                        <input
                            type="password" // เปลี่ยนจาก type="text" เป็น type="password"
                            placeholder="Confirm your password"
                            value={passwordsignup2}
                            onChange={handleInputconfirmpass}
                            style={{
                                padding: '14px',
                                width: '450px',
                                fontSize: '17px',
                                borderRadius: '12px',
                                fontFamily: 'Montserrat, sans-serif',
                                backgroundColor: '#F4EEAD',
                                border: 'none',
                                outline: 'none'
                            }}
                        />
                    </div>


                    <div style={{ marginTop: '35px' }}>
                        <button
                            onClick={handleSignupsweet}
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
                            onMouseOver={e => {
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'; // เพิ่มเงาเมื่อเมาส์อยู่เหนือ
                                e.currentTarget.style.transform = 'translateY(-2px)'; // ยกปุ่มขึ้น
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // กลับเงาเป็นปกติ
                                e.currentTarget.style.transform = 'translateY(0)'; // กลับตำแหน่งปุ่ม
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <div style={{
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
                            Already had an account?
                        </h3>
                        <h3
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#292724' }}
                            onClick={handleSignInClick} // เมื่อคลิกจะเปลี่ยนกลับไปหน้า Sign In
                        >
                            Sign in
                        </h3>
                    </div>
                </div>
            </div >

        </BaseLayout>

    );

}

export default SignUp;