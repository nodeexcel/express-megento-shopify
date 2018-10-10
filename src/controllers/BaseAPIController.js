import errorHandler from '../lib/util'

export default class BaseAPIController {
  constructor() {}

  handleErrorResponse(res, err) {
    res.json({
      error: errorHandler(err)
    })
  }

  handleSuccessResponse(res, next, data) {
    res.json(data)
  }
}