# vue-cms

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 搭建实现步骤：
1. 路由的配置；
2. 全局路由守卫的配置；
3. vuex;
### 登陆模块的逻辑实现
1. 通过全局前置路由守卫判断用户跳转路由时是否携带token,如果未携带跳转到登陆页面，登陆成功后重定向到想要跳转的页面；
2. 成功获取token后，设置请求头和token绑定，每次请求后端接口都要携带token校验；
3. 携带token的则判断是否存在用户信息，如果没有就通过token拉取用户信息，再跳转到想要去的路由；