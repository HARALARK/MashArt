const roomCodeGenerator = () => {
  const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  let size = string.length
  let index = null
  for (let i = 0; i < 6; i++) {
    index = Math.floor(Math.random() * size)
    code += string[index]
  }

  return code
}

export default roomCodeGenerator
