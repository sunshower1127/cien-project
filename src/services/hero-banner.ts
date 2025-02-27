interface Response {
  data: {
    type: "image" | "video";
    url: string;
  }[];
}

export async function fetchHeroBannerItems() {
  //   const resp = await fetch(apiURL);
  //   if (resp.status === 200) {

  //     return result;
  //   } else if (resp.status === 304) {
  //     return null;
  //   } else {
  //     throw new Error(`${resp.status}: ${resp.statusText}`);
  //   }
  // dummy for test
  const { data }: Response = {
    data: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1734779205618-30ee0220f56f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      { type: "video", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      { type: "image", url: "https://images.unsplash.com/photo-1740389029981-a891776cf0ad?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { type: "video", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    ],
  };

  return data;
}
