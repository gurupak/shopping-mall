export async function getIPAddress() {
  let myIP = "";
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}
