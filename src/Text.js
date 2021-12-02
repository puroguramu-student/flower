export async function fetchText(flower) {
    const response = await fetch(`image/${flower}/text.json`);
    const data = await response.json();
    return data.message;
}