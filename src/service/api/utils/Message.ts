class Message {
  sendData(data: any) {
    return {
      Success: true,
      data
    }
  }
  success(message: string) {
    return {
      Success: true,
      message
    }
  }
  error(message: string) {
    return {
      Success: false,
      message
    }
  }
}

export default Message
