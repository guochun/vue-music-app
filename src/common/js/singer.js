export default class Singer {
  constructor ({ id, name, uid }) {
    this.id = id
    this.name = name
    this.uid = uid
    this.avatar = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${uid}.jpg?max_age=2592000`
  }
}
