/**
 * Created by benseager on 06/02/2016.
 */
server = require('pushstate-server');

server.start({
    port: 8000,
    directory: './'
});