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

