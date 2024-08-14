import { createDiagnosticController } from 'controllers/diagnostic';
import { Router } from 'express';
import { createDiagnosticProps } from 'middlewares/params';

export const router = Router()

router.post('/create', ...createDiagnosticProps, createDiagnosticController)
