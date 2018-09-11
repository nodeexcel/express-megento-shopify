import errorHandler from '../lib/util'

export default class BaseAPIController {
  constructor() {}

  handleErrorResponse(res, err) {
    res.json({
      status: 0,
      error: errorHandler(err)
    })
  }

  handleSuccessResponse(res, next, data) {
    res.json({
      status: 1,
      body: data
    })
  }
}