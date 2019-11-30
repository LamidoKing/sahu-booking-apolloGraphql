import Joi from './customJoi'

export const ObjectId = Joi.object().keys({
  id: Joi.string().objectId().label('Object ID')
})
