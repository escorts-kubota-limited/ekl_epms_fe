import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';


const Connect = () => {
  return (
    <div>
        <GoogleOAuthProvider>
            <div></div>
        </GoogleOAuthProvider>
    </div>
  )
}

export default Connect