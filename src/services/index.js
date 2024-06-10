import { TheCatAPI } from "@thatapicompany/thecatapi";

const theCatAPI = new TheCatAPI(process.env.NEXT_PUBLIC_CATS_API_KEY);

export const getRandomKittens = async (numOfImages) => {
  try {
    const response = await theCatAPI.images.searchImages({
      limit: Number(numOfImages),
    });
    console.log(response);
    return { isError: false, kittens: response };
  } catch (error) {
    console.log(error);
    return { isError: true, error };
  }
};
