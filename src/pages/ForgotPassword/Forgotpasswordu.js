import React from 'react'

export const Forgotpasswordu = () => {
  return (
    <>
     <section>
      <div className = "form_data">
      <div className = "form_heading">

         <h1> Forgot password</h1>
         <form>
          <div className = "form_input">
          <label htmlFor='email'>Email</label>
          <input type = "email" name='email' id='' placeholder='Enter your email address'/>
          </div>


          <button className='btn'>Submit</button>
          
         </form>
      </div>
      </div>
     </section>
    </>
  );
}

export default Forgotpasswordu;