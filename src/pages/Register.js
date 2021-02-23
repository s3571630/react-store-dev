import React from 'react';
import axios from '../commons/axios'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';


export default function Login(props){
    const {register, handleSubmit, errors} = useForm();
    // register用來註冊表單
    const onSubmit = async data =>{
        // 1.阻止默認行為(刷新) 組件幫你做好了
        // event.preventDefault();
        // 2.獲取表單數據
        console.log(data)
        // 3.處理註冊邏輯
        try {
            const {nickname, email, password}= data;
            const res = await axios.post('/auth/register', {nickname, email, password, type: 0});
            const jwToken = res.data;
            console.log(jwToken);
            // 將登入訊息保存在localstorage裡
            global.auth.setToken(jwToken)
            toast.success('Register Success')
        } catch (error) {
            const message = error.response.data;
            toast.error(message);
        }
        // 4.跳轉道首頁視圖
        props.history.push('/')
    }
    return(
        <div className="login-wrapper">
            {/* handleSubmit 傳入 onSubmit */}
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input
                        className={`input ${errors.nickname && 'is-danger'}`}
                        type="text"
                        placeholder="Nickname"
                        ref={register({
                            required: 'nickname is required',
                        })}
                        name="nickname"
                        />
                        {/* 在ref 用register註冊  required: true為必填 */}
                        {
                            errors.nickname && (
                                <p className="helper has-text-danger">{errors.nickname.message}</p>
                         )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                        className={`input ${errors.email && 'is-danger'}`}
                        type="text"
                        placeholder="email"
                        ref={register({
                            required: 'email is required',
                            pattern:{
                                value:  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                                message: 'Invalid Email'
                            }
                        })}
                        name="email"
                        />
                        {/* 在ref 用register註冊  required: true為必填 */}
                        {
                            errors.email && (
                                <p className="helper has-text-danger">{errors.email.message}</p>
                         )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">password</label>
                    <div className="control">
                        <input
                        className={`input ${errors.password && 'is-danger'}`}
                        type="password"
                        placeholder="password"
                        ref={register({
                            required: 'password is required',
                            minLength: {
                                value: 6,
                                message: 'cannot be less than 6 digits'
                            }
                        })}
                        name="password"
                        />
                        {
                            errors.password && (
                                <p className="helper has-text-danger">{errors.password.message}</p>
                         )}
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary">Register</button>
                </div>
            </form>
        </div>
    )
}

// class Login extends React.Component{
//     state = {
//         email:'',
//         password:''
//     }
//     handleSubmit = event =>{
//         // 1.阻止默認行為(刷新)
//         event.preventDefault();
//         // 2.獲取表單數據

//         // 3.處理登入邏輯
//         // 4.跳轉道首頁視圖
//         this.props.history.push('/');
//             // history 是路由裡可以調用的方法
//     }
//     handleChange = e =>{
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     render(){
//         return(
//             <div className="login-wrapper">
//                 <form className="box login-box" onSubmit={this.handleSubmit}>
//                     <div className="field">
//                         <label className="label">Email</label>
//                         <div className="control">
//                             <input
//                              className="input"
//                              type="text"
//                              placeholder="email"
//                              value={this.state.email}
//                              onChange={this.handleChange}
//                              name="email"
//                             />
//                         </div>
//                     </div>
//                     <div className="field">
//                         <label className="label">password</label>
//                         <div className="control">
//                             <input
//                              className="input"
//                              type="password"
//                              placeholder="password"
//                              value={this.state.password}
//                              onChange={this.handleChange}
//                              name="password"
//                             />
//                         </div>
//                     </div>
//                     <div className="control">
//                         <button
//                         className="button is-fullwidth is-primary">Login</button>
//                     </div>
//                 </form>
//              </div>
//         )
//     }
// }
// export default Login;
