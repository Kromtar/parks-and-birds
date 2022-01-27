/*
 * Helper para el manejo de los errors en funciones de request async
 */

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

module.exports = catchAsync
