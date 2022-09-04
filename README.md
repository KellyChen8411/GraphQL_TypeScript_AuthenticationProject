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
- 在User type中定義所需attribute
- login API因有資料的update，將其定義在mutation中
- me API定義在Query中，並指定期回傳data type為User type object

### resolvers.ts
定義schema中的field如何經過處裡並回傳
1. mutation的login field
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

-  **Playground Example:**
![loginAPI1](https://user-images.githubusercontent.com/41458099/188325588-35b8eea0-eaed-47a5-ac3a-9402f1aa3021.png)


### me API
- **Type:** Query
- **Request:**

下方的attribute皆為optional，但至少需填一個
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
-  **Playground Example:**
![meAPI1](https://user-images.githubusercontent.com/41458099/188325654-df5ab9da-3370-415d-b7a2-27e2d40bc9dd.png)


