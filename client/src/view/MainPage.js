import axios from "axios";
import { useEffect } from "react";

const MainPage = () => {
    useEffect(() => {
        getQueryStringCode();
    }, []);
    const getQueryStringCode = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log(params.code);
        axios.get(`http://localhost:5000/login?code=${params.code}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }
    const toManageUser = async() => {
        // let userData = await axios.get(`http://localhost:5000/getAllUserData`);
        // if (userData.data.user_id === "U7c608676ce776a29adff2f9d3a071769") {
        //     window.location = "http://localhost:3000/MainPage/ManageUser";
        // }
        window.location = "http://localhost:3000/MainPage/ManageUser";
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