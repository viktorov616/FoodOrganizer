import { DEFAULT_IMAGES_PATH,
         DEFAULT_RECIPE_IMAGE,
         UPLOADS_PATH          } from 'constants/images';

export function getRecipeImageSrc(imageName?: string) {
  const imageSrc =  (imageName)
    ? `${UPLOADS_PATH}${imageName}`
    : `${DEFAULT_IMAGES_PATH}${DEFAULT_RECIPE_IMAGE}`;

  return imageSrc;
}
