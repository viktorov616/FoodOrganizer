import * as React               from 'react';

import { DEFAULT_IMAGES_PATH,
         UPLOADS_PATH         } from 'constants/images';

export enum ImagePropsType {
  WITH_NAME,
  WITH_SRC,
}

interface ImagePropsBase {
  alt?: string;
  height?: number;
  width?: number;
  wrapperClass?: string;
}

interface ImagePropsWithSrc extends ImagePropsBase {
  type: ImagePropsType.WITH_SRC;
  src: string;
}

interface ImagePropsWithName extends ImagePropsBase {
  type: ImagePropsType.WITH_NAME;
  name: string;
  uploadType: string;
}

type ImageProps = ImagePropsWithSrc|ImagePropsWithName;

const Image: React.SFC<ImageProps> = (props) => {
  function getSrc() {
    switch (props.type) {
      case ImagePropsType.WITH_SRC:
        return props.src;
      case ImagePropsType.WITH_NAME: {
        const path = (props.uploadType === 'user') ? UPLOADS_PATH : DEFAULT_IMAGES_PATH;

        return `${path}${props.name}`;
      }
    }
  }

  function getAlt() {
    if (props.alt) return props.alt;

    switch (props.type) {
      case ImagePropsType.WITH_NAME:
        return props.name;
      case ImagePropsType.WITH_SRC:
        return '';
    }
  }

  return (
    <div className={props.wrapperClass}>
      <img
        height={props.height}
        width={props.width}
        src={getSrc()}
        alt={getAlt()}
      />
    </div>
  );
};

Image.defaultProps = {
  uploadType: 'user',
};

export default Image;
