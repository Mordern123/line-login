import axios from "axios";
import { useEffect } from "react";

const ManageUser = () => {
    let AllUserData = [];
    useEffect(() => {
        // getAllUserData();
        const getAllUserData = async () => {
            let userData = await axios.get(`http://localhost:5000/getAllUserData`);
    
            for (let i = 0; i <= userData.data.length - 1; i++) {
                console.log(userData.data[i].user_name);
                AllUserData.push(userData.data[i].user_name, userData.data[i].user_picture);
                console.log(AllUserData);
            }
        }
    }, []);

    return (
        <div>
            <h1>所有使用者資料：</h1>
            <ul>
                <li>{AllUserData}</li>
            </ul>
        </div>
    );
}

export default ManageUser;