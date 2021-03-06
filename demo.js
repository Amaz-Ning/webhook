const http = require('http');
const createHandler = require('github-webhook-handler')
const {spawn} = require('child_process')
const handler = createHandler({
    path: '/',
    secret: 'helloworld'
})
const run_process = (cmd, args, callback) => {
    const child = spawn(cmd, args)
    let resp = '';
    child.stdout.on('data', (buffer) => {
        resp += buffer.toString();
    })
    child.stdout.on('end', () => {
        callback(resp)
    })
}
http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404
        res.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"})
        res.end('你好呀，这里是amaz用来监听webhook的地址！')
    })
}).listen(8888, () => {
    console.log('8888端口已启动')
})

handler.on('push', () => {
    console.log('已监听到push事件 ahhahahhahah')
    run_process('sh', ['./deploy.sh'], (text) => {
        console.log(text);
    })
})
