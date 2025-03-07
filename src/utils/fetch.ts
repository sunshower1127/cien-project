export async function fetchWithStatusHandling<ReturnType>(url: string, onSuccess: (json: any) => ReturnType) {
  const resp = await fetch(url);
  if (resp.ok) {
    const jsonData = await resp.json();
    return onSuccess(jsonData);
  } else if (resp.status === 304) {
    return null;
  } else {
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}
