import { connect } from 'mongoose';
const server = 'mongodb+srv://imdbuser:nzn8Qj64QzgBXYdS@cloudmongo-v60mx.mongodb.net/test?retryWrites=true&w=majority';
const database = 'imdbData';      // REPLACE WITH YOUR DB NAME
class DB {
  constructor() {
    this._connect()
  }
_connect() {
     connect(`${server}`,{ useNewUrlParser: true, dbName : 'imdbData' })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error(err,'Database connection error')
       })
  }
}

export default new DB();