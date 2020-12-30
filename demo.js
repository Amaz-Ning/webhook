const http = require('http');
const createHandler = require('github-webhook-handler')
const handler = createHandler({
    path: '/',
    secret: 'helloworld'
})
http.createServer((req, res) => {
    console.log('已经接收到请求')
    handler((req, res, err) => {
        console.log('已经接收到webhook')
    })
}).listen(8888, () => {
    console.log('8888端口已启动')
})
handler.on('push', () => {
    console.log('已监听到push事件')
})