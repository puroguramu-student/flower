export async function fetchImages(flower) {
    const response = await fetch(`image/${flower}/image.json`);
    const data = await response.json();
    return data.message;
}