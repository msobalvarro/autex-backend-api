import { createDiagnosticController, getDiagnosticController } from 'controllers/diagnostic';
import { Router } from 'express';
import { createDiagnosticProps, getDetailIdProp } from 'middlewares/params';

export const router = Router()

router.post('/create', ...createDiagnosticProps, createDiagnosticController)
router.get('/detail/:id', ...getDetailIdProp, getDiagnosticController)
