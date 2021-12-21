import axios from "axios";
// import qs from "qs";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import UserModel from "./models/UserModel.js";

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();

//將我們的後端程式碼與資料庫連線起來
mongoose.connect('mongodb://localhost:27017/line-user');

let db = mongoose.connection;
//檢查與資料庫的連線是否成功
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('connected to the database'));

// bodyParser，將請求體解析為可讀的json格式
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//取得登入後個資驗證碼
let idToken = '';
const loginCode = async (req, res) => {
  const { code } = req.query;
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', 'http://localhost:3000/MainPage')
  params.append('client_id', '1656732672')
  params.append('client_secret', '334e14cd00c2aa300dcbe8ebb49fd505')
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const result = axios.post(`https://api.line.me/oauth2/v2.1/token`, params, config)
    .then((result) => {
      idToken = result.data.id_token;
      JWTtoPayload(idToken);
      res.json('success');
    })
}

//將id_token從jwt轉成payload
let dataSub = '';//存入資料庫的全域變數(接result.data)
let dataName = '';
let dataPicture = '';
function JWTtoPayload(idToken) {
  const JWTparams = new URLSearchParams()
  JWTparams.append('id_token', idToken)
  JWTparams.append('client_id', '1656732672')
  const JWTconfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const JWTtoPayload = axios.post(`https://api.line.me/oauth2/v2.1/verify`, JWTparams, JWTconfig)
    .then((result) => {
      console.log(result.data.name);
      dataSub = result.data.sub;
      dataName = result.data.name;
      dataPicture = result.data.picture;
      new_user();
    })
}

//登入時將使用者資料存入資料庫
const new_user = async () => {
  let isExist = await UserModel.exists({ user_id:dataSub });
  if (isExist) {
    console.log("已有此帳號");
    const filter = { user_id: dataSub };
    const update = { user_name: dataName };
    let doc = await UserModel.findOneAndUpdate(filter, update, {
      new: true
    });
    return;
  }
  const userDB = UserModel({ //寫入UserModel資料庫
    user_id: dataSub,
    user_name: dataName,
    user_picture: dataPicture,
  }).save();
}

//此方法獲取資料庫中的所有使用者資料
const getAllUserData = async (req, res) => {
  const AllUserData = await UserModel.find({}).exec();
  res.json(AllUserData);
}

app.get('/login', loginCode);
app.get('/getAllUserData', getAllUserData);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));