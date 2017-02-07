import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id',categoryCtrl.getOne);
router.post('/',categoryCtrl.addOne);
router.delete('/:id',categoryCtrl.deleteOne);
router.put('/:id',categoryCtrl.updateOne);


export default router;