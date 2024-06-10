import { TheCatAPI } from "@thatapicompany/thecatapi";

const theCatAPI = new TheCatAPI(
  "live_u3SN0EYS4MkDP31pzW8I35AISWfsL4TcQdY1XVgDiED3yywU6MAbldrq7aRF5cHS",
);

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
