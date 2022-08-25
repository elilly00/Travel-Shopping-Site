import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function Auth(SpecificComponent, option, adminRoute = null) {  // LandingPage Component, option, adminRoute
    //backned의 그 사람의 현재 상태 확인
    //api/user/auth로 정보 보내기 

    // option 종류
    // 1. null -> 아무나 출입이 가능한 페이지
    // 2. true -> 로그인한 유저만 출이이 가능한 페이지
    // 3. false -> 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        let navigate = useNavigate();
        let user = useSelector((state) => state.user);

        useEffect(() => {
            dispatch(auth()).then(async(response) => {
                console.log(response);

                // 로그인 하지 않은 상태
                if(await !response.payload.isAuth) {
                    if(option  === true) {
                        navigate("/login");
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate("/");
                    } else {
                        if(!option) {
                            navigate("/");
                        }
                    }
                }
            });
        }, []);
        return <SpecificComponent {...props} user={user} />;
    }
    return AuthenticationCheck;
}

export default Auth;