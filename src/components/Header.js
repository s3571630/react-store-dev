import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Panel from './Panel';
import UserProfile from './UserProfile';
const Header = (props)=>{
    const toProfile = ()=>{
        Panel.open({
            component: UserProfile,
            props:{
                user: props.user
            },
            callback: data =>{
                if(data === 'logout'){
                    props.history.go(0);
                    // 因為Panel不在Router裡不能直接返回
                    // 在Panel用回乎函式傳回訊息 go(0) 當前頁面做刷新
                }
            }
        })
    }
    return(
        <div className="header">
            <div className="grid">
                <div className="start">
                    <Link to="/">Home</Link>
                </div>
                <div className="end">
                    {props.user.nickname ? (
                        <span className="nickname" onClick={toProfile}>
                            <i className="fas fa-user"></i>
                            {props.user.nickname}
                        </span>
                    ) : (
                        <React.Fragment>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
     )
}

export default withRouter(Header);
