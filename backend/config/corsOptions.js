const whitelist = ['http://localhost:3000', 'http://localhost:6005']

const corsOptions = {
  origin: function (origin, callback) {
    if (origin) {
      console.log('mismo origen');
      console.log(origin);
      
    }
    //si es el mismo origen es undefined
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default corsOptions;