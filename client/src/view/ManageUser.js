import axios from "axios";
import { useEffect, useState } from "react";
import './ManageUser.css';

const ManageUser = () => {
    let AllUserData1 = [];
    const AllUser = [];
    const [AllUserData, getAllUserFuc] = useState(AllUser);
    const [boy, setBoy] = useState("");
    const [girl, setGirl] = useState("");
    const [peanut, setPeanut] = useState("");
    useEffect(() => {
        getAllUserData();
    }, []);

    const getAllUserData = async () => {
        let userData = await axios.get(`http://localhost:5000/getAllUserData`);

        for (let i = 0; i <= userData.data.length - 1; i++) {
            console.log(userData.data[i].user_name);
            let data123 = { picture: userData.data[i].user_picture, name: userData.data[i].user_name }
            AllUserData1.push(data123);
        }
        getAllUserFuc(AllUserData1);
        console.log(AllUserData);
    }
    let kindarray=[];
    const listItem = AllUserData.map((number) =>
        <li key={number.name}>
            <img src={number.picture} alt="Dataphoto" className="userPicture" />
            <span> : </span><button>{number.name}</button>
            <label><input type="checkbox" value="boy" onClick={(event)=>{ setBoy(event.target.value);kindarray.push(boy);} } />男生 </label>
            <label><input type="checkbox" value="girl" onClick={(event)=>{ setGirl(event.target.value)} }/>女生 </label>
            <label><input type="checkbox" value="peanut" onClick={(event)=>{ setPeanut(event.target.value)} }/>花生 </label>
            <button onClick={(event)=>{ 
                // axios.get(`localhost:5000/userGroup?boy=${boy}&girl=${girl}$peanut=${peanut}`);
                console.log(boy,girl,peanut);
                resetGroup();
                } } >分組確定</button>
        </li>
    );

    const resetGroup = () => {
        setBoy("");
        setGirl("");
        setPeanut("");
    }

    return (
        <div>
            
            <h1>所有使用者資料：</h1>
            <ul>
                {listItem}
            </ul>
        </div>
    );
}

export default ManageUser;