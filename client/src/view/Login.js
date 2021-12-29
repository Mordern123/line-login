import './Login.css';
import linePicture from '../picture/394sbplq.png';

const serverClient = "5099-2401-e180-8801-6a65-1ccd-16fd-96a0-acae.ngrok.io";
// const serverBackend = "ee99-220-132-170-63.ngrok.io";
const Login = () => {
    const loginToMainPage = () => {
        let client_id = '1656732672';
        // let redirect_uri = 'http://localhost:3000/MainPage';
        let redirect_uri = `https://${serverClient}/MainPage`;
        let scope = 'openid%20profile';
        window.location=`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=login&scope=${scope}`;
    }
   
    return (
    <div className="body">
        <button className="line" type="button" onClick={ loginToMainPage }><img src="http://i.imgur.com/G1k3U44.png" alt="rr" /></button>
        <img className="LinePicture" src={linePicture} alt=''></img>
        <div className="header">
            <div>Our<span>scool</span></div>
        </div>
        <div className="login">
            <input type="text" placeholder="username" name="user"></input>
            <input type="password" placeholder="password" name="password"></input>
            <input type="button" value="Login" className="lineButton"/>
            {/* <img className="LinePicture" src={linePicture} alt=''></img> */}
        </div>  
        {/* <div>
            <img className="LinePicture" src={linePicture} alt=''></img>
        </div> */}
    </div>)
}

export default Login