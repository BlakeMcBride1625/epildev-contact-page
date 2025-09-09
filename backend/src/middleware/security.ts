import { Request, Response, NextFunction } from 'express'

export const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  // Simple in-memory rate limiting
  // In production, use Redis or a proper rate limiting library
  const clientIp = req.ip || req.connection.remoteAddress
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map()
  }

  const key = `rate_limit_${clientIp}`
  const requests = global.rateLimitStore.get(key) || []

  // Remove old requests outside the window
  const validRequests = requests.filter((timestamp: number) => now - timestamp < windowMs)

  if (validRequests.length >= maxRequests) {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    })
    return
  }

  // Add current request
  validRequests.push(now)
  global.rateLimitStore.set(key, validRequests)

  next()
}

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString()
  const ip = req.ip || req.connection.remoteAddress
  const userAgent = req.get('User-Agent') || 'Unknown'
  const method = req.method
  const url = req.url

  console.log(`[${timestamp}] ${ip} ${method} ${url} - ${userAgent}`)
  
  next()
}

export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  
  next()
}

// Extend global namespace for rate limiting
declare global {
  var rateLimitStore: Map<string, number[]> | undefined
}



