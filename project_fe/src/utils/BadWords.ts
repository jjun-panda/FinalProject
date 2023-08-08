export const detectBadWords = (text: string, badWords: string[]) => {
    const words = text.split(" ");
    return words.some((word) => badWords.includes(word));
};