import express from 'express';
import Dbs from '../src/Database';
import movctrl from '../src/controls/movctrl';
import formidable from 'formidable'

const app = express();

const path = require('path');

const router = express.Router();

app.use(express.static(path.join(__dirname, 'client/build')));


router.get('/api/getmovctrl',movctrl.getmovs);
router.post('/api/updmov',movctrl.updateproj);
router.post('/api/addmov',movctrl.addmov);

export default router;