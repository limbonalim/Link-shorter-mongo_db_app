
const generateUniqueId = (min = 6, max = 7) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const random = Math.random() * 10;
  const idLength = random > 5 ? min : max;

  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default generateUniqueId;