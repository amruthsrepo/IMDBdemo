import { Schema, model } from 'mongoose';

const posterSchema = Schema({
    "buf" : String
});

export default model('poster',posterSchema,'posters');