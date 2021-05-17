import firebase from './firebase.js';
const PhoneAuth = () => {


    const setUpCaptch= ()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log('resolved')
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              onSignInSubmit();
            }
          });
        }
    
    const onSignInSubmit=(event)=>{
        event.preventDefault();
        setUpCaptch();
        const phoneNumber = "+923170112101";
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              const code =prompt('Enter Your code here')
              console.log(code)
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user)
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
            });
    }
    
    
    

    return ( 
        <div>
    <form onSubmit={onSignInSubmit}>
        <div id="recptcha-container"></div>
    <input type='number' placeholder='enter number here'/>
    <button type='submit'>Submit</button>
    </form>
</div>  
     );
}
 
export default PhoneAuth;