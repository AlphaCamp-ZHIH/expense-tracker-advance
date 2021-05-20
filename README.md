# 記帳本
可簡單的紀錄支出

# 環境建置與需求
    "node.js": "v10.15.0" -執行環境
    "express": "^4.17.1"-框架(framwork)
    "body-parser": "^1.19.0"-中介軟體(middleware)
    "express-handlebars": "^5.3.2"-模板引擎(template engine)
    "method-override": "^3.0.0",-中介軟體(middleware)
    "mongoose": "^5.12.7"-MongoDB ODM
    "mongoDB": "v4.2.14"-資料庫
    "nodemon": "^2.0.7"-開發套件
# 安裝與使用
### 下載專案
git clone https://github.com/zhihdd/expense-tracker.git
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
可依照
1. 日期
2. 地點
3. 類別

  去紀錄當次的支出，首頁會顯示總共花費
  並可以依照
1. 日期(依年月)
2. 類別

  去做篩選，並顯示該類別or日期的消費總金額

