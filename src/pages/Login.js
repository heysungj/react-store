import React from 'react';
import axios from 'commons/axios';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Login(props) {

    const { register, handleSubmit, formState:{ errors } } = useForm();

    const onSubmit = async data => {
        // 获取表单数据
        // 处理登陆逻辑
        try {
            const { email, password } = data;
            const res = await axios.post('/auth/login', { email, password });
            const jwToken = res.data;
            console.log(jwToken);
            global.auth.setToken(jwToken);
            toast.success('Login Success');
            // 跳转到首页
            props.history.push('/');
        } catch (error) {
            console.log(error.response.data);
            const message = error.response.data;
            toast.error(message);
            
        }
    };


    return (
        <div className='login-wrapper'>
            <form className='box login-box' onSubmit={handleSubmit(onSubmit)}>   
                <div className='field'>
                    <label className='label'>Email</label> 
                    <div className='control'> 
                        <input 
                            className={`input ${errors.email && 'is-danger'}`}
                            type="text" 
                            palceholder="Email" 
                            name="email"
                            {...register("email",
                                 { 
                                     required: 'email is required',
                                     pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'invalid email'
                                     }
                                }
                              )
                            }
                        />
                        {
                            errors.email && <p className='helper has-text-danger'>{errors.email.message}</p>
                        }
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Password</label> 
                    <div>
                        <input 
                            className={`input ${errors.password && 'is-danger'}`}
                            type="password" 
                            palceholder="Password" 
                            name="password"
                            {...register("password", 
                                        { required: 'password is required', 
                                        minLength: {value: 6, message: 'cannot be less than 6 digits'}
                                        }
                                    )
                            }   
                        />
                        {
                            errors.password && <p className='helper has-text-danger'>{errors.password.message}</p>
                        }
                    </div>
                </div>
                <div className='control'>
                    <button className='button is-fullwidth is-primary'>Login</button>
                </div> 
            </form>
        </div>
    );
};

