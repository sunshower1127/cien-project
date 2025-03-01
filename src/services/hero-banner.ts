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
      { type: "image", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      {
        type: "image",
        url: "https://plus.unsplash.com/premium_photo-1737755047901-2b5d6be10ac2?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      { type: "image", url: "https://images.unsplash.com/photo-1659629413053-cd18447d55ed?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  };

  return data;
}
