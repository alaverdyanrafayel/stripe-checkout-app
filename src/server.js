import './app/configs/database';
import params from './app/configs/params';
import http from 'http';
import App from './app/app';

const server = http.createServer(App());

server.listen(process.env.PORT || params.apiPort, () => {
    console.log(`Listening ${server.address().port} port.`);
});
