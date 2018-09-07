import errorHandler from '../lib/util'

export default class BaseAPIController {
  constructor () {
  }

  handleErrorResponse (res, err) {
    res.json({ status:0, error:errorHandler(err) })
  }

  handleSuccessResponse (res) {
    res.json({
      status: 'SUCCESS'
    })
  }
}
