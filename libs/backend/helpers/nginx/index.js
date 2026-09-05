const s = {
    0:{
        "name":"http",
        "type":'object',
        "match":'',
        "childs":{
            0:{
                name:'include',
                match:'mime.types sanddeep'
            },
            1:{
                name:'location',
                match:'kundu',
                type:'object',
                childs:{
                    0:{
                        name:'proxy-pass',
                        match:'andeep.com'
                    }
                }
            }
        }
    }
}

const { spawn } = require("child_process");

const config = require('./helpers');


const _setup = async (req, res, next) => {
    const r = parser.start(``, s, 0, req);

    console.log(config);

    console.log(r);



    const ls = spawn('pwd');

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });
    
    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
    
}

exports.setup = require('./setup');