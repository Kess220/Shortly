export default class Url {
  constructor(id, originalUrl, shortCode, createdAt, userId) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortCode = shortCode;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}
