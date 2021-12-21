import './Login.css';

const Login = () => {
    
    const loginToMainPage = () => {
        let client_id = '1656732672';
        let redirect_uri = 'http://localhost:3000/MainPage';
        let scope = 'openid%20profile';
        window.location=`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=login&scope=${scope}`;
    }
   
    return (
    <div className="body">
        <button className="line" type="button" onClick={ loginToMainPage }><img src="http://i.imgur.com/G1k3U44.png" alt="rr" /></button>
        <div className="header">
            <div>Our<span>scool</span></div>
        </div>
        <div className="login">
            <input type="text" placeholder="username" name="user"></input>
            <input type="password" placeholder="password" name="password"></input>
            <input type="button" value="Login" className="lineButton"/>
        </div>  
    </div>)
}

export default Login