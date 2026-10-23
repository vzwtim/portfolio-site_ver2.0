# Portfolio Site

This is a portfolio site built with Next.js.

## Image Optimization

This project uses the `sharp` library to optimize images. The optimization process includes resizing images and converting them to modern formats like AVIF and WebP.

### How to use

1.  **Place original images:**
    Place the image files you want to optimize in the `public/images` directory.

2.  **Run the optimization script:**
    Execute the following command in your terminal:

    ```bash
    npm run images:build
    ```

    This command will:
    - Read images from `public/images`.
    - Generate multiple sizes of each image for thumbnails and display purposes.
    - Convert them to AVIF and WebP formats.
    - Save the optimized images in the `public/optimized` directory.
    - Create a `blur-map.json` file for image placeholders.

3.  **Clean optimized images:**
    If you need to remove all the optimized images, run:

    ```bash
    npm run images:clean
    ```

    This will delete the `public/optimized` directory.

## 公開サービス

- [一種単価マップ](https://isshu-map.babachan.workers.dev/)
- [東京時間マップ](https://tokyo-time-map.babachan.workers.dev/)
- [タイルアトリエ](https://tile-atelier.babachan.workers.dev/)
