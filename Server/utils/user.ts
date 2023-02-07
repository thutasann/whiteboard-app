import { RoomTypes } from '../types/roomData'

let users: RoomTypes[] = []

/**
 * Add User
 */
export const addUser = ({ name, userId, roomId, host, presenter, socketId }: RoomTypes) => {
  const user = { name, userId, roomId, host, presenter, socketId }
  users.push(user)
  return users.filter(user => user.roomId === roomId)
}

/**
 * Remove User
 */
export const removeUser = (id: string) => {
  const index = users?.findIndex(user => user.socketId === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

/**
 * Get Sinngle
 */
export const getUser = (id: string) => {
  return users.find(user => user.socketId === id)
}

/**
 * Get all Users
 */
export const getUsersInRoom = (roomdId: string) => {
  return users.filter(user => user.roomId === roomdId)
}
