
Dockerの立ち上げ方
-------------------------------------------------

Dockerfileがあるディレクトリで下記コマンドを実行してコンテナを作成する。

```sh
$ docker build ./ -t vc-web
$ docker run --name vc-web -itd -v C:/Users/tetsuo/Documents/vividcolors/vividcolors.github.io:/app -p 8088:8088 vc-web
```

作ったコンテナには下記でログインできる。

```sh
$ docker exec -it vc-web bash
```

その他、以下のコマンドが可能

```sh
$ docker exec vc-web yarn run build  # ソースのビルド
$ docker exec vc-web yarn start:dev  # webpack-dev-serverの開始
```
