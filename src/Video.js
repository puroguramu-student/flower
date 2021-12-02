export async function fetchVideo(flower) {
    const response = await fetch(`image/${flower}/video.json`);
    const data = await response.json();
    return data.message;
}