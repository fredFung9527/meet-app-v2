import Dexie from 'dexie'

const db = new Dexie('MeetApp')
db.version(1).stores({ 
  internalParticipants: 'userID',
  notes: 'meeting, createdAt',
})

export default db

export async function getInternalParticipants() {
  return await db.internalParticipants.toArray()
}

export async function getLocalNote(meetingID) {
  if (!meetingID) throw new Error('need more information')
  return await db.notes.get(meetingID)
}

export async function saveLocalNote(note) {
  if (!note || !note.meeting) throw new Error('need more information')
  return await db.notes.put(note, note.meeting)
}