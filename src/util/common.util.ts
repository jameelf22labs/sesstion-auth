export const CommonUtils = {
  getSessionId: (connectsid: string): string | null => {
    const match = connectsid.match(/connect\.sid=s%3A([^.;]+)/);
    return match ? `sess:${match[1]}` : null;
  },
};
