const init = (arg) => {
    if(typeof arg !== 'string'){
        return 0;
    }else{
        const units = {
            B:1,
            KB:1024,
            MB:1024 ** 2,
            GB:1024 ** 3,
            TB:1024 ** 4
        };

        const match = arg.trim().toUpperCase().match(/^([\d.]+)\s*(B|KB|MB|GB|TB)$/);

        if (!match) {
            return 0;
        }else{
            const unit = match[2];
            const value = parseFloat(match[1]);

            return (value * units[unit]);
        }
    }
}

const format = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 B';
  if (isNaN(bytes) || bytes < 0) return 'Invalid input';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  return `${parseFloat(value.toFixed(decimals))} ${units[i]}`;
}

const ofJson = (arg) => {
    //return Buffer.byteLength(JSON.stringify(arg || {}), 'utf8');
}

exports.init = init;
exports.ofJson = ofJson;
//exports.format = format;