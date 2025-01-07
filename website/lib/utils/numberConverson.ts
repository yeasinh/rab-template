export const  convertEnglishToBanglaNumber = (number) => {
    const englishToBanglaMap = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
      '6': '৬',
      '7': '৭',
      '8': '৮',
      '9': '৯',
    };
  
    // Convert the number to a string and replace each digit
    return number
      .toString()
      .split('')
      .map(digit => englishToBanglaMap[digit] || digit) // Replace or keep the original if not a digit
      .join('');
  }