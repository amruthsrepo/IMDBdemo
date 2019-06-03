import express from 'express';
import Dbs from '../src/Database';
import movctrl from '../src/controls/movctrl';
import proctrl from '../src/controls/proctrl'
import actctrl from '../src/controls/actctrl'

const app = express();

const path = require('path');

const router = express.Router();

app.use(express.static(path.join(__dirname, 'client/build')));


router.get('/api/getmov',movctrl.getmovs);
router.get('/api/getpro',proctrl.getpros);
router.get('/api/getact',actctrl.getacts);
router.post('/api/addmov',movctrl.addmov);
router.post('/api/addpro',proctrl.addpro);
router.post('/api/addact',actctrl.addact);

export default router;