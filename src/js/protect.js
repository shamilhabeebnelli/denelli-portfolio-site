/**
 * Light download friction for photos: blocks drag-out, the long-press/right-click
 * image menu and text-style selection. This only stops casual saving. Anyone can
 * still screenshot the page or read the image URL from the browser tools, so it
 * is friction, not protection. The images are also already web-size (max 420x560).
 */
export function initPhotoFriction(root = document) {
  root.querySelectorAll("img").forEach((img) => {
    img.draggable = false;
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
  root.addEventListener("contextmenu", (e) => {
    if (e.target instanceof globalThis.Element && e.target.closest("img, figure, .pt")) e.preventDefault();
  });
}
