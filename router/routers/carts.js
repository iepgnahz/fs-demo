import {Router} from 'express';
import CartController from '../../controller/CartController';

const router = Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:id',cartCtrl.getOne);
router.post('/',cartCtrl.addOne);
router.delete('/:id',cartCtrl.deleteOne);
router.put('/:id',cartCtrl.updateOne);


export default router;
