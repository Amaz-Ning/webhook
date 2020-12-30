const http = require('http');
const createHandler = require('github-webhook-handler')
const handler = createHandler({
    path: '/',
    secret: 'helloworld'
})
http.createServer((req, res) => {
    handler(req, res, (err) => {
        
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(8888, () => {
    console.log('8888端口已启动')
})
handler.on('push', () => {
    console.log('已监听到push事件')
})