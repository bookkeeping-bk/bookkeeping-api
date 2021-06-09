# 懒得记

## 构建程序

```shell
# 安装依赖
yarn

# 配置.env
cp .env.example .env

# 运行开发环境
yarn serve

# 创建一个迁移文件，指定类名。会创建到src/database/migrations目录下
yarn migration:create CreateUser

# 运行迁移。自动创建数据库和表（初始化数据库）
yarn migration:run

# 还原最近的迁移。该命令将仅撤消上一次执行的迁移。可以多次执行此命令以还原多个迁移
yarn migration:revert

# 删除整个数据库。谨慎在生产环境使用
yarn schema:drop

# 执行初始化数据
yarn seed:run
```

## 程序部署

使用 GitHub Actions 打包 Docker 镜像推送到阿里云
