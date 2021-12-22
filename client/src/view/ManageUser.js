import axios from "axios";
import { useEffect, useState } from "react";
import './ManageUser.css';

const ManageUser = () => {
    let AllUserData1 = [];
    const AllUser = [];
    const [AllUserData, getAllUserFuc] = useState(AllUser);
    useEffect(() => {
        getAllUserData();
        
    }, []);

    const getAllUserData = async () => {
        let userData = await axios.get(`http://localhost:5000/getAllUserData`);

        for (let i = 0; i <= userData.data.length - 1; i++) {
            console.log(userData.data[i].user_name);
            let data123 = {picture:userData.data[i].user_picture,name:userData.data[i].user_name}
            AllUserData1.push(data123);
        }
        getAllUserFuc(AllUserData1);
        console.log(AllUserData);
    }

    const listItem = AllUserData.map((number) => 
        <li key={number.name}>
            <img src={number.picture} alt="Dataphoto" className="userPicture"/>
            <span> : </span><button>{number.name}</button>
        </li>
    );

    return (
        <div>
            <h1>所有使用者資料：</h1>
            <ul>
                   { listItem }  
            </ul>
        </div>
    );
}

export default ManageUser;