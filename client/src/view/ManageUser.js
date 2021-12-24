import axios from "axios";
import { useEffect, useState } from "react";
import './ManageUser.css';

const serverClient = "8a47-220-132-170-63.ngrok.io";
const serverBackend = "f6e7-220-132-170-63.ngrok.io";
const ManageUser = () => {
    let AllUserData1 = [];
    // let UserSub1 = [];
    const AllUser = [];
    // const AllUser1 = [];
    const [text, getTextFuc] = useState("");
    const [AllUserData, getAllUserFuc] = useState(AllUser);
    // const [UserSub, getUserSubFuc] = useState([]);
    const [boy, setBoy] = useState("");
    const [girl, setGirl] = useState("");
    const [peanut, setPeanut] = useState("");
    const [whosId, getwhosId] = useState("");
    useEffect(() => {
        getAllUserData();
    }, []);

    const getAllUserData = async () => {

        let userData = await axios.get(`https://${serverBackend}/getAllUserData`);

        for (let i = 0; i <= userData.data.length - 1; i++) {
            console.log(userData.data[i].user_name);
            let data123 = { picture: userData.data[i].user_picture, name: userData.data[i].user_name, id: userData.data[i].user_id }
            console.log(userData.data[i].user_id);
            AllUserData1.push(data123);
            // UserSub1.push(userData.data[i].user_id);
        }
        getAllUserFuc(AllUserData1);
        // getUserSubFuc(UserSub1);
        // console.log(UserSub1);
    }
    const lineMessage = async () => {
        // console.log(UserSub);
        const params = new URLSearchParams();
        params.append('text', text);
        params.append('id', whosId);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        let userMessage = await axios.post(`https://${serverBackend}/answerUser`, params, config);
        console.log("123完成");
        console.log("完成"+whosId);
        getTextFuc("")
    }
    let kindarray = [];
    // let testnumberId = "";
    // console.log("1234:" + whosId);
    const listItem = AllUserData.map((number) =>
        <li key={number.name}>
            <img src={number.picture} alt="Dataphoto" className="userPicture" />
            <span> : </span>
            <button onClick={ () => {
                getwhosId(number.id); 
                console.log(number);  
                console.log("fuck:" + whosId);
            }}>{number.name}</button>
            <label><input type="checkbox" value="boy" onClick={(event) => { setBoy(event.target.value); kindarray.push(boy); }} />男生 </label>
            <label><input type="checkbox" value="girl" onClick={(event) => { setGirl(event.target.value) }} />女生 </label>
            <label><input type="checkbox" value="peanut" onClick={(event) => { setPeanut(event.target.value) }} />花生 </label>
            <button onClick={(event) => {
                // axios.get(`localhost:5000/userGroup?boy=${boy}&girl=${girl}$peanut=${peanut}`);
                console.log(boy, girl, peanut);
                resetGroup();
            }} >分組確定</button>
        </li>
    );

    const resetGroup = () => {
        setBoy("");
        setGirl("");
        setPeanut("");
    }

    const toLoginUser = () => {
        window.location = `https://${serverClient}`;
    }

    return (
        <div>
            <button type="button" onClick={toLoginUser}>登出</button>
            <h1>所有使用者資料：</h1>
            <ul>
                {listItem}
                <div><textarea value={text} onChange={(event) => { getTextFuc(event.target.value); }} cols="50" rows="5"></textarea></div>
                <button onClick={lineMessage}>確定</button>
            </ul>
        </div>
    );
}

export default ManageUser;