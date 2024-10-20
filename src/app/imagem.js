export default function gitHubLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality ?? 75}`;
}
