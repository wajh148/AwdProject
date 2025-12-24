import React, { useEffect, useState } from 'react'
import '../Loginpages/Login.scss';
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux"
import { UserRegister } from '../../redux/slice/userAuthSlice/userAuthSlice';


function Register() {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [inputvalue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "Userprofile") {
      setInputValue({
        ...inputvalue,
        [name]: files[0]
      });
    } else {
      setInputValue({
        ...inputvalue,
        [name]: value
      });
    }
  }

  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
  }, [image])

    const handleSubmit = (e)=>{

      e.preventDefault();

      const {username,email,password,confirmpassword} = inputvalue;

      if(username === ""){
            toast.error("user name is requried")
        }else if(email == ""){
            toast.error("email is requried")
        }else if(!email.includes("@")){
            toast.error("enter valied email")
        }else if(image == ""){
            toast.error("image is requried")
        }else if(password == ""){
            toast.error("password is requried")
        }else if(confirmpassword == ""){
            toast.error("confirmpassword is requried")
        }else if(password !== confirmpassword){
            toast.error("password and confirmpassword not match")
        }else{
            const data = new FormData();
            data.append("username",username)
            data.append("userprofile",image)
            data.append("email",email)
            data.append("password",password)
            data.append("confirmpassword",confirmpassword);


            const datasend={
                data,
                header:true
            }

            dispatch(UserRegister(datasend)).then((res)=>{
                if(res){
                    navigate("/login")
                }
            }).catch((error)=>{
                console.log("error",error)
            })
        }


   

    }


  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
          </div>
          <div className='profile_div text-center'>
            <img src={preview ? preview : "/logo192.png"} alt="" style={{ width: "50px" }} />
          </div>
          <form>
            <div className="form_input">
              <input type="text" name='username' onChange={handleChange} placeholder='Enter your name' />
            </div>
            <div className="form_input">
              <input type="email" name='email' onChange={handleChange} placeholder='Enter your email' />
            </div>
            <div className="form_input">
              <input type="file" name='Userprofile' onChange={setProfile} />
            </div>
            <div className="form_input">
              <label>Password</label>
              <div className='two'>
                <input type={!passShow ? "password" : "text"} onChange={handleChange} name='password' placeholder='Enter your Password' />
              </div>
            </div>
            <div className="form_input">
              <label>Confirm Password</label>
              <div className='two'>
                <input type={!cpassShow ? "password" : "text"} onChange={handleChange} name='confirmpassword' placeholder='Enter your Confirm Password' />
              </div>
            </div>

            <button className='btn' onClick={handleSubmit}>Sign Up</button>
            <p>Already have an account? <NavLink to="/Loginpage">Sign in</NavLink></p>

          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
