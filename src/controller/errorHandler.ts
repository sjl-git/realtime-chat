import { ErrorRequestHandler} from 'express'

const error = {
  'BAD_REQUEST': {
    code: 400,
    message: '잘못된 요청입니다.'
  },
  'USER_DUP_ERR': {
    code: 400,
    message: '중복된 아이디입니다.'
  },
  'INTERNAL_SERVER_ERROR': {
    code: 500,
    message: '알 수 없는 에러가 발생했습니다.'
  },
  'FRIEND_DUP_ERR': {
    code: 400,
    message: '중복된 친구 요청입니다.'
  }
}

export const errCode = {
  '001': 'BAD_REQUEST',
  '002': 'USER_DUP_ERR',
  '003': 'INTERNAL_SERVER_ERROR',
  '004': 'FRIEND_DUP_ERR'
}



export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  const { code: errCode, message: errMessage} = error[err.message] || error['INTERNAL_SERVER_ERROR']

  return res.send({
    code: errCode,
    message: errMessage
  })

}