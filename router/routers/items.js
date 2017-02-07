import {Router} from 'express';
import ItemController from '../../controller/ItemController';

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id',itemCtrl.getOne);
router.post('/',itemCtrl.addOne);
router.delete('/:id',itemCtrl.deleteOne);
router.put('/:id',itemCtrl.updateOne);


export default router;