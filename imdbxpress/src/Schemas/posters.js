import { Schema, model } from 'mongoose';

const posterSchema = Schema({
    img: { data: Buffer, contentType: String}
});

export default model('poster',posterSchema,'posters');