import React,{useState} from 'react'

const ResetPasswordu = () => {
    const [passShow,setPassShow] = useState(false);
      const [cpassShow,setCPassShow] = useState(false);
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Reset Password</h1>
            </div>
            
            <form>
             
              <div className="form_input">
                <label htmlFor='email'>Password</label>
                <div className='two'>
                  <input type={!passShow ? "Password":"text"} name='email' placeholder='Enter your Password'/>
                </div>
              </div>
              <div className="form_input">
                <label htmlFor='email'>Confirm Password</label>
                <div className='two'>
                  <input type={!cpassShow ? "Password":"text"}  name='email' placeholder='Enter your confirm Password'/>
                </div>
              </div>

              <button className='btn'>Submit </button>
              
             
            </form>
          </div>
        
      </section>
    </>
  )
}

export default ResetPasswordu;