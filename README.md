# FantasyMapProject

This project aims to provide Google Maps like navigation over a custom map, e.g. for a RPG world map.

See example at https://echolaitoc.github.io/FantasyMapProject/
![map screenshot](https://raw.githubusercontent.com/Echolaitoc/FantasyMapProject/master/doc/readme_preview.png)

The app can be built as a standalone WPF application or alternatively as a web app using [Bridge.NET](https://bridge.net/).
Either way the map is built from individual tiles at different zoom levels. For example put one 256x256 image in the img/Layer0 folder, then 4 images at 256x256 each of the same map but zoomed in in img/Layer1 etc. always doubling the resolution for each layer. The dimensions and tile size have to be set in img/LayerInfo.xml like this (other resolutions are possible):
```
<LayerInfo TileSize="256">
	<Layer DimensionX="1" DimensionY="1"/>
	<Layer DimensionX="2" DimensionY="2"/>
	<Layer DimensionX="4" DimensionY="4"/>
</LayerInfo>
```

Setting up the contents of the img folder should result in everything being copied to the output directory when building.