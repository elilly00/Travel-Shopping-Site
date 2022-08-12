import React, { useEffect}  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage(props) { 
    const navigate = useNavigate();

    // LandinPage에 들어오자마자 useEffect를 실행한다.
    useEffect(() => {
        axios.get("/api/hello") // request를 Server에 보냄(endpoint: "/api/hello")
             .then(response => { 
                console.log(response) 
            }); // Server에서 보낸 response를 console창에 띄움
    }, []);

    const onClickHandler = () => {
        axios.get(`/api/users/logout`).then((response) => {
          if (response.data.success) {
            navigate("/login");
          } else {
            alert("로그아웃에 실패했습니다");
          }
        });
      };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>

            <br />

            <button onClick={onClickHandler}>로그아웃</button>
        </div>

    );
}

export default LandingPage;