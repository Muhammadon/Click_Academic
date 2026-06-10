export const PATHSERVER: string = "http://127.0.0.1:8000";
// export function GETdata() : Promise

/*
 * dapatkan data dari backEnd
 */
export async function GetApiData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    console.log("data yang di dapat : ", data);
    return data;
  } catch (error) {
    // Handle network errors or issues with the response parsing
    console.error("Failed to fetch data:", error);
  }
}

export async function sendPostData(url: string, data: any) {
  try {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Memberitahu server bahwa data berbentuk JSON
        // 'Authorization': 'Bearer TOKEN_ANDA' // Tambahkan jika API butuh autentikasi
      },
      body: JSON.stringify(data), // Mengubah objek TypeScript menjadi string JSON
    })
      .then((data) => data.json())
      .then((data) => {
        console.info(data);
      });
  } catch (err) {
    console.error("Gagal mengirim data:", err);
  }
}
