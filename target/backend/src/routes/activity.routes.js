import { Router } from 'express';

const router = Router();

router.get('/activity/ping', (req, res) => {
  res.json({
    message: 'pong',
    ip: req.ip,
    userAgent: req.get('user-agent'),
    timestamp: new Date().toISOString()
  });
});

router.post('/activity/client-event', (req, res) => {
  res.status(202).json({
    accepted: true,
    event: req.body?.event || 'unknown',
    timestamp: new Date().toISOString()
  });
});

router.get('/metrics/demo', (req, res) => {
  res.json({
    requestsHint: 'Use ab, hey, wrk, or curl loops against /products, /login, and /activity/ping for SIEM testing.',
    generatedAt: new Date().toISOString()
  });
});

export default router;
