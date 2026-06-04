export const PATHSERVER  : string = "http://127.0.0.1:8000"
// export function GETdata() : Promise


/*
 * dapatkan data dari backEnd   
 */
export async function GetApiData(url :string)  {
 try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
  
    console.log("data yang di dapat : ",data);
    return data;

  } catch (error) {
    // Handle network errors or issues with the response parsing
    console.error("Failed to fetch data:", error);
  } 
}
