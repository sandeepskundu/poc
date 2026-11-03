const fs = require('fs');
const path = require('path');
const {spawn, exec} = require('child_process');

const isPidAlive = async (req, res, pid) => {
    if (!pid || pid <= 0){
        return false;
    }else{
        try {
            process.kill(pid, 0);
            return true;
        } catch (err) {
            return err.code === 'EPERM';
        }
    }
    
};

const killProcessTree = async (req, res, pid) => {
    if (!pid || pid <= 0) return;
    try {
        if (process.platform === 'win32') {
            exec(`taskkill /pid ${pid} /T /F`);
        } else {
            process.kill(-pid, 'SIGTERM');
            setTimeout(async () => {
                if (await isPidAlive(req, res, pid)) {
                    try {
                        process.kill(-pid, 'SIGKILL');
                    } catch {}
                }
            }, 2000);
        }
    } catch {}
};

const spawnDetachedCommand = async (req, {cmd, cwd, env = {}, logFile, onExit}) => {
    const resolvedCwd = cwd?path.isAbsolute(cwd)?cwd:path.resolve(process.cwd(), cwd):process.cwd();

    if (!fs.existsSync(resolvedCwd)) {
        throw new Error(`Working directory does not exist: ${resolvedCwd}`);
    }

    const outFd = fs.openSync(logFile, 'a');

    try {
        const proc = spawn(cmd, [], {
            shell:true,
            detached:true,
            cwd:resolvedCwd,
            stdio:['ignore', outFd, outFd],
            env:{...process.env, FORCE_COLOR:'1', ...env}
        });

        let exitHandled = false;

        const handleExit = (code) => {
            if (exitHandled){
                return;
            }else{
                exitHandled = true;
                if(typeof onExit === 'function'){
                    onExit(code ?? 0);
                }
            }
        };

        proc.once('exit', (code) => handleExit(code));
        proc.once('error', () => handleExit(1));
        proc.unref();
        return proc.pid;
    } finally {
        fs.closeSync(outFd);
    }
};

exports.isPidAlive = isPidAlive;
exports.killProcessTree = killProcessTree;
exports.spawnDetachedCommand = spawnDetachedCommand;