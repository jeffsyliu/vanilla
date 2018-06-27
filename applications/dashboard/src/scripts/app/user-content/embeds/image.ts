/**
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

import { registerEmbed, IEmbedData, FOCUS_CLASS } from "@dashboard/embeds";

// Setup image embeds.
registerEmbed("image", imageRenderer);

/**
 * Render an image embed in the editor.
 */
export async function imageRenderer(rootElement: HTMLElement, contentElement: HTMLElement, data: IEmbedData) {
    rootElement.classList.add("embedExternal");
    rootElement.classList.add("embedImage");

    const image = document.createElement("img");
    image.classList.add("embedImage-img");
    image.setAttribute("src", data.url || "");
    image.setAttribute("alt", data.name || "");

    contentElement.appendChild(image);
}
