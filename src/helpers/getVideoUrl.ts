export function getVideoUrl(url: string) {
  return new URL(`../assets/video/${url}`, import.meta.url).href;
}
