const urlMetadata = require("url-metadata");
import {LinkMeta} from "src/types";

function getUrlMetadata(url: string): Promise<LinkMeta | null> {
    return urlMetadata(url).then(
        (metadata) => {
            return {
                url: metadata.url,
                title: metadata.title,
                image: metadata.image,
                description: metadata.description
            };
        },
        (error) => {
            console.log("metadata error! = ", error, error.message);
            return null;
        }
    );
}

module.exports = getUrlMetadata;
