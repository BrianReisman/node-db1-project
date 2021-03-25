const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
  // const asdf = 'asdf'
  // return Promise.reject(asdf)
}

const getById = id => {
  return db('accounts').where({id: id}).first()
}

const create = account => {
  return db('accounts').insert(account)
}

const updateById = async (id, account) => {
 return db('accounts').update(account).where({id})
}

const deleteById = async id => {
return db('accounts').where({id}).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
