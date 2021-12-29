import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import './ManageUser.css';

const serverClient = "5099-2401-e180-8801-6a65-1ccd-16fd-96a0-acae.ngrok.io";
const serverBackend = "1000-2401-e180-8801-6a65-1ccd-16fd-96a0-acae.ngrok.io";
// const options = [
//     { label: "Grapes 👨", value: "grapes" },
//     { label: "Mango 👨", value: "mango" },
//     { label: "Strawberry 🍓", value: "strawberry"},
// ];
const ManageUser = () => {

    const [selected, setSelected] = useState([]);//multiselect

    let AllUserData1 = [];
    const [text, getTextFuc] = useState("");
    const [textGroup, getTextGroup] = useState("");
    const [AllUserData, getAllUserFuc] = useState([]);
    const [boy, setBoy] = useState("");
    const [group, setGroup] = useState("");
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
        }
        getAllUserFuc(AllUserData1);
        console.log("eric:"+AllUserData1[0].name);
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
        getTextFuc("")
    }
    //群發
    const GroupMessage = async () => {
        console.log("123" + group);
        let userMessage = await axios.get(`https://${serverBackend}/answerGroup?userGroup=${group}&textGroup=${textGroup}`);
    }
    //設置使用者群組
    const lineGroup = async () => {
        axios.get(`https://${serverBackend}/userGroup?dataId=${whosId}&dataGroup=${boy}`);
    }

    let kindarray = [];
    const options = [
        // { label={number.name}, value: "grapes" },
        { label: "Mango 👨", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry"},
    ];
    const listItem = AllUserData.map((number) =>
        <li key={number.name}>
            <img src={number.picture} alt="Dataphoto" className="userPicture" />
            <span> : </span>
            <button onClick={() => {
                getwhosId(number.id);
            }}>{number.name}</button>
            <div>
                <label><input type="radio" name="sex" value="boy" onClick={(event) => { setBoy(event.target.value); kindarray.push(boy); }} />男生 </label>
                <label><input type="radio" name="sex" value="girl" onClick={(event) => { setBoy(event.target.value) }} />女生 </label>
                <label><input type="radio" name="sex" value="peanut" onClick={(event) => { setBoy(event.target.value) }} />花生 </label>
                <button onClick={(event) => {
                    // axios.get(`localhost:5000/userGroup?boy=${boy}&girl=${girl}$peanut=${peanut}`);
                    lineGroup();
                    console.log(boy);
                    resetGroup();
                }} >分組確定</button>
            </div>
        </li>
    );

    const resetGroup = () => {
        setBoy("");
    }

    const toLoginUser = () => {
        window.location = `https://${serverClient}`;
    }
    const selectGroupValue = () => {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setGroup(selectedValue);
    }
    return (

        <div>
            <button type="button" onClick={toLoginUser}>登出</button>
            <div>
                <h1>Select User</h1>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </div>
            <h1>所有使用者資料：</h1>
            <ul>
                {listItem}
                <div><textarea value={text} onChange={(event) => { getTextFuc(event.target.value); }} cols="50" rows="5"></textarea></div>
                <button onClick={lineMessage}>確定</button>
                <div>
                    <select id="selectBox" onChange={() => { selectGroupValue() }}>
                        <option value="boy">男生</option>
                        <option value="girl">女生</option>
                        <option value="peanut">花生</option>
                    </select>
                </div>
                <div><textarea value={textGroup} onChange={(event) => { getTextGroup(event.target.value); }} cols="50" rows="5"></textarea></div>
                <button onClick={GroupMessage}>確定</button>
            </ul>
        </div>

    );
}

export default ManageUser;