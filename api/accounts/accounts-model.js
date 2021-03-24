const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
  // return Promise.reject()
}

const getById = id => {
  return db('accounts').where({id: id}).first()
}

const create = account => {
  return db('accounts').insert(account)
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
