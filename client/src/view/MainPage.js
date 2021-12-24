import axios from "axios";
import { useEffect, useState } from "react";

const serverClient = "8a47-220-132-170-63.ngrok.io";
const serverBackend = "f6e7-220-132-170-63.ngrok.io";

const MainPage = () => {
    const [AllUserData, getAllUserFuc] = useState([]);
    useEffect(() => {
        getQueryStringCode();
    }, []);
    const getQueryStringCode = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log(params.code);
        axios.get(`https://${serverBackend}/login?code=${params.code}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }
    const toManageUser = async() => {
        window.location = `https://${serverClient}/MainPage/ManageUser`;
    }

    return (
        <div>
            {/* <button className="line" type="button" onClick={getQueryStringCode}><img src="http://i.imgur.com/G1k3U44.png" alt="rr" /></button> */}
            <h1>歡迎來到黃色世界!</h1>
            <h2>我會蒐集你的資料:頭貼、暱稱、id</h2>
            <button type="button" onClick={toManageUser}>觀看使用者資料</button>
        </div>
    );
}

export default MainPage;