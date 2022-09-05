# GraphQL_TypeScript_AuthenticationProject

## 1. 程式啟動方式
- Clone repository
- Terminal中輸入以下指令
  ```
  npm install
  npm start
  ```
- 在browser中輸入 http://localhost:4000/
- 點擊 Query your server進入playground

## 2. 程式架構
主程式寫在src folder內，其目錄結構圖如下

![folderStructure](https://user-images.githubusercontent.com/41458099/188321596-7c504ab4-4ad4-4ee3-a071-6b8360ed100f.png)

### index.ts
- 負責run Apollo server
- 將定義好的schema與resolver傳入
- context中實現authorization (若有headers有帶token，userinfo會被assign入context user attribute 中)
  
### schema.graphql
- 在User type中定義所需fields
- login API因有資料的update，將其定義在mutation中
- me API定義在Query中，並指定其回傳User object

### resolvers.ts
定義schema中的field如何經過處裡並回傳
1. mutation的login
> - 先檢查User是否存在
> - 比對password
> - 重新產生token並回傳

2. query中的me
> - 檢查context.user (是否已登入)
> - 回傳User information or Error message

## 3. api的規格與範例
### User Data
User1
- account: <span>test123<span>@test.com
- password: 123456
- name: Kelly
- birthday: 1997/08/24

User2
- account: <span>test456<span>@test.com
- password: 1234567
- name: Duke
- birthday: 1995/07/30

### login API
- **Type:** Mutation
-  **Request:**

| **Field** | **Type**     | **Description**                |
| :-------- | :------- | :------------------------- |
| account | string | **Required**|
| password | string | **Required**|

```
mutation login {
  login(userInput:{
    account: "test123@test.com",
    password: "123456"

  }){
    token
  }
}
```

-  **Success Response:**

| **Field** | **Type**     | **Description**                |
| :-------- | :------- | :------------------------- |
| token | string | Access token from server. |

```
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoidGVzdDEyM0B0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEVNdU1NN013MzEyLmp2YkJuZlNhdWVjQWN0eEFubldjOGVmcUtXUnkvTVB3UGVMdmRHYUsyIiwibmFtZSI6IktlbGx5IiwiYmlydGhkYXkiOiIxOTk3LzA4LzI0IiwiaWF0IjoxNjYyMzExMTMxfQ.ngw9oe0tpnZ10fl4nobgB0DzmipXIuHpNTWzwLI48Os"
    }
  }
}
```

-  **Error Response:**
  
  Invalid account
  
| **Field** | **Type**     | **Error Message Content**                |
| :-------- | :------- | :------------------------- |
| error | string | User not exists! |
  
  Invalid password
  
| **Field** | **Type**     | **Error Message Content**                |
| :-------- | :------- | :------------------------- |
| error | string | Wrong password |
  
-  **Playground Example:**
![loginAPI1](https://user-images.githubusercontent.com/41458099/188325588-35b8eea0-eaed-47a5-ac3a-9402f1aa3021.png)


### me API
- **Type:** Query
- **Request:**

下方的field皆為optional，但至少需填一個
```
uery getUserInfo{
  me{
    account
    name
    birthday
    password
  }
}
```

- **Request Headers:**

| **Field** | **Type**     | **Description**                |
| :-------- | :------- | :------------------------- |
| Authorization | string | Put access token from login API **directly**. |

-  **Success Response:**

| **Field** | **Type**     |
| :-------- | :------- |
| account | string |
| name | string |
| birthday | string |
| password | string |

```
{
  "data": {
    "me": {
      "account": "test123@test.com",
      "name": "Kelly",
      "birthday": "1997/08/24",
      "password": "$2b$10$EMuMM7Mw312.jvbBnfSauecActxAnnWc8efqKWRy/MPwPeLvdGaK2"
    }
  }
}
```
  
-  **Error Response:**
  
  No token or wrong token
  
| **Field** | **Type**     | **Error Message Content**                |
| :-------- | :------- | :------------------------- |
| error | string | You are not authenticated! |
  
-  **Playground Example:**
![meAPI1](https://user-images.githubusercontent.com/41458099/188325654-df5ab9da-3370-415d-b7a2-27e2d40bc9dd.png)

## 4. 研究心得
由於時間很短，我的學習方式是把兩者最general的概念都先搞懂，
  
然後直接撰寫專案，過程中有問題再去尋找方法做修正。  
<br />
  
首先針對GraphQL的Schema定義去著手，包括type如何定義與query, mutation的差異，
  
再來是Resolver，其實搞懂Resolver的作用，他的撰寫就是一般controller內的商業邏輯，
  
比較困難之處在於要如何去定義TypeScript型別，
  
所以我的下一步就是去了解TypeScript型別定義，

在網路上找到一些很好的資源，整合了各種JavaScript data type如何在Type Script定義，

最後我開始進行專案的撰寫，過程中比較困難的是，網路上實現Apollo Server的方式有很多種，

有用Express或http server協助實現的，也有直接用Apollo Server套件實體化的，

選擇好了方法後，下一步就是如何在過程中塞入authorization process，
  
經過資料查詢發現可以在Apollo Server 的 context中實現，
  
把驗證過後的資訊新增到context中，以便之後在resolvers中取用。  
<br />

撰寫專案後體會到GraphQL與REST在query時的自由度差異，

與TypeScript在減少語法與型別錯誤的便利性，

對於這兩種技術的認識未來還有很大的進步空間，

但非常開心能藉由這次專案來學習新的技術。
