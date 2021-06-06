# 記帳本
可簡單的紀錄支出

# 環境建置與需求
```
"node.js": "v10.15.0" -執行環境  
"express": "^4.17.1"-框架(framwork)  
"body-parser": "^1.19.0"-中介軟體(middleware)  
"express-handlebars": "^5.3.2"-模板引擎(template engine)  
"method-override": "^3.0.0",-中介軟體(middleware)  
"connect-flash": "^0.1.1",-訊息顯示(middleware)  
"passport": "^0.4.1",-用戶驗證  
"passport-facebook": "^3.0.0",-用戶驗證  
"passport-local": "^1.0.0"-用戶驗證  
"mongoose": "^5.12.7"-MongoDB ODM  
"mongoDB": "v4.2.14"-資料庫  
"bcryptjs": "^2.4.3",-明碼hash  
"nodemon": "^2.0.7"-開發套件  
"dotenv": "^9.0.2",
```
# 安裝與使用
### 下載專案
git clone https://github.com/zhihdd/expense-tracker-advance.git  
or
右上方 "code" 下載

### 安裝套件
```
npm install
```
### 使用
1. 在mongoDB 建立 expense-tarcker 的database
2. 終端機orCMD中執行下列指令，產生種子資料
```
npm run seed
```
```
name: name-0
email: example-1@test.com
password: 12345678
擁有隨機9個支出紀錄
------------------------------
name: name-1
email: example-1@test.com
password: 12345678
擁有隨機9個支出紀錄
------------------------------
name: name-2
email: example-1@test.com
password: 12345678
擁有隨機9個支出紀錄
```
3. 終端機orCMD中執行下列指令，執行程式 <br>
單純使用功能
```
npm start
```
開發環境下使用功能
```
npm run dev
```

# 功能
可建立個人帳戶，或使用facebook建立帳戶
並可依照
1. 日期
2. 地點
3. 類別

  去紀錄當次的支出，首頁會顯示總共花費
  並可以依照
1. 日期(依年月)
2. 類別

  去做篩選，並顯示該類別or日期的消費總金額

# .env設置
建立.env 檔將 .env.example 內容複製貼上，並依照下面步驟更改
1. 前往 https://developers.facebook.com/ ，按下"我的應用程式"
2. 按下"建立應用程式"選擇"消費者"並輸入需要的資訊
3. 按下左方"設定"的"基本資料"其   
"應用程式編號" 即為FACEBOOK_ID  
"應用程式密鑰" 即為FACEBOOK_SECRET 
4. 按下左方 "Facebook 登入" 的設定，訂在"有效的 OAuth 重新導向 URI"欄位中輸入
    * 若為本地端請輸入，則不用輸入，  
    .env中的"專案網址"改為 "http://localhost:3000"
    * 若上傳至server 請輸入 
    ``` 
    "專案網址"/auth/facebook/callback
    ```
    定更改.env "FACEBOOK_CALLBACK" 的內容如上
```
FACEBOOK_ID="應用程式編號"  
FACEBOOK_SECRET="應用程式密鑰"
FACEBOOK_CALLBACK="專案網址"/auth/facebook/callback
```