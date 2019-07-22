import React from 'react';




export class TileSet {

    tileSetImage:HTMLImageElement;
    imageWidth:number;
    imageHeight:number;

    constructor(fileName: string) {
        this.tileSetImage = new Image();
        this.tileSetImage.src = fileName;
        this.imageWidth = this.tileSetImage.naturalWidth;
        this.imageHeight = this.tileSetImage.naturalWidth;
    }

    public getWidth() {
        return this.imageWidth;
    }

    public getHeight() {
        return this.imageHeight;
    }

    public getTile() {
        return <img src={this.tileSetImage.src} alt="Logo" />;
    }

}
