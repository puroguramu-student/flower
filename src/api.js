export async function fetchObject (flower) {
    const response = await fetch(`image/${flower}/object.json`);
    const data = await response.json();
    return data.message;
}