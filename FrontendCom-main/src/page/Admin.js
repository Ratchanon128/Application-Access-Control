import './Admin.css'; // นำเข้าไฟล์ CSS
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // state สำหรับจัดการการตรวจสอบ token
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const verifyRoles = (role)=>{
    if(role === 'admin'){
      return true;
    }else{
      return false;
    }
  }

  const callVerifyToken = async () => {
    try {
      const storedUserData = localStorage.getItem('user');
      const user = JSON.parse(storedUserData);
      const token = user.token;
      
      if (!token) {
        // ถ้าไม่มี token ให้เปลี่ยนเส้นทางไปยังหน้า login
        navigate('/SignIn');
        return;
      }

      // ตรวจสอบ token กับเซิร์ฟเวอร์
      const res = await axios.post("http://localhost:3001/api/verify-jwt-token", {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const role = user.role;
      const isAllowedRoles = verifyRoles(role);
      
      if(isAllowedRoles){
        // ถ้า token ถูกต้องและ role ถูกต้องให้อนุญาตให้เข้าถึงหน้า 
        setIsAuthenticated(true);
      }

      
      
      
    } catch (e) {
      if (e.response) {
        // ตรวจสอบสถานะและแสดงข้อความที่เหมาะสม
        switch (e.response.status) {
          case 401:
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.response.data.message || 'Error occurred.',
            });
            navigate('/SignIn'); // นำทางไปยังหน้า login
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An unexpected error occurred. Please try again later.',
            });
        }
      } else {
        if(e instanceof TypeError) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'Failed to authenticate your session. Please log in again to continue.',
          });
        }else{
          // กรณีไม่มีการตอบสนองจากเซิร์ฟเวอร์
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Could not connect to the server. Please check your internet connection.',
          });
        }
      }
      navigate('/SignIn'); // นำทางไปยังหน้า login
    }
  };

  const callApi = async () => {
    try {
      const storedUserData = localStorage.getItem('user');
      const user = JSON.parse(storedUserData);
      const token = user.token;
      const res = await axios.post("http://localhost:3001/api/logs", {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const logs = await res.data;

      setData(logs);

    } catch (e) {
      if (e.response) {
        // ตรวจสอบสถานะและแสดงข้อความที่เหมาะสม
        switch (e.response.status) {
          case 401:
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.response.data.message || 'Error occurred.',
            });
            navigate('/SignIn'); // นำทางไปยังหน้า login
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An unexpected error occurred. Please try again later.',
            });
        }
      } else {
        if(e instanceof TypeError) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'Failed to authenticate your session. Please log in again to continue.',
          });
        }else{
          // กรณีไม่มีการตอบสนองจากเซิร์ฟเวอร์
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Could not connect to the server. Please check your internet connection.',
          });
        }
      }
      navigate('/SignIn'); // นำทางไปยังหน้า login
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    callVerifyToken();
    callApi();
  }, []);

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    // ลบ token หรือข้อมูลใน localStorage / sessionStorage
    localStorage.removeItem('user'); // สมมติว่าคุณเก็บ token ไว้ใน localStorage
    // นำทางกลับไปยังหน้า login
    navigate('/SignIn'); // สมมติว่าคุณมีเส้นทางหน้า login ชื่อ '/login'
  };

  // แสดงหน้าเว็บเฉพาะเมื่อผู้ใช้ถูกยืนยันว่าเข้าสู่ระบบ
  if(!isAuthenticated) {
    return null; // หรือแสดง loading indicator
  }

  

  return (
    <div className='scale-0-8'>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="admin-logs" >
        <div className="header">
          <h1>Admin Logs</h1>
        
        </div>
        <div className="logs-table-container">
          {data.length > 0 ? (
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {data.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user_email}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.success ? 'Success' : 'Failure'}</td>
                    <td>{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <center>No logs available</center>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;


