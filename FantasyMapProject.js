/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2020
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("FantasyMapProject", function ($asm, globals) {
    "use strict";

    Bridge.define("FantasyMapProject.IMapTileImage", {
        $kind: "interface"
    });

    Bridge.define("FantasyMapProject.LayerInfo", {
        fields: {
            Zoom: 0,
            DimensionX: 0,
            DimensionY: 0
        },
        ctors: {
            ctor: function (zoom, dimensionX, dimensionY) {
                this.$initialize();
                this.Zoom = zoom;
                this.DimensionX = dimensionX;
                this.DimensionY = dimensionY;
            }
        }
    });

    Bridge.define("FantasyMapProject.Program", {
        statics: {
            fields: {
                canvas: null
            },
            ctors: {
                init: function () {
                    Bridge.ready(this.Main);
                }
            },
            methods: {
                Main: function () {
                    FantasyMapProject.Program.ResetBrowserFrame();
                    FantasyMapProject.Program.canvas = document.createElement("canvas");

                    document.body.appendChild(FantasyMapProject.Program.canvas);

                    var app = new Web.App(FantasyMapProject.Program.canvas);
                    app.CalculateResize();

                },
                ResetBrowserFrame: function () {
                    document.body.style.margin = "0";
                    document.body.style.padding = "0";
                    document.body.style.height = "100%";
                    document.body.style.overflow = "hidden";
                }
            }
        },
        $entryPoint: true
    });

    Bridge.define("FantasyMapProject.Utility", {
        statics: {
            methods: {
                Wrap$1: function (value, from, to) {
                    from = {v:from};
                    to = {v:to};
                    if (from.v === to.v) {
                        return from.v;
                    }
                    if (from.v > to.v) {
                        FantasyMapProject.Utility.Swap$1(from, to);
                    }
                    if (value < from.v) {
                        return ((to.v - (((from.v - value) | 0)) % (((to.v - from.v) | 0))) | 0);
                    } else {
                        return ((from.v + (((value - from.v) | 0)) % (((to.v - from.v) | 0))) | 0);
                    }
                },
                Wrap: function (value, from, to) {
                    from = {v:from};
                    to = {v:to};
                    if (from.v === to.v) {
                        return from.v;
                    }
                    if (from.v > to.v) {
                        FantasyMapProject.Utility.Swap(from, to);
                    }
                    var cycle = to.v - from.v;
                    if (cycle === 0) {
                        return to.v;
                    }
                    return value - cycle * Math.floor((value - from.v) / cycle);
                },
                Swap$1: function (a, b) {
                    var tmp = a.v;
                    a.v = b.v;
                    b.v = a.v;
                },
                Swap: function (a, b) {
                    var tmp = a.v;
                    a.v = b.v;
                    b.v = a.v;
                },
                Clamp$1: function (value, min, max) {
                    return ((value) < (min) ? (min) : ((value > max) ? (max) : (value)));
                },
                Clamp: function (value, min, max) {
                    return ((value) < (min) ? (min) : ((value > max) ? (max) : (value)));
                },
                RotateLeft: function (T, e, n) {
                    return n >= 0 ? System.Linq.Enumerable.from(e, T).skip(n).concat(System.Linq.Enumerable.from(e, T).take(n)) : FantasyMapProject.Utility.RotateRight(T, e, ((-n) | 0));
                },
                RotateRight: function (T, e, n) {
                    return System.Linq.Enumerable.from(FantasyMapProject.Utility.RotateLeft(T, System.Linq.Enumerable.from(e, T).reverse(), n), T).reverse();
                }
            }
        }
    });

    Bridge.define("FantasyMapProject.Vec2d", {
        statics: {
            methods: {
                op_Addition: function (a, b) {
                    if (a == null) {
                        return (b == null) ? null : new FantasyMapProject.Vec2d.$ctor1(FantasyMapProject.Vec2d.op_Implicit(b));
                    }
                    if (b == null) {
                        return new FantasyMapProject.Vec2d.$ctor1(FantasyMapProject.Vec2d.op_Implicit(a));
                    }
                    return new FantasyMapProject.Vec2d.$ctor3(a.x + b.x, a.y + b.y);
                },
                op_UnaryNegation: function (a) {
                    return FantasyMapProject.Vec2d.op_Multiply(a, -1);
                },
                op_Subtraction: function (a, b) {
                    if (a == null) {
                        return (b == null) ? null : new FantasyMapProject.Vec2d.$ctor1(FantasyMapProject.Vec2d.op_Implicit(b));
                    }
                    if (b == null) {
                        return new FantasyMapProject.Vec2d.$ctor1(FantasyMapProject.Vec2d.op_Implicit(a));
                    }
                    return new FantasyMapProject.Vec2d.$ctor3(a.x - b.x, a.y - b.y);
                },
                op_Multiply$1: function (factor, a) {
                    return FantasyMapProject.Vec2d.op_Multiply(a, factor);
                },
                op_Multiply: function (a, factor) {
                    if (a == null) {
                        return null;
                    }
                    return new FantasyMapProject.Vec2d.$ctor3(a.x * factor, a.y * factor);
                },
                op_Division: function (a, divisor) {
                    return new FantasyMapProject.Vec2d.$ctor3(a.x / divisor, a.y / divisor);
                },
                op_Implicit: function (a) {
                    return new FantasyMapProject.Vec2i.$ctor4(Bridge.Int.clip32(a.x), Bridge.Int.clip32(a.y));
                }
            }
        },
        fields: {
            x: 0,
            y: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Set(0, 0);
            },
            $ctor2: function (scalar) {
                this.$initialize();
                this.Set(scalar, scalar);
            },
            $ctor3: function (x, y) {
                this.$initialize();
                this.Set(x, y);
            },
            $ctor1: function (vec) {
                this.$initialize();
                if (vec == null) {
                    this.Set(0, 0);
                    return;
                }
                this.Set(vec.x, vec.y);
            }
        },
        methods: {
            Set: function (x, y) {
                this.x = x;
                this.y = y;
            },
            Scale: function (vec) {
                if (vec == null) {
                    return this;
                }
                return new FantasyMapProject.Vec2d.$ctor3(this.x * vec.x, this.y * vec.y);
            },
            toString: function () {
                return "x: " + (System.Double.format(this.x, "N3") || "") + " / y: " + (System.Double.format(this.y, "N3") || "");
            }
        }
    });

    Bridge.define("FantasyMapProject.Vec2i", {
        statics: {
            methods: {
                op_Addition: function (a, b) {
                    if (a == null) {
                        return (b == null) ? null : new FantasyMapProject.Vec2i.$ctor1(FantasyMapProject.Vec2i.op_Implicit(b));
                    }
                    if (b == null) {
                        return new FantasyMapProject.Vec2i.$ctor1(FantasyMapProject.Vec2i.op_Implicit(a));
                    }
                    return new FantasyMapProject.Vec2i.$ctor4(((a.x + b.x) | 0), ((a.y + b.y) | 0));
                },
                op_UnaryNegation: function (a) {
                    return FantasyMapProject.Vec2i.op_Multiply(a, -1);
                },
                op_Subtraction: function (a, b) {
                    if (a == null) {
                        return (b == null) ? null : new FantasyMapProject.Vec2i.$ctor1(FantasyMapProject.Vec2i.op_Implicit(b));
                    }
                    if (b == null) {
                        return new FantasyMapProject.Vec2i.$ctor1(FantasyMapProject.Vec2i.op_Implicit(a));
                    }
                    return new FantasyMapProject.Vec2i.$ctor4(((a.x - b.x) | 0), ((a.y - b.y) | 0));
                },
                op_Multiply$1: function (factor, a) {
                    return FantasyMapProject.Vec2i.op_Multiply(a, factor);
                },
                op_Multiply: function (a, factor) {
                    if (a == null) {
                        return null;
                    }
                    return new FantasyMapProject.Vec2i.$ctor2(a.x * factor, a.y * factor);
                },
                op_Division: function (a, divisor) {
                    return new FantasyMapProject.Vec2i.$ctor2(a.x / divisor, a.y / divisor);
                },
                op_Implicit: function (a) {
                    return new FantasyMapProject.Vec2d.$ctor3(a.x, a.y);
                }
            }
        },
        fields: {
            x: 0,
            y: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Set(0, 0);
            },
            $ctor3: function (scalar) {
                this.$initialize();
                this.Set(scalar, scalar);
            },
            $ctor4: function (x, y) {
                this.$initialize();
                this.Set(x, y);
            },
            $ctor2: function (x, y) {
                this.$initialize();
                this.Set(Bridge.Int.clip32(x), Bridge.Int.clip32(y));
            },
            $ctor1: function (vec) {
                this.$initialize();
                if (vec == null) {
                    this.Set(0, 0);
                    return;
                }
                this.Set(Bridge.Int.clip32(vec.x), Bridge.Int.clip32(vec.y));
            }
        },
        methods: {
            Set: function (x, y) {
                this.x = x;
                this.y = y;
            },
            Scale: function (vec) {
                if (vec == null) {
                    return this;
                }
                return new FantasyMapProject.Vec2i.$ctor4(Bridge.Int.mul(this.x, vec.x), Bridge.Int.mul(this.y, vec.y));
            },
            toString: function () {
                return "x: " + this.x + " / y: " + this.y;
            }
        }
    });

    Bridge.define("Map.MapManager", {
        fields: {
            CurrentSettings: null,
            Viewport: null,
            tileGrid: null,
            lastMousePosition: null,
            isMousePressed: false
        },
        events: {
            OnTileCreated: null,
            OnTileRemoved: null,
            OnTileDraw: null
        },
        props: {
            MinZoom: {
                get: function () {
                    return this.CurrentSettings.LayerInfos == null ? -1 : 0;
                }
            },
            MaxZoom: {
                get: function () {
                    return this.CurrentSettings.LayerInfos == null ? -1 : ((this.CurrentSettings.LayerInfos.Count - 1) | 0);
                }
            }
        },
        ctors: {
            init: function () {
                this.CurrentSettings = new Map.MapManager.Settings();
            },
            ctor: function (settings, onTileCreated, onTileRemoved, onTileDraw) {
                this.$initialize();
                this.CurrentSettings = settings.$clone();
                this.Viewport = new Map.MapViewport();
                this.Viewport.BaseTilePixelSize = settings.TileSize;
                this.tileGrid = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(Map.MapTile))).ctor();
                this.OnTileCreated = onTileCreated;
                this.OnTileRemoved = onTileRemoved;
                this.OnTileDraw = onTileDraw;
                this.Viewport.Zoom = (Bridge.Int.div((((this.MaxZoom + 1) | 0)), 2)) | 0;
                if (settings.LayerInfos != null && settings.LayerInfos.Count > 0) {
                    var zoom = Bridge.Int.clip32(this.Viewport.Zoom);
                    var tileCountFactor = Bridge.Int.clip32(Math.pow(2, zoom));
                    this.Viewport.GridSize.Set(Bridge.Int.mul(settings.LayerInfos.getItem(0).DimensionX, tileCountFactor), Bridge.Int.mul(settings.LayerInfos.getItem(0).DimensionY, tileCountFactor));
                }
                this.lastMousePosition = FantasyMapProject.Vec2i.op_Implicit(new FantasyMapProject.Vec2i.ctor());
                this.isMousePressed = false;
            }
        },
        methods: {
            ChangeSize: function (size) {
                this.Viewport.PixelWidth = size.x;
                this.Viewport.PixelHeight = size.y;

                this.RecalculateViewportTileCount();
                this.UpdateTilePositions();
            },
            RecalculateViewportTileCount: function () {

                if (this.tileGrid == null) {
                    this.tileGrid = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(Map.MapTile))).ctor();
                }

                var xCount = (Bridge.Int.mul(Bridge.Int.clip32(Math.ceil(this.Viewport.PixelWidth / this.Viewport.BaseTilePixelSize)), 2) + 1) | 0;
                var yCount = (Bridge.Int.mul(Bridge.Int.clip32(Math.ceil(this.Viewport.PixelHeight / this.Viewport.BaseTilePixelSize)), 2) + 1) | 0;
                var updateAllRows = (this.tileGrid.Count <= 0 || this.tileGrid.getItem(0).Count !== xCount);

                if (this.tileGrid.Count < yCount) {
                    var beginRow = updateAllRows ? 0 : this.tileGrid.Count;
                    for (var y = beginRow; y < yCount; y = (y + 1) | 0) {
                        if (this.tileGrid.Count <= y) {
                            this.tileGrid.add(new (System.Collections.Generic.List$1(Map.MapTile)).ctor());
                        }
                        this.tileGrid.setItem(y, this.RecalculateColumns(y, xCount));
                    }
                } else {
                    var endRow = updateAllRows ? 0 : yCount;
                    for (var y1 = (this.tileGrid.Count - 1) | 0; y1 >= endRow; y1 = (y1 - 1) | 0) {
                        if (this.tileGrid.Count > yCount) {
                            for (var x = 0; x < this.tileGrid.getItem(y1).Count; x = (x + 1) | 0) {
                                this.tileGrid.getItem(y1).getItem(x).Image.FantasyMapProject$IMapTileImage$Remove();
                            }
                            this.tileGrid.removeAt(y1);
                            continue;
                        }
                        this.tileGrid.setItem(y1, this.RecalculateColumns(y1, xCount));
                    }
                }
            },
            RecalculateColumns: function (y, targetLength) {
                if (this.tileGrid.getItem(y).Count < targetLength) {
                    for (var x = this.tileGrid.getItem(y).Count; x < targetLength; x = (x + 1) | 0) {
                        this.tileGrid.getItem(y).add(this.CreateNewTile(x, y));
                    }
                } else {
                    for (var x1 = (this.tileGrid.getItem(y).Count - 1) | 0; x1 >= targetLength; x1 = (x1 - 1) | 0) {
                        this.tileGrid.getItem(y).getItem(x1).Image.FantasyMapProject$IMapTileImage$Remove();
                        this.tileGrid.getItem(y).removeAt(x1);
                    }
                }
                return this.tileGrid.getItem(y);
            },
            OnPress: function (x, y) {
                this.lastMousePosition.Set(x, y);
                this.isMousePressed = true;
            },
            OnRelease: function () {
                this.isMousePressed = false;
            },
            OnMove: function (x, y) {
                if (!this.isMousePressed) {
                    return;
                }
                var oldGridPosition = this.Viewport.GetTopLeftGridCoord();
                var delta = new FantasyMapProject.Vec2d.$ctor3(this.lastMousePosition.x - x, this.lastMousePosition.y - y);
                this.lastMousePosition.Set(x, y);
                this.Viewport.TranslatePixel(FantasyMapProject.Vec2d.op_Implicit(delta));
                this.RotateGridAndUpdateTiles(FantasyMapProject.Vec2i.op_Subtraction(this.Viewport.GetTopLeftGridCoord(), oldGridPosition));
            },
            CreateNewTile: function (x, y) {
                if (this.CurrentSettings.ImagePrefab == null) {
                    return null;
                }
                var t = new Map.MapTile(Bridge.as(Bridge.createInstance(this.CurrentSettings.ImagePrefab.FantasyMapProject$IMapTileImage$GetType(), [Bridge.box(this.Viewport.BaseTilePixelSize, System.Int32)]), FantasyMapProject.IMapTileImage));
                t.Image.FantasyMapProject$IMapTileImage$addOnInitialize(this.OnTileCreated);
                t.Image.FantasyMapProject$IMapTileImage$addOnRemove(this.OnTileRemoved);
                t.Image.FantasyMapProject$IMapTileImage$addOnDraw(this.OnTileDraw);
                t.Image.FantasyMapProject$IMapTileImage$Initialize();
                var viewportTopLeftGrid = this.Viewport.GetTopLeftGridCoord();
                t.GridPosition.Set(((viewportTopLeftGrid.x + x) | 0), ((viewportTopLeftGrid.y + y) | 0));
                var tilePixelSize = this.Viewport.GetTileSizePixel();
                var position = FantasyMapProject.Vec2d.op_Implicit(new FantasyMapProject.Vec2d.$ctor3(Bridge.Int.mul(x, tilePixelSize), Bridge.Int.mul(y, tilePixelSize)));
                position = FantasyMapProject.Vec2i.op_Addition(position, this.Viewport.GetTopLeftPixelOffset());
                t.SetPixelPosition(position, new FantasyMapProject.Vec2i.$ctor3(tilePixelSize));
                t.LoadImage(this.GetImagePath(x, y));
                return t;
            },
            ZoomMap: function (x, y, amount) {
                var $t;
                var oldGridPosition = this.Viewport.GetTopLeftGridCoord();
                var mousePosOldNorm = new FantasyMapProject.Vec2d.$ctor3(this.Viewport.PixelToNormX(Bridge.Int.clip32(x)), this.Viewport.PixelToNormY(Bridge.Int.clip32(y)));
                var oldZoom = this.Viewport.Zoom;
                $t = this.Viewport;
                $t.Zoom += amount;
                this.Viewport.Zoom = FantasyMapProject.Utility.Clamp(this.Viewport.Zoom + amount, this.MinZoom, this.MaxZoom + 0.99999);
                var newZoom = Bridge.Int.clip32(this.Viewport.Zoom);
                if (Bridge.Int.clip32(oldZoom) !== newZoom) {
                    var tileCountFactor = Bridge.Int.clip32(Math.pow(2, newZoom));
                    this.Viewport.GridSize.Set(Bridge.Int.mul(this.CurrentSettings.LayerInfos.getItem(0).DimensionX, tileCountFactor), Bridge.Int.mul(this.CurrentSettings.LayerInfos.getItem(0).DimensionY, tileCountFactor));
                    var mousePosNewNorm = new FantasyMapProject.Vec2d.$ctor3(this.Viewport.PixelToNormX(Bridge.Int.clip32(x)), this.Viewport.PixelToNormY(Bridge.Int.clip32(y)));
                    this.Viewport.TranslateNorm(FantasyMapProject.Vec2d.op_Subtraction(mousePosOldNorm, mousePosNewNorm));
                    this.UpdateAllTiles();
                } else {
                    var mousePosNewNorm1 = new FantasyMapProject.Vec2d.$ctor3(this.Viewport.PixelToNormX(Bridge.Int.clip32(x)), this.Viewport.PixelToNormY(Bridge.Int.clip32(y)));
                    this.Viewport.TranslateNorm(FantasyMapProject.Vec2d.op_Subtraction(mousePosOldNorm, mousePosNewNorm1));
                    this.RotateGridAndUpdateTiles(FantasyMapProject.Vec2i.op_Subtraction(this.Viewport.GetTopLeftGridCoord(), oldGridPosition));
                }
            },
            GetTileCountX: function () {
                if (this.tileGrid != null && this.tileGrid.Count > 0) {
                    return this.tileGrid.getItem(0).Count;
                }
                return 0;
            },
            GetTileCountY: function () {
                return this.tileGrid != null ? this.tileGrid.Count : 0;
            },
            RotateGridAndUpdateTiles: function (rotation) {
                if (Math.abs(rotation.x) >= this.GetTileCountX() || Math.abs(rotation.y) >= this.GetTileCountY()) {
                    this.UpdateAllTiles();
                    return;
                }

                if (rotation.x === 0 && rotation.y === 0) {
                    this.UpdateTilePositions();
                    return;
                }

                var gridSize = this.Viewport.GridSize;
                var mapPosition = this.Viewport.GetTopLeftGridCoord();
                var xCount = this.GetTileCountX();
                var yCount = this.GetTileCountY();

                rotation.x = FantasyMapProject.Utility.Wrap$1(rotation.x, ((-xCount) | 0), xCount);
                rotation.y = FantasyMapProject.Utility.Wrap$1(rotation.y, ((-yCount) | 0), yCount);
                FantasyMapProject.Utility.RotateLeft(System.Collections.Generic.List$1(Map.MapTile), this.tileGrid, rotation.y);

                if (rotation.x !== 0) {
                    for (var y = 0; y < this.tileGrid.Count; y = (y + 1) | 0) {
                        FantasyMapProject.Utility.RotateLeft(Map.MapTile, this.tileGrid.getItem(y), rotation.x);
                    }
                }

                if (rotation.y !== 0) {
                    var rotationWasDown = rotation.y > 0;
                    var beginRow = rotationWasDown ? (((yCount - rotation.y) | 0)) : 0;
                    var endRow = rotationWasDown ? yCount : ((-rotation.y) | 0);
                    for (var y1 = beginRow; y1 < endRow; y1 = (y1 + 1) | 0) {
                        for (var x = 0; x < xCount; x = (x + 1) | 0) {
                            this.tileGrid.getItem(y1).getItem(x).UpdateTile(mapPosition, x, y1, gridSize);
                        }
                    }
                }
                if (rotation.x !== 0) {
                    var rotationWasRight = rotation.x > 0;
                    var beginCol = rotationWasRight ? (((xCount - rotation.x) | 0)) : 0;
                    var endCol = rotationWasRight ? xCount : ((-rotation.x) | 0);
                    for (var y2 = 0; y2 < yCount; y2 = (y2 + 1) | 0) {
                        for (var x1 = beginCol; x1 < endCol; x1 = (x1 + 1) | 0) {
                            this.tileGrid.getItem(y2).getItem(x1).UpdateTile(mapPosition, x1, y2, gridSize);
                        }
                    }
                }
                this.UpdateTilePositions();
            },
            UpdateAllTiles: function () {
                var gridSize = this.Viewport.GridSize;
                var mapPosition = this.Viewport.GetTopLeftGridCoord();
                var offset = this.Viewport.GetTopLeftPixelOffset();
                var tilePixelSize = this.Viewport.GetTileSizePixel();
                var xCount = this.GetTileCountX();
                var yCount = this.GetTileCountY();
                for (var y = 0; y < yCount; y = (y + 1) | 0) {
                    for (var x = 0; x < xCount; x = (x + 1) | 0) {
                        this.tileGrid.getItem(y).getItem(x).UpdateTile(mapPosition, x, y, gridSize);
                        this.UpdateTilePosition(mapPosition, gridSize, x, y, tilePixelSize, offset);
                    }
                }
            },
            UpdateTilePositions: function (reloadAll) {
                if (reloadAll === void 0) { reloadAll = false; }
                var gridSize = this.Viewport.GridSize;
                var mapPosition = this.Viewport.GetTopLeftGridCoord();
                var offset = this.Viewport.GetTopLeftPixelOffset();
                var tilePixelSize = this.Viewport.GetTileSizePixel();
                var xCount = this.GetTileCountX();
                var yCount = this.GetTileCountY();

                for (var y = 0; y < yCount; y = (y + 1) | 0) {
                    for (var x = 0; x < xCount; x = (x + 1) | 0) {
                        if (reloadAll) {
                            this.tileGrid.getItem(y).getItem(x).NeedReload = true;
                        }
                        this.UpdateTilePosition(mapPosition, gridSize, x, y, tilePixelSize, offset);
                    }
                }
            },
            UpdateTilePosition: function (mapPosition, gridSize, x, y, tilePixelSize, offset) {
                if (y < 0 || y >= this.tileGrid.Count || x < 0 || x > this.tileGrid.getItem(y).Count || offset == null) {
                    return;
                }
                var t = this.tileGrid.getItem(y).getItem(x);
                if (t == null) {
                    return;
                }
                this.tileGrid.getItem(y).getItem(x).UpdateTile(mapPosition, x, y, gridSize);
                var position = FantasyMapProject.Vec2d.op_Implicit(new FantasyMapProject.Vec2d.$ctor3(Bridge.Int.mul(x, tilePixelSize), Bridge.Int.mul(y, tilePixelSize)));
                position = FantasyMapProject.Vec2i.op_Addition(position, offset);
                t.SetPixelPosition(position, new FantasyMapProject.Vec2i.$ctor3(tilePixelSize));
                if (t.NeedReload) {
                    t.LoadImage(this.GetImagePath(t.GridPosition.x, t.GridPosition.y));
                    t.NeedReload = false;
                }
            },
            GetImagePath: function (x, y) {
                var zoom = Bridge.Int.clip32(this.Viewport.Zoom);
                if (this.CurrentSettings.LayerInfos == null || this.CurrentSettings.LayerInfos.Count <= zoom) {
                    return null;
                }
                var tileCountFactor = Bridge.Int.clip32(Math.pow(2, zoom));
                var wrappedX = FantasyMapProject.Utility.Wrap$1(x, 0, Bridge.Int.mul(this.CurrentSettings.LayerInfos.getItem(0).DimensionX, tileCountFactor));
                var wrappedY = FantasyMapProject.Utility.Wrap$1(y, 0, Bridge.Int.mul(this.CurrentSettings.LayerInfos.getItem(0).DimensionY, tileCountFactor));
                if (wrappedX >= this.CurrentSettings.LayerInfos.getItem(zoom).DimensionX || wrappedY >= this.CurrentSettings.LayerInfos.getItem(zoom).DimensionY) {
                    return "";
                }
                var id = (((((Bridge.Int.mul(wrappedY, this.CurrentSettings.LayerInfos.getItem(zoom).DimensionX) + wrappedX) | 0) + 1) | 0));
                var path = "img/Layer" + zoom + "/tile_";
                path = (path || "") + ((id < 10 ? "0" : "") || "");
                path = (path || "") + id;
                path = (path || "") + ".jpg";
                return path;
            }
        }
    });

    Bridge.define("Map.MapManager.Settings", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new Map.MapManager.Settings(); }
            }
        },
        fields: {
            ImagePrefab: null,
            LayerInfos: null,
            TileSize: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3889943484, this.ImagePrefab, this.LayerInfos, this.TileSize]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, Map.MapManager.Settings)) {
                    return false;
                }
                return Bridge.equals(this.ImagePrefab, o.ImagePrefab) && Bridge.equals(this.LayerInfos, o.LayerInfos) && Bridge.equals(this.TileSize, o.TileSize);
            },
            $clone: function (to) {
                var s = to || new Map.MapManager.Settings();
                s.ImagePrefab = this.ImagePrefab;
                s.LayerInfos = this.LayerInfos;
                s.TileSize = this.TileSize;
                return s;
            }
        }
    });

    Bridge.define("Map.MapTile", {
        fields: {
            Image: null,
            GridPosition: null,
            NeedReload: false
        },
        ctors: {
            ctor: function (image) {
                this.$initialize();
                this.Image = image;
                this.GridPosition = new FantasyMapProject.Vec2i.ctor();
            }
        },
        methods: {
            LoadImage: function (filename) {
                if (this.Image == null) {
                    return;
                }
                this.Image.FantasyMapProject$IMapTileImage$Load(filename);
            },
            UpdateTile: function (mapPosition, x, y, gridSize) {
                if (this.GridPosition == null) {
                    this.GridPosition = new FantasyMapProject.Vec2i.ctor();
                }
                this.GridPosition.x = FantasyMapProject.Utility.Wrap$1(((x + mapPosition.x) | 0), 0, gridSize.x);
                this.GridPosition.y = FantasyMapProject.Utility.Wrap$1(((y + mapPosition.y) | 0), 0, gridSize.y);
                this.Image.FantasyMapProject$IMapTileImage$GridPosition = this.GridPosition;
                this.Image.FantasyMapProject$IMapTileImage$MapPosition = mapPosition;
                this.NeedReload = true;
            },
            SetPixelPosition: function (position, renderSize) {
                if (this.Image == null) {
                    return;
                }
                this.Image.FantasyMapProject$IMapTileImage$PixelPosition = position;
                this.Image.FantasyMapProject$IMapTileImage$PixelRenderSize = renderSize;
                this.Image.FantasyMapProject$IMapTileImage$Draw();
            }
        }
    });

    Bridge.define("Map.MapViewport", {
        fields: {
            TopLeftNorm: null,
            GridSize: null,
            Zoom: 0,
            PixelWidth: 0,
            PixelHeight: 0,
            BaseTilePixelSize: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.TopLeftNorm = new FantasyMapProject.Vec2d.ctor();
                this.GridSize = new FantasyMapProject.Vec2i.ctor();
            }
        },
        methods: {
            TranslateNorm: function (normOffset) {
                this.TopLeftNorm = FantasyMapProject.Vec2d.op_Addition(this.TopLeftNorm, normOffset);
                this.TopLeftNorm.x = FantasyMapProject.Utility.Wrap(this.TopLeftNorm.x, 0.0, 1.0);
                this.TopLeftNorm.y = FantasyMapProject.Utility.Wrap(this.TopLeftNorm.y, 0.0, 1.0);
            },
            TranslatePixel: function (pixelOffset) {
                this.TranslateNorm(new FantasyMapProject.Vec2d.$ctor3(this.PixelToNormX(pixelOffset.x), this.PixelToNormY(pixelOffset.y)));
            },
            GetCenterNorm: function () {
                if (this.TopLeftNorm == null) {
                    return null;
                }

                var center = FantasyMapProject.Vec2d.op_Addition(this.TopLeftNorm, new FantasyMapProject.Vec2d.$ctor3(this.GetWidthNorm() / 2, this.GetHeightNorm() / 2));
                return new FantasyMapProject.Vec2d.$ctor3(FantasyMapProject.Utility.Wrap(center.x, 0.0, 1.0), FantasyMapProject.Utility.Wrap(center.y, 0.0, 1.0));
            },
            GetTopLeftGridCoord: function () {
                var tileSize = this.GetTileSizeNorm();
                if (this.TopLeftNorm == null || tileSize == null) {
                    return null;
                }

                return new FantasyMapProject.Vec2i.$ctor2(this.TopLeftNorm.x / tileSize.x, this.TopLeftNorm.y / tileSize.y);
            },
            GetTopLeftPixelOffset: function (wrap) {
                if (wrap === void 0) { wrap = true; }
                var tileSizeNorm = this.GetTileSizeNorm();
                var topLeftGrid = FantasyMapProject.Vec2i.op_Implicit(this.GetTopLeftGridCoord());
                var tilePixelSize = this.GetTileSizePixel();
                if (tileSizeNorm == null || this.TopLeftNorm == null || topLeftGrid == null || this.GridSize == null) {
                    return null;
                }
                var x = Bridge.Int.clip32((topLeftGrid.x * tileSizeNorm.x - this.TopLeftNorm.x) * tilePixelSize * this.GridSize.x);
                var y = Bridge.Int.clip32((topLeftGrid.y * tileSizeNorm.y - this.TopLeftNorm.y) * tilePixelSize * this.GridSize.y);
                return new FantasyMapProject.Vec2i.$ctor4(x, y);
            },
            GetNormToPixelCoord: function (normCoord) {
                var tileSizePixel = this.GetTileSizePixel();
                if (this.TopLeftNorm == null) {
                    return null;
                }

                return new FantasyMapProject.Vec2i.$ctor2((normCoord.x - this.TopLeftNorm.x) * tileSizePixel * this.GridSize.x, (normCoord.y - this.TopLeftNorm.y) * tileSizePixel * this.GridSize.y);
            },
            GetTileSizeNorm: function () {
                if (this.GridSize == null) {
                    return null;
                }

                return new FantasyMapProject.Vec2d.$ctor3(1.0 / this.GridSize.x, 1.0 / this.GridSize.y);
            },
            GetWidthNorm: function () {
                var tileSizeNorm = this.GetTileSizeNorm();
                if (tileSizeNorm == null) {
                    return 0.0;
                }

                return (((Bridge.Int.div(this.PixelWidth, this.GetTileSizePixel())) | 0)) * tileSizeNorm.x;
            },
            GetHeightNorm: function () {
                var tileSizeNorm = this.GetTileSizeNorm();
                if (tileSizeNorm == null) {
                    return 0.0;
                }

                return (((Bridge.Int.div(this.PixelHeight, this.GetTileSizePixel())) | 0)) * tileSizeNorm.y;
            },
            GetTileSizePixel: function () {
                return Bridge.Int.clip32(Bridge.Math.round(((Bridge.Int.div(this.BaseTilePixelSize, 2)) | 0) + (((Bridge.Int.div(this.BaseTilePixelSize, 2)) | 0)) * (this.Zoom - Bridge.Int.clip32(this.Zoom)), 0, 6));
            },
            PixelToNormX: function (pixel) {
                var tileSizeNorm = this.GetTileSizeNorm();
                if (pixel === 0 || tileSizeNorm == null) {
                    return 0.0;
                }

                return (pixel / this.GetTileSizePixel()) * tileSizeNorm.x;
            },
            PixelToNormY: function (pixel) {
                var tileSizeNorm = this.GetTileSizeNorm();
                if (pixel === 0 || tileSizeNorm == null) {
                    return 0.0;
                }

                return (pixel / this.GetTileSizePixel()) * tileSizeNorm.y;
            }
        }
    });

    Bridge.define("Web.App", {
        statics: {
            fields: {
                ZOOM_SPEED: 0
            },
            ctors: {
                init: function () {
                    this.ZOOM_SPEED = 0.05;
                }
            }
        },
        fields: {
            canvasScreen: null,
            ctx: null,
            Map: null,
            LastMousePos: null
        },
        ctors: {
            ctor: function (screen) {
                this.$initialize();
                this.canvasScreen = screen;
                this.ctx = screen.getContext("2d");
                this.ctx.imageSmoothingEnabled = true;
                this.LastMousePos = new FantasyMapProject.Vec2i.ctor();

                window.addEventListener("resize", Bridge.fn.cacheBind(this, this.OnSizeChanged));
                screen.addEventListener("wheel", Bridge.fn.cacheBind(this, this.OnMouseWheel));
                screen.addEventListener("mousedown", Bridge.fn.cacheBind(this, this.OnMouseDown));
                screen.addEventListener("mouseup", Bridge.fn.cacheBind(this, this.OnMouseUp));
                screen.addEventListener("mousemove", Bridge.fn.cacheBind(this, this.OnMouseMove));

                this.ReadLayerInfos();
            }
        },
        methods: {
            ReadLayerInfos: function () {
                var xmlRequest = new XMLHttpRequest();
                xmlRequest.onreadystatechange = Bridge.fn.combine(xmlRequest.onreadystatechange, Bridge.fn.bind(this, function () {
                    var $t;
                    if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                        var layerInfos = new (System.Collections.Generic.List$1(FantasyMapProject.LayerInfo)).ctor();
                        var root = xmlRequest.responseXML.getElementsByTagName("LayerInfo");
                        var elements = xmlRequest.responseXML.getElementsByTagName("Layer");
                        var i = 0;
                        $t = Bridge.getEnumerator(elements, "getEnumerator");
                        try {
                            while ($t.moveNext()) {
                                var child = $t.Current;
                                if (child == null) {
                                    break;
                                }
                                var dimensionX = System.Int32.parse(child.getAttribute("DimensionX"));
                                var dimensionY = System.Int32.parse(child.getAttribute("DimensionY"));
                                layerInfos.add(new FantasyMapProject.LayerInfo(i, dimensionX, dimensionY));
                                i = (i + 1) | 0;
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }

                        var mapSettings = new Map.MapManager.Settings();
                        mapSettings.ImagePrefab = new Web.WebMapTileImage();
                        mapSettings.LayerInfos = layerInfos;
                        mapSettings.TileSize = System.Int32.parse(root[0].getAttribute("TileSize"));
                        this.Map = new Map.MapManager(mapSettings.$clone(), Bridge.fn.cacheBind(this, this.AddToCanvas), Bridge.fn.cacheBind(this, this.RemoveFromCanvas), Bridge.fn.cacheBind(this, this.DrawOnCanvas));
                    }
                }));
                var docUrl = document.URL;
                docUrl = docUrl.substr(0, docUrl.lastIndexOf(String.fromCharCode(47)));
                xmlRequest.open("GET", (docUrl || "") + "/img/LayerInfo.xml", false);
                xmlRequest.overrideMimeType("text/xml");
                xmlRequest.send();
            },
            AddToCanvas: function (sender, e) { },
            RemoveFromCanvas: function (sender, e) {
                if (sender != null && Bridge.is(sender, Web.WebMapTileImage)) {
                    var tile = Bridge.as(sender, Web.WebMapTileImage);
                    tile.Image.remove();
                }
            },
            DrawOnCanvas: function (sender, e) {
                if (sender != null && Bridge.is(sender, Web.WebMapTileImage)) {
                    var tile = Bridge.as(sender, Web.WebMapTileImage);
                    this.ctx.save();
                    this.ctx.globalAlpha = 1.0;
                    this.ctx.fillStyle = "gray";
                    this.ctx.fillRect(tile.PixelPosition.x, tile.PixelPosition.y, tile.PixelRenderSize.x, tile.PixelRenderSize.y);
                    if (tile.Visible && tile.Image.complete) {
                        this.ctx.drawImage(tile.Image, tile.PixelPosition.x, tile.PixelPosition.y, tile.PixelRenderSize.x, tile.PixelRenderSize.y);
                    }
                    this.ctx.restore();
                }
            },
            CalculateResize: function () {
                var devPx = 0;
                devPx = window.devicePixelRatio;
                this.canvasScreen.width = Bridge.Int.clip32(Bridge.Math.round(window.innerWidth * devPx, 0, 6));
                this.canvasScreen.height = Bridge.Int.clip32(Bridge.Math.round(window.innerHeight * devPx, 0, 6));
                if (this.Map != null) {
                    this.Map.ChangeSize(new FantasyMapProject.Vec2i.$ctor4(this.canvasScreen.width, this.canvasScreen.height));
                }
            },
            OnSizeChanged: function (e) {
                this.CalculateResize();
            },
            OnMouseWheel: function (e) {
                if (this.Map != null && Bridge.is(e, MouseEvent) && Bridge.is(e, WheelEvent)) {
                    var we = Bridge.cast(e, WheelEvent);
                    this.Map.ZoomMap(this.LastMousePos.x, this.LastMousePos.y, we.deltaY > 0 ? -0.05 : Web.App.ZOOM_SPEED);
                }
            },
            OnMouseDown: function (e) {
                if (this.Map != null && Bridge.is(e, MouseEvent) && Bridge.is(e, MouseEvent)) {
                    var me = Bridge.cast(e, MouseEvent);
                    this.Map.OnPress(me.clientX, me.clientY);
                }
            },
            OnMouseUp: function (e) {
                if (this.Map != null && Bridge.is(e, MouseEvent) && Bridge.is(e, MouseEvent)) {
                    this.Map.OnRelease();
                }
            },
            OnMouseMove: function (e) {
                if (this.Map != null && Bridge.is(e, MouseEvent) && Bridge.is(e, MouseEvent)) {
                    var me = Bridge.cast(e, MouseEvent);
                    this.LastMousePos.Set(me.clientX, me.clientY);
                    this.Map.OnMove(me.clientX, me.clientY);
                }
            }
        }
    });

    Bridge.define("Web.WebMapTileImage", {
        inherits: [FantasyMapProject.IMapTileImage],
        fields: {
            GridPosition: null,
            MapPosition: null,
            PixelPosition: null,
            PixelRenderSize: null,
            Image: null,
            Visible: false
        },
        events: {
            OnInitialize: null,
            OnRemove: null,
            OnDraw: null
        },
        alias: [
            "GridPosition", "FantasyMapProject$IMapTileImage$GridPosition",
            "MapPosition", "FantasyMapProject$IMapTileImage$MapPosition",
            "PixelPosition", "FantasyMapProject$IMapTileImage$PixelPosition",
            "PixelRenderSize", "FantasyMapProject$IMapTileImage$PixelRenderSize",
            "addOnInitialize", "FantasyMapProject$IMapTileImage$addOnInitialize",
            "removeOnInitialize", "FantasyMapProject$IMapTileImage$removeOnInitialize",
            "addOnRemove", "FantasyMapProject$IMapTileImage$addOnRemove",
            "removeOnRemove", "FantasyMapProject$IMapTileImage$removeOnRemove",
            "addOnDraw", "FantasyMapProject$IMapTileImage$addOnDraw",
            "removeOnDraw", "FantasyMapProject$IMapTileImage$removeOnDraw",
            "Initialize", "FantasyMapProject$IMapTileImage$Initialize",
            "Remove", "FantasyMapProject$IMapTileImage$Remove",
            "Draw", "FantasyMapProject$IMapTileImage$Draw",
            "Load", "FantasyMapProject$IMapTileImage$Load",
            "GetType", "FantasyMapProject$IMapTileImage$GetType"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Image = new Image();
                this.Image.onload = Bridge.fn.combine(this.Image.onload, Bridge.fn.bind(this, function (e) {
                    !Bridge.staticEquals(this.OnDraw, null) ? this.OnDraw(this, { }) : null;
                }));
            }
        },
        methods: {
            Initialize: function () {
                !Bridge.staticEquals(this.OnInitialize, null) ? this.OnInitialize(this, { }) : null;
            },
            Remove: function () {
                !Bridge.staticEquals(this.OnRemove, null) ? this.OnRemove(this, { }) : null;
            },
            Draw: function () { },
            Load: function (filename) {
                this.Image.src = filename;
                this.Visible = !System.String.isNullOrEmpty(filename);
            },
            GetType: function () {
                return Bridge.getType(this);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYW50YXN5TWFwUHJvamVjdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiLi4vQ29tbW9uL01hcC9MYXllckluZm8uY3MiLCJzcmMvUHJvZ3JhbS5jcyIsIi4uL0NvbW1vbi9VdGlsaXR5L1V0aWxpdHkuY3MiLCIuLi9Db21tb24vVXRpbGl0eS9WZWMyZC5jcyIsIi4uL0NvbW1vbi9VdGlsaXR5L1ZlYzJpLmNzIiwiLi4vQ29tbW9uL01hcC9NYXBNYW5hZ2VyLmNzIiwiLi4vQ29tbW9uL01hcC9NYXBUaWxlLmNzIiwiLi4vQ29tbW9uL01hcC9NYXBWaWV3cG9ydC5jcyIsInNyYy9BcHAuY3MiLCJzcmMvV2ViTWFwVGlsZUltYWdlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQVF5QkEsTUFBVUEsWUFBZ0JBOztnQkFFdkNBLFlBQU9BO2dCQUNQQSxrQkFBYUE7Z0JBQ2JBLGtCQUFhQTs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQ2JBO29CQUNBQSxtQ0FBU0E7O29CQUVUQSwwQkFBMEJBOztvQkFFMUJBLFVBQVVBLElBQUlBLFFBQUlBO29CQUNsQkE7Ozs7b0JBT0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLCtCQUErQkE7Ozs7Ozs7Ozs7a0NDdEJsQkEsT0FBV0EsTUFBVUE7OztvQkFFM0NBLElBQUlBLFdBQVFBO3dCQUFJQSxPQUFPQTs7b0JBQ3ZCQSxJQUFJQSxTQUFPQTt3QkFFVkEsaUNBQVNBLE1BQVVBOztvQkFHcEJBLElBQUlBLFFBQVFBO3dCQUVYQSxPQUFPQSxTQUFLQSxDQUFDQSxXQUFPQSxlQUFTQSxDQUFDQSxTQUFLQTs7d0JBSW5DQSxPQUFPQSxXQUFPQSxDQUFDQSxVQUFRQSxnQkFBUUEsQ0FBQ0EsU0FBS0E7OztnQ0FJYkEsT0FBY0EsTUFBYUE7OztvQkFFcERBLElBQUlBLFdBQVFBO3dCQUFJQSxPQUFPQTs7b0JBRXZCQSxJQUFJQSxTQUFPQTt3QkFF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QUVQQSxvQkFBZUEsSUFBSUEsK0JBQU1BLHlCQUFvQkE7OztxQ0FJMUJBO2dCQUV2QkE7O29DQUdzQkE7Z0JBRXRCQSxJQUFJQSxZQUFPQSxRQUFRQSw0QkFBb0JBO29CQUVuQ0EsU0FBU0EsWUFBWUE7b0JBQ3JCQSxpQkFBWUEscUJBQWdCQSxxQkFBZ0JBLGdCQUFnQkEsUUFBY0E7OzttQ0FJekRBO2dCQUVyQkEsSUFBSUEsWUFBT0EsUUFBUUEsNEJBQW9CQTtvQkFFbkNBLFNBQVNBLFlBQVlBO29CQUNyQkEsaUJBQVlBLFlBQVlBOzs7aUNBSVRBO2dCQUVuQkEsSUFBSUEsWUFBT0EsUUFBUUEsNEJBQW9CQTtvQkFFbkNBOzs7bUNBSWlCQTtnQkFFckJBLElBQUlBLFlBQU9BLFFBQVFBLDRCQUFvQkE7b0JBRW5DQSxTQUFTQSxZQUFZQTtvQkFDckJBLHNCQUFpQkEsWUFBWUE7b0JBQzdCQSxnQkFBV0EsWUFBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQ3RJM0JBLGFBQVFBO2dCQUNSQSx5REFBZ0JBLCtCQUFDQTtvQkFFYkEsa0NBQVFBLFFBQUtBLEFBQXFDQSxZQUFjQSxNQUFNQSxPQUFrQkE7Ozs7OztnQkFNNUZBLHdDQUFjQSxRQUFLQSxBQUFxQ0Esa0JBQW9CQSxNQUFNQSxPQUFrQkE7OztnQkFLcEdBLG9DQUFVQSxRQUFLQSxBQUFxQ0EsY0FBZ0JBLE1BQU1BLE9BQWtCQTs7OzRCQVEvRUE7Z0JBRWJBLGlCQUFZQTtnQkFDWkEsZUFBVUEsQ0FBQ0EsNEJBQXFCQTs7O2dCQUtoQ0EsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsibmFtZXNwYWNlIEZhbnRhc3lNYXBQcm9qZWN0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBMYXllckluZm9cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IFpvb20geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBEaW1lbnNpb25YIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgRGltZW5zaW9uWSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIExheWVySW5mbyhpbnQgem9vbSwgaW50IGRpbWVuc2lvblgsIGludCBkaW1lbnNpb25ZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWm9vbSA9IHpvb207XHJcbiAgICAgICAgICAgIERpbWVuc2lvblggPSBkaW1lbnNpb25YO1xyXG4gICAgICAgICAgICBEaW1lbnNpb25ZID0gZGltZW5zaW9uWTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgV2ViO1xuXG5uYW1lc3BhY2UgRmFudGFzeU1hcFByb2plY3RcbntcbiAgICBjbGFzcyBQcm9ncmFtXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBIVE1MQ2FudmFzRWxlbWVudCBjYW52YXM7XG5cbiAgICAgICAgW1JlYWR5XVxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJlc2V0QnJvd3NlckZyYW1lKCk7XG4gICAgICAgICAgICBjYW52YXMgPSBuZXcgSFRNTENhbnZhc0VsZW1lbnQoKTtcblxuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5BcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gICAgICAgICAgICB2YXIgYXBwID0gbmV3IEFwcChjYW52YXMpO1xuICAgICAgICAgICAgYXBwLkNhbGN1bGF0ZVJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAvL1NjcmlwdC5DYWxsKFwiaW5pdF9zZXJ2aWNld29ya2VyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZXNldEJyb3dzZXJGcmFtZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuTWFyZ2luID0gXCIwXCI7XG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlN0eWxlLlBhZGRpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuSGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LlN0eWxlLk92ZXJmbG93ID0gT3ZlcmZsb3cuSGlkZGVuO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEZhbnRhc3lNYXBQcm9qZWN0XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVXRpbGl0eVxyXG5cdHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgaW50IFdyYXAoaW50IHZhbHVlLCBpbnQgZnJvbSwgaW50IHRvKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoZnJvbSA9PSB0bykgcmV0dXJuIGZyb207XHJcblx0XHRcdGlmIChmcm9tID4gdG8pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRTd2FwKHJlZiBmcm9tLCByZWYgdG8pO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGFsZ29yaXRobSBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNDQxNjEzM1xyXG5cdFx0XHRpZiAodmFsdWUgPCBmcm9tKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIHRvIC0gKGZyb20gLSB2YWx1ZSkgJSAodG8gLSBmcm9tKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gZnJvbSArICh2YWx1ZSAtIGZyb20pICUgKHRvIC0gZnJvbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIGRvdWJsZSBXcmFwKGRvdWJsZSB2YWx1ZSwgZG91YmxlIGZyb20sIGRvdWJsZSB0bylcclxuXHRcdHtcclxuXHRcdFx0aWYgKGZyb20gPT0gdG8pIHJldHVybiBmcm9tO1xyXG5cdFx0XHQvLyBhbGdvcml0aG0gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81ODUyNjI4LzU5OTg4NFxyXG5cdFx0XHRpZiAoZnJvbSA+IHRvKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0U3dhcChyZWYgZnJvbSwgcmVmIHRvKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkb3VibGUgY3ljbGUgPSB0byAtIGZyb207XHJcblx0XHRcdGlmIChjeWNsZSA9PSAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIHRvO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWx1ZSAtIGN5Y2xlICogU3lzdGVtLk1hdGguRmxvb3IoKHZhbHVlIC0gZnJvbSkgLyBjeWNsZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgdm9pZCBTd2FwKHJlZiBpbnQgYSwgcmVmIGludCBiKVxyXG5cdFx0e1xyXG5cdFx0XHRkb3VibGUgdG1wID0gYTtcclxuXHRcdFx0YSA9IGI7XHJcblx0XHRcdGIgPSBhO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc3RhdGljIHZvaWQgU3dhcChyZWYgZG91YmxlIGEsIHJlZiBkb3VibGUgYilcclxuXHRcdHtcclxuXHRcdFx0ZG91YmxlIHRtcCA9IGE7XHJcblx0XHRcdGEgPSBiO1xyXG5cdFx0XHRiID0gYTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIGludCBDbGFtcChpbnQgdmFsdWUsIGludCBtaW4sIGludCBtYXgpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiAoKHZhbHVlKSA8IChtaW4pID8gKG1pbikgOiAoKHZhbHVlID4gbWF4KSA/IChtYXgpIDogKHZhbHVlKSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgZG91YmxlIENsYW1wKGRvdWJsZSB2YWx1ZSwgZG91YmxlIG1pbiwgZG91YmxlIG1heClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuICgodmFsdWUpIDwgKG1pbikgPyAobWluKSA6ICgodmFsdWUgPiBtYXgpID8gKG1heCkgOiAodmFsdWUpKSk7XHJcblx0XHR9XHJcbnB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8VD4gUm90YXRlTGVmdDxUPih0aGlzIElFbnVtZXJhYmxlPFQ+IGUsIGludCBuKVxyXG57XHJcbiAgICByZXR1cm4gbiA+PSAwID8gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPFQ+KGUsbikuQ29uY2F0KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVGFrZTxUPihlLG4pKSA6IEZhbnRhc3lNYXBQcm9qZWN0LlV0aWxpdHkuUm90YXRlUmlnaHQ8VD4oZSwtbik7XHJcbn1wdWJsaWMgc3RhdGljIElFbnVtZXJhYmxlPFQ+IFJvdGF0ZVJpZ2h0PFQ+KHRoaXMgSUVudW1lcmFibGU8VD4gZSwgaW50IG4pXHJcbntcclxuICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlJldmVyc2U8VD4oRmFudGFzeU1hcFByb2plY3QuVXRpbGl0eS5Sb3RhdGVMZWZ0PFQ+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuUmV2ZXJzZTxUPihlKSxuKSk7XHJcbn1cdH1cclxufVxyXG4iLCJuYW1lc3BhY2UgRmFudGFzeU1hcFByb2plY3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFZlYzJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSB4O1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgeTtcclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldCgwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyZChkb3VibGUgc2NhbGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0KHNjYWxhciwgc2NhbGFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyZChkb3VibGUgeCwgZG91YmxlIHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmQoVmVjMmkgdmVjKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHZlYyA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXQoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgU2V0KHZlYy54LCB2ZWMueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXQoZG91YmxlIHgsIGRvdWJsZSB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyZCBTY2FsZShWZWMyZCB2ZWMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmVjID09IG51bGwpIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJkKHggKiB2ZWMueCwgeSAqIHZlYy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmQgb3BlcmF0b3IgKyhWZWMyZCBhLCBWZWMyZCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuIChiID09IG51bGwpID8gbnVsbCA6IG5ldyBWZWMyZChiKTtcclxuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgcmV0dXJuIG5ldyBWZWMyZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChhLnggKyBiLngsIGEueSArIGIueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlYzJkIG9wZXJhdG9yIC0oVmVjMmQgYSkgeyByZXR1cm4gYSAqIC0xOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyZCBvcGVyYXRvciAtKFZlYzJkIGEsIFZlYzJkIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm4gKGIgPT0gbnVsbCkgPyBudWxsIDogbmV3IFZlYzJkKGIpO1xyXG4gICAgICAgICAgICBpZiAoYiA9PSBudWxsKSByZXR1cm4gbmV3IFZlYzJkKGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJkKGEueCAtIGIueCwgYS55IC0gYi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmQgb3BlcmF0b3IgKihkb3VibGUgZmFjdG9yLCBWZWMyZCBhKSB7IHJldHVybiBhICogZmFjdG9yOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyZCBvcGVyYXRvciAqKFZlYzJkIGEsIGRvdWJsZSBmYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChhLnggKiBmYWN0b3IsIGEueSAqIGZhY3Rvcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyZCBvcGVyYXRvciAvKFZlYzJkIGEsIGRvdWJsZSBkaXZpc29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChhLnggLyBkaXZpc29yLCBhLnkgLyBkaXZpc29yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgVmVjMmkoVmVjMmQgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoKGludClhLngsIChpbnQpYS55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwieDogXCIgKyB4LlRvU3RyaW5nKFwiTjNcIikgKyBcIiAvIHk6IFwiICsgeS5Ub1N0cmluZyhcIk4zXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgRmFudGFzeU1hcFByb2plY3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFZlYzJpXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCB4O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgeTtcclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJpKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldCgwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaShpbnQgc2NhbGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0KHNjYWxhciwgc2NhbGFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaShpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmkoZG91YmxlIHgsIGRvdWJsZSB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0KChpbnQpeCwgKGludCl5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaShWZWMyZCB2ZWMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmVjID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldCgwLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTZXQoKGludCl2ZWMueCwgKGludCl2ZWMueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaSBTY2FsZShWZWMyaSB2ZWMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmVjID09IG51bGwpIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJpKHggKiB2ZWMueCwgeSAqIHZlYy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmkgb3BlcmF0b3IgKyhWZWMyaSBhLCBWZWMyaSBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuIChiID09IG51bGwpID8gbnVsbCA6IG5ldyBWZWMyaShiKTtcclxuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgcmV0dXJuIG5ldyBWZWMyaShhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyaShhLnggKyBiLngsIGEueSArIGIueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlYzJpIG9wZXJhdG9yIC0oVmVjMmkgYSkgeyByZXR1cm4gYSAqIC0xOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyaSBvcGVyYXRvciAtKFZlYzJpIGEsIFZlYzJpIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm4gKGIgPT0gbnVsbCkgPyBudWxsIDogbmV3IFZlYzJpKGIpO1xyXG4gICAgICAgICAgICBpZiAoYiA9PSBudWxsKSByZXR1cm4gbmV3IFZlYzJpKGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJpKGEueCAtIGIueCwgYS55IC0gYi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmkgb3BlcmF0b3IgKihkb3VibGUgZmFjdG9yLCBWZWMyaSBhKSB7IHJldHVybiBhICogZmFjdG9yOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyaSBvcGVyYXRvciAqKFZlYzJpIGEsIGRvdWJsZSBmYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyaShhLnggKiBmYWN0b3IsIGEueSAqIGZhY3Rvcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyaSBvcGVyYXRvciAvKFZlYzJpIGEsIGRvdWJsZSBkaXZpc29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyaShhLnggLyBkaXZpc29yLCBhLnkgLyBkaXZpc29yKTtcclxuICAgICAgICB9XHJcblxyXG5cdCAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIFZlYzJkKFZlYzJpIGEpXHJcblx0ICAgIHtcclxuXHRcdCAgICByZXR1cm4gbmV3IFZlYzJkKGEueCwgYS55KTtcclxuXHQgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIng6IFwiICsgeCArIFwiIC8geTogXCIgKyB5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBGYW50YXN5TWFwUHJvamVjdDtcclxuXHJcbm5hbWVzcGFjZSBNYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1hcE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RydWN0IFNldHRpbmdzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgSU1hcFRpbGVJbWFnZSBJbWFnZVByZWZhYjtcclxuICAgICAgICAgICAgcHVibGljIExpc3Q8TGF5ZXJJbmZvPiBMYXllckluZm9zO1xyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFRpbGVTaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlciBPblRpbGVDcmVhdGVkO1xyXG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXIgT25UaWxlUmVtb3ZlZDtcclxuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyIE9uVGlsZURyYXc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZXR0aW5ncyBDdXJyZW50U2V0dGluZ3MgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgTWluWm9vbVxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIGdldCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zID09IG51bGwgPyAtMSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGludCBNYXhab29tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zID09IG51bGwgPyAtMSA6IEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zLkNvdW50IC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1hcFZpZXdwb3J0IFZpZXdwb3J0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8TGlzdDxNYXBUaWxlPj4gdGlsZUdyaWQ7IC8vIGxpc3Qgb2Ygcm93cywgcm93ID0gbGlzdCBvZiB0aWxlc1xyXG4gICAgICAgIHByaXZhdGUgVmVjMmQgbGFzdE1vdXNlUG9zaXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGlzTW91c2VQcmVzc2VkO1xyXG5cclxuICAgICAgICBwdWJsaWMgTWFwTWFuYWdlcihTZXR0aW5ncyBzZXR0aW5ncywgRXZlbnRIYW5kbGVyIG9uVGlsZUNyZWF0ZWQsIEV2ZW50SGFuZGxlciBvblRpbGVSZW1vdmVkLCBFdmVudEhhbmRsZXIgb25UaWxlRHJhdylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRTZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBWaWV3cG9ydCA9IG5ldyBNYXBWaWV3cG9ydCgpO1xyXG4gICAgICAgICAgICBWaWV3cG9ydC5CYXNlVGlsZVBpeGVsU2l6ZSA9IHNldHRpbmdzLlRpbGVTaXplO1xyXG4gICAgICAgICAgICB0aWxlR3JpZCA9IG5ldyBMaXN0PExpc3Q8TWFwVGlsZT4+KCk7XHJcbiAgICAgICAgICAgIE9uVGlsZUNyZWF0ZWQgPSBvblRpbGVDcmVhdGVkO1xyXG4gICAgICAgICAgICBPblRpbGVSZW1vdmVkID0gb25UaWxlUmVtb3ZlZDtcclxuICAgICAgICAgICAgT25UaWxlRHJhdyA9IG9uVGlsZURyYXc7XHJcbiAgICAgICAgICAgIFZpZXdwb3J0Llpvb20gPSAoTWF4Wm9vbSArIDEpIC8gMjtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLkxheWVySW5mb3MgIT0gbnVsbCAmJiBzZXR0aW5ncy5MYXllckluZm9zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHpvb20gPSAoaW50KVZpZXdwb3J0Llpvb207XHJcbiAgICAgICAgICAgICAgICBpbnQgdGlsZUNvdW50RmFjdG9yID0gKGludClNYXRoLlBvdygyLCB6b29tKTtcclxuICAgICAgICAgICAgICAgIFZpZXdwb3J0LkdyaWRTaXplLlNldChzZXR0aW5ncy5MYXllckluZm9zWzBdLkRpbWVuc2lvblggKiB0aWxlQ291bnRGYWN0b3IsIHNldHRpbmdzLkxheWVySW5mb3NbMF0uRGltZW5zaW9uWSAqIHRpbGVDb3VudEZhY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFzdE1vdXNlUG9zaXRpb24gPSBuZXcgVmVjMmkoKTtcclxuICAgICAgICAgICAgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENoYW5nZVNpemUoVmVjMmkgc2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZpZXdwb3J0LlBpeGVsV2lkdGggPSBzaXplLng7XHJcbiAgICAgICAgICAgIFZpZXdwb3J0LlBpeGVsSGVpZ2h0ID0gc2l6ZS55O1xyXG5cclxuICAgICAgICAgICAgUmVjYWxjdWxhdGVWaWV3cG9ydFRpbGVDb3VudCgpO1xyXG4gICAgICAgICAgICBVcGRhdGVUaWxlUG9zaXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVjYWxjdWxhdGVWaWV3cG9ydFRpbGVDb3VudCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRpbGVHcmlkID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpbGVHcmlkID0gbmV3IExpc3Q8TGlzdDxNYXBUaWxlPj4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW50IHhDb3VudCA9IChpbnQpTWF0aC5DZWlsaW5nKChkb3VibGUpVmlld3BvcnQuUGl4ZWxXaWR0aCAvIFZpZXdwb3J0LkJhc2VUaWxlUGl4ZWxTaXplKSAqIDIgKyAxO1xyXG4gICAgICAgICAgICBpbnQgeUNvdW50ID0gKGludClNYXRoLkNlaWxpbmcoKGRvdWJsZSlWaWV3cG9ydC5QaXhlbEhlaWdodCAvIFZpZXdwb3J0LkJhc2VUaWxlUGl4ZWxTaXplKSAqIDIgKyAxO1xyXG4gICAgICAgICAgICBib29sIHVwZGF0ZUFsbFJvd3MgPSAodGlsZUdyaWQuQ291bnQgPD0gMCB8fCB0aWxlR3JpZFswXS5Db3VudCAhPSB4Q291bnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRpbGVHcmlkLkNvdW50IDwgeUNvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXcgcm93cyB3aWxsIGJlIGFkZGVkXHJcbiAgICAgICAgICAgICAgICBpbnQgYmVnaW5Sb3cgPSB1cGRhdGVBbGxSb3dzID8gMCA6IHRpbGVHcmlkLkNvdW50O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJlZ2luUm93OyB5IDwgeUNvdW50OyArK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbGVHcmlkLkNvdW50IDw9IHkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZC5BZGQobmV3IExpc3Q8TWFwVGlsZT4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGVHcmlkW3ldID0gUmVjYWxjdWxhdGVDb2x1bW5zKHksIHhDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyByb3dzIGF0IHRoZSBlbmQgd2lsbCBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgICAgICBpbnQgZW5kUm93ID0gdXBkYXRlQWxsUm93cyA/IDAgOiB5Q291bnQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gdGlsZUdyaWQuQ291bnQgLSAxOyB5ID49IGVuZFJvdzsgLS15KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aWxlR3JpZC5Db3VudCA+IHlDb3VudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgdGlsZUdyaWRbeV0uQ291bnQ7ICsreClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV1beF0uSW1hZ2UuUmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWQuUmVtb3ZlQXQoeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XSA9IFJlY2FsY3VsYXRlQ29sdW1ucyh5LCB4Q291bnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8TWFwVGlsZT4gUmVjYWxjdWxhdGVDb2x1bW5zKGludCB5LCBpbnQgdGFyZ2V0TGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRpbGVHcmlkW3ldLkNvdW50IDwgdGFyZ2V0TGVuZ3RoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBlbGVtZW50cyB3aWxsIGJlIGFkZGVkXHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gdGlsZUdyaWRbeV0uQ291bnQ7IHggPCB0YXJnZXRMZW5ndGg7ICsreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XS5BZGQoQ3JlYXRlTmV3VGlsZSh4LCB5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBlbGVtZW50cyBhdCB0aGUgZW5kIHdpbGwgYmUgcmVtb3ZlZFxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IHRpbGVHcmlkW3ldLkNvdW50IC0gMTsgeCA+PSB0YXJnZXRMZW5ndGg7IC0teClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XVt4XS5JbWFnZS5SZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XS5SZW1vdmVBdCh4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGlsZUdyaWRbeV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPblByZXNzKGRvdWJsZSB4LCBkb3VibGUgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhc3RNb3VzZVBvc2l0aW9uLlNldCh4LCB5KTtcclxuICAgICAgICAgICAgaXNNb3VzZVByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT25SZWxlYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzTW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPbk1vdmUoZG91YmxlIHgsIGRvdWJsZSB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFpc01vdXNlUHJlc3NlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlYzJpIG9sZEdyaWRQb3NpdGlvbiA9IFZpZXdwb3J0LkdldFRvcExlZnRHcmlkQ29vcmQoKTtcclxuICAgICAgICAgICAgVmVjMmQgZGVsdGEgPSBuZXcgVmVjMmQobGFzdE1vdXNlUG9zaXRpb24ueCAtIHgsIGxhc3RNb3VzZVBvc2l0aW9uLnkgLSB5KTtcclxuICAgICAgICAgICAgbGFzdE1vdXNlUG9zaXRpb24uU2V0KHgsIHkpO1xyXG4gICAgICAgICAgICBWaWV3cG9ydC5UcmFuc2xhdGVQaXhlbChkZWx0YSk7XHJcbiAgICAgICAgICAgIFJvdGF0ZUdyaWRBbmRVcGRhdGVUaWxlcyhWaWV3cG9ydC5HZXRUb3BMZWZ0R3JpZENvb3JkKCkgLSBvbGRHcmlkUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXBUaWxlIENyZWF0ZU5ld1RpbGUoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEN1cnJlbnRTZXR0aW5ncy5JbWFnZVByZWZhYiA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBNYXBUaWxlIHQgPSBuZXcgTWFwVGlsZShBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UoQ3VycmVudFNldHRpbmdzLkltYWdlUHJlZmFiLkdldFR5cGUoKSwgVmlld3BvcnQuQmFzZVRpbGVQaXhlbFNpemUpIGFzIElNYXBUaWxlSW1hZ2UpO1xyXG4gICAgICAgICAgICB0LkltYWdlLk9uSW5pdGlhbGl6ZSArPSBPblRpbGVDcmVhdGVkO1xyXG4gICAgICAgICAgICB0LkltYWdlLk9uUmVtb3ZlICs9IE9uVGlsZVJlbW92ZWQ7XHJcbiAgICAgICAgICAgIHQuSW1hZ2UuT25EcmF3ICs9IE9uVGlsZURyYXc7XHJcbiAgICAgICAgICAgIHQuSW1hZ2UuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICBWZWMyaSB2aWV3cG9ydFRvcExlZnRHcmlkID0gVmlld3BvcnQuR2V0VG9wTGVmdEdyaWRDb29yZCgpO1xyXG4gICAgICAgICAgICB0LkdyaWRQb3NpdGlvbi5TZXQodmlld3BvcnRUb3BMZWZ0R3JpZC54ICsgeCwgdmlld3BvcnRUb3BMZWZ0R3JpZC55ICsgeSk7XHJcbiAgICAgICAgICAgIGludCB0aWxlUGl4ZWxTaXplID0gVmlld3BvcnQuR2V0VGlsZVNpemVQaXhlbCgpO1xyXG4gICAgICAgICAgICBWZWMyaSBwb3NpdGlvbiA9IG5ldyBWZWMyZCh4ICogdGlsZVBpeGVsU2l6ZSwgeSAqIHRpbGVQaXhlbFNpemUpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbiArPSBWaWV3cG9ydC5HZXRUb3BMZWZ0UGl4ZWxPZmZzZXQoKTtcclxuICAgICAgICAgICAgdC5TZXRQaXhlbFBvc2l0aW9uKHBvc2l0aW9uLCBuZXcgVmVjMmkodGlsZVBpeGVsU2l6ZSkpO1xyXG4gICAgICAgICAgICB0LkxvYWRJbWFnZShHZXRJbWFnZVBhdGgoeCwgeSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFpvb21NYXAoZG91YmxlIHgsIGRvdWJsZSB5LCBkb3VibGUgYW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmkgb2xkR3JpZFBvc2l0aW9uID0gVmlld3BvcnQuR2V0VG9wTGVmdEdyaWRDb29yZCgpO1xyXG4gICAgICAgICAgICBWZWMyZCBtb3VzZVBvc09sZE5vcm0gPSBuZXcgVmVjMmQoVmlld3BvcnQuUGl4ZWxUb05vcm1YKChpbnQpeCksIFZpZXdwb3J0LlBpeGVsVG9Ob3JtWSgoaW50KXkpKTtcclxuICAgICAgICAgICAgZG91YmxlIG9sZFpvb20gPSBWaWV3cG9ydC5ab29tO1xyXG4gICAgICAgICAgICBWaWV3cG9ydC5ab29tICs9IGFtb3VudDtcclxuICAgICAgICAgICAgVmlld3BvcnQuWm9vbSA9IFV0aWxpdHkuQ2xhbXAoVmlld3BvcnQuWm9vbSArIGFtb3VudCwgTWluWm9vbSwgTWF4Wm9vbSArIDAuOTk5OTkpO1xyXG4gICAgICAgICAgICBpbnQgbmV3Wm9vbSA9IChpbnQpVmlld3BvcnQuWm9vbTtcclxuICAgICAgICAgICAgaWYgKChpbnQpb2xkWm9vbSAhPSBuZXdab29tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgdGlsZUNvdW50RmFjdG9yID0gKGludClNYXRoLlBvdygyLCBuZXdab29tKTtcclxuICAgICAgICAgICAgICAgIFZpZXdwb3J0LkdyaWRTaXplLlNldChDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvc1swXS5EaW1lbnNpb25YICogdGlsZUNvdW50RmFjdG9yLCBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvc1swXS5EaW1lbnNpb25ZICogdGlsZUNvdW50RmFjdG9yKTtcclxuICAgICAgICAgICAgICAgIFZlYzJkIG1vdXNlUG9zTmV3Tm9ybSA9IG5ldyBWZWMyZChWaWV3cG9ydC5QaXhlbFRvTm9ybVgoKGludCl4KSwgVmlld3BvcnQuUGl4ZWxUb05vcm1ZKChpbnQpeSkpO1xyXG4gICAgICAgICAgICAgICAgVmlld3BvcnQuVHJhbnNsYXRlTm9ybShtb3VzZVBvc09sZE5vcm0gLSBtb3VzZVBvc05ld05vcm0pO1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWxsVGlsZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlYzJkIG1vdXNlUG9zTmV3Tm9ybSA9IG5ldyBWZWMyZChWaWV3cG9ydC5QaXhlbFRvTm9ybVgoKGludCl4KSwgVmlld3BvcnQuUGl4ZWxUb05vcm1ZKChpbnQpeSkpO1xyXG4gICAgICAgICAgICAgICAgVmlld3BvcnQuVHJhbnNsYXRlTm9ybShtb3VzZVBvc09sZE5vcm0gLSBtb3VzZVBvc05ld05vcm0pO1xyXG4gICAgICAgICAgICAgICAgUm90YXRlR3JpZEFuZFVwZGF0ZVRpbGVzKFZpZXdwb3J0LkdldFRvcExlZnRHcmlkQ29vcmQoKSAtIG9sZEdyaWRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBHZXRUaWxlQ291bnRYKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aWxlR3JpZCAhPSBudWxsICYmIHRpbGVHcmlkLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbGVHcmlkWzBdLkNvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50IEdldFRpbGVDb3VudFkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbGVHcmlkICE9IG51bGwgPyB0aWxlR3JpZC5Db3VudCA6IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFJvdGF0ZUdyaWRBbmRVcGRhdGVUaWxlcyhWZWMyaSByb3RhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLkFicyhyb3RhdGlvbi54KSA+PSBHZXRUaWxlQ291bnRYKCkgfHwgTWF0aC5BYnMocm90YXRpb24ueSkgPj0gR2V0VGlsZUNvdW50WSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVBbGxUaWxlcygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocm90YXRpb24ueCA9PSAwICYmIHJvdGF0aW9uLnkgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlVGlsZVBvc2l0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBWZWMyaSBncmlkU2l6ZSA9IFZpZXdwb3J0LkdyaWRTaXplO1xyXG4gICAgICAgICAgICBWZWMyaSBtYXBQb3NpdGlvbiA9IFZpZXdwb3J0LkdldFRvcExlZnRHcmlkQ29vcmQoKTtcclxuICAgICAgICAgICAgaW50IHhDb3VudCA9IEdldFRpbGVDb3VudFgoKTtcclxuICAgICAgICAgICAgaW50IHlDb3VudCA9IEdldFRpbGVDb3VudFkoKTtcclxuXHJcbiAgICAgICAgICAgIHJvdGF0aW9uLnggPSBVdGlsaXR5LldyYXAocm90YXRpb24ueCwgLXhDb3VudCwgeENvdW50KTtcclxuICAgICAgICAgICAgcm90YXRpb24ueSA9IFV0aWxpdHkuV3JhcChyb3RhdGlvbi55LCAteUNvdW50LCB5Q291bnQpO1xyXG5GYW50YXN5TWFwUHJvamVjdC5VdGlsaXR5LlJvdGF0ZUxlZnQ8TGlzdDxNYXBUaWxlPj4oXHJcbiAgICAgICAgICAgIHRpbGVHcmlkLHJvdGF0aW9uLnkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvdGF0aW9uLnggIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCB0aWxlR3JpZC5Db3VudDsgKyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG5GYW50YXN5TWFwUHJvamVjdC5VdGlsaXR5LlJvdGF0ZUxlZnQ8TWFwVGlsZT4oICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XSxyb3RhdGlvbi54KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJvdGF0aW9uLnkgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCByb3RhdGlvbldhc0Rvd24gPSByb3RhdGlvbi55ID4gMDtcclxuICAgICAgICAgICAgICAgIGludCBiZWdpblJvdyA9IHJvdGF0aW9uV2FzRG93biA/ICh5Q291bnQgLSByb3RhdGlvbi55KSA6IDA7XHJcbiAgICAgICAgICAgICAgICBpbnQgZW5kUm93ID0gcm90YXRpb25XYXNEb3duID8geUNvdW50IDogLXJvdGF0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gYmVnaW5Sb3c7IHkgPCBlbmRSb3c7ICsreSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHhDb3VudDsgKyt4KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV1beF0uVXBkYXRlVGlsZShtYXBQb3NpdGlvbiwgeCwgeSwgZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocm90YXRpb24ueCAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBib29sIHJvdGF0aW9uV2FzUmlnaHQgPSByb3RhdGlvbi54ID4gMDtcclxuICAgICAgICAgICAgICAgIGludCBiZWdpbkNvbCA9IHJvdGF0aW9uV2FzUmlnaHQgPyAoeENvdW50IC0gcm90YXRpb24ueCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgaW50IGVuZENvbCA9IHJvdGF0aW9uV2FzUmlnaHQgPyB4Q291bnQgOiAtcm90YXRpb24ueDtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgeUNvdW50OyArK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IGJlZ2luQ29sOyB4IDwgZW5kQ29sOyArK3gpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XVt4XS5VcGRhdGVUaWxlKG1hcFBvc2l0aW9uLCB4LCB5LCBncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVwZGF0ZVRpbGVQb3NpdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVBbGxUaWxlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWMyaSBncmlkU2l6ZSA9IFZpZXdwb3J0LkdyaWRTaXplO1xyXG4gICAgICAgICAgICBWZWMyaSBtYXBQb3NpdGlvbiA9IFZpZXdwb3J0LkdldFRvcExlZnRHcmlkQ29vcmQoKTtcclxuICAgICAgICAgICAgVmVjMmkgb2Zmc2V0ID0gVmlld3BvcnQuR2V0VG9wTGVmdFBpeGVsT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIGludCB0aWxlUGl4ZWxTaXplID0gVmlld3BvcnQuR2V0VGlsZVNpemVQaXhlbCgpO1xyXG4gICAgICAgICAgICBpbnQgeENvdW50ID0gR2V0VGlsZUNvdW50WCgpO1xyXG4gICAgICAgICAgICBpbnQgeUNvdW50ID0gR2V0VGlsZUNvdW50WSgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IHlDb3VudDsgKyt5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHhDb3VudDsgKyt4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGVHcmlkW3ldW3hdLlVwZGF0ZVRpbGUobWFwUG9zaXRpb24sIHgsIHksIGdyaWRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICBVcGRhdGVUaWxlUG9zaXRpb24obWFwUG9zaXRpb24sIGdyaWRTaXplLCB4LCB5LCB0aWxlUGl4ZWxTaXplLCBvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlVGlsZVBvc2l0aW9ucyhib29sIHJlbG9hZEFsbCA9IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmkgZ3JpZFNpemUgPSBWaWV3cG9ydC5HcmlkU2l6ZTtcclxuICAgICAgICAgICAgVmVjMmkgbWFwUG9zaXRpb24gPSBWaWV3cG9ydC5HZXRUb3BMZWZ0R3JpZENvb3JkKCk7XHJcbiAgICAgICAgICAgIFZlYzJpIG9mZnNldCA9IFZpZXdwb3J0LkdldFRvcExlZnRQaXhlbE9mZnNldCgpO1xyXG4gICAgICAgICAgICBpbnQgdGlsZVBpeGVsU2l6ZSA9IFZpZXdwb3J0LkdldFRpbGVTaXplUGl4ZWwoKTtcclxuICAgICAgICAgICAgaW50IHhDb3VudCA9IEdldFRpbGVDb3VudFgoKTtcclxuICAgICAgICAgICAgaW50IHlDb3VudCA9IEdldFRpbGVDb3VudFkoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgeUNvdW50OyArK3kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgeENvdW50OyArK3gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbG9hZEFsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVHcmlkW3ldW3hdLk5lZWRSZWxvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBVcGRhdGVUaWxlUG9zaXRpb24obWFwUG9zaXRpb24sIGdyaWRTaXplLCB4LCB5LCB0aWxlUGl4ZWxTaXplLCBvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlVGlsZVBvc2l0aW9uKFZlYzJpIG1hcFBvc2l0aW9uLCBWZWMyaSBncmlkU2l6ZSwgaW50IHgsIGludCB5LCBpbnQgdGlsZVBpeGVsU2l6ZSwgVmVjMmkgb2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHkgPCAwIHx8IHkgPj0gdGlsZUdyaWQuQ291bnQgfHwgeCA8IDAgfHwgeCA+IHRpbGVHcmlkW3ldLkNvdW50IHx8IG9mZnNldCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIE1hcFRpbGUgdCA9IHRpbGVHcmlkW3ldW3hdO1xyXG4gICAgICAgICAgICBpZiAodCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRpbGVHcmlkW3ldW3hdLlVwZGF0ZVRpbGUobWFwUG9zaXRpb24sIHgsIHksIGdyaWRTaXplKTtcclxuICAgICAgICAgICAgVmVjMmkgcG9zaXRpb24gPSBuZXcgVmVjMmQoeCAqIHRpbGVQaXhlbFNpemUsIHkgKiB0aWxlUGl4ZWxTaXplKTtcclxuICAgICAgICAgICAgcG9zaXRpb24gKz0gb2Zmc2V0O1xyXG4gICAgICAgICAgICB0LlNldFBpeGVsUG9zaXRpb24ocG9zaXRpb24sIG5ldyBWZWMyaSh0aWxlUGl4ZWxTaXplKSk7XHJcbiAgICAgICAgICAgIGlmICh0Lk5lZWRSZWxvYWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQuTG9hZEltYWdlKEdldEltYWdlUGF0aCh0LkdyaWRQb3NpdGlvbi54LCB0LkdyaWRQb3NpdGlvbi55KSk7XHJcbiAgICAgICAgICAgICAgICB0Lk5lZWRSZWxvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgR2V0SW1hZ2VQYXRoKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB6b29tID0gKGludClWaWV3cG9ydC5ab29tO1xyXG4gICAgICAgICAgICBpZiAoQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3MgPT0gbnVsbCB8fCBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvcy5Db3VudCA8PSB6b29tKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgaW50IHRpbGVDb3VudEZhY3RvciA9IChpbnQpTWF0aC5Qb3coMiwgem9vbSk7XHJcbiAgICAgICAgICAgIGludCB3cmFwcGVkWCA9IFV0aWxpdHkuV3JhcCh4LCAwLCBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvc1swXS5EaW1lbnNpb25YICogdGlsZUNvdW50RmFjdG9yKTtcclxuICAgICAgICAgICAgaW50IHdyYXBwZWRZID0gVXRpbGl0eS5XcmFwKHksIDAsIEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zWzBdLkRpbWVuc2lvblkgKiB0aWxlQ291bnRGYWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAod3JhcHBlZFggPj0gQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3Nbem9vbV0uRGltZW5zaW9uWCB8fCB3cmFwcGVkWSA+PSBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvc1t6b29tXS5EaW1lbnNpb25ZKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkVtcHR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGludCBpZCA9ICh3cmFwcGVkWSAqIEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zW3pvb21dLkRpbWVuc2lvblggKyB3cmFwcGVkWCArIDEpO1xyXG4gICAgICAgICAgICBzdHJpbmcgcGF0aCA9IEBcImltZy9MYXllclwiICsgem9vbSArIEBcIi90aWxlX1wiO1xyXG4gICAgICAgICAgICBwYXRoICs9IGlkIDwgMTAgPyBcIjBcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHBhdGggKz0gaWQ7XHJcbiAgICAgICAgICAgIHBhdGggKz0gXCIuanBnXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBGYW50YXN5TWFwUHJvamVjdDtcclxuXHJcbm5hbWVzcGFjZSBNYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1hcFRpbGVcclxuXHR7XHJcblx0XHRwdWJsaWMgTWFwVGlsZShJTWFwVGlsZUltYWdlIGltYWdlKVxyXG5cdFx0e1xyXG5cdFx0XHRJbWFnZSA9IGltYWdlO1xyXG5cdFx0XHRHcmlkUG9zaXRpb24gPSBuZXcgVmVjMmkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgdm9pZCBMb2FkSW1hZ2Uoc3RyaW5nIGZpbGVuYW1lKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoSW1hZ2UgPT0gbnVsbCkgcmV0dXJuO1xyXG5cdFx0XHRJbWFnZS5Mb2FkKGZpbGVuYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgdm9pZCBVcGRhdGVUaWxlKFZlYzJpIG1hcFBvc2l0aW9uLCBpbnQgeCwgaW50IHksIFZlYzJpIGdyaWRTaXplKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoR3JpZFBvc2l0aW9uID09IG51bGwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRHcmlkUG9zaXRpb24gPSBuZXcgVmVjMmkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRHcmlkUG9zaXRpb24ueCA9IFV0aWxpdHkuV3JhcCh4ICsgbWFwUG9zaXRpb24ueCwgMCwgZ3JpZFNpemUueCk7XHJcblx0XHRcdEdyaWRQb3NpdGlvbi55ID0gVXRpbGl0eS5XcmFwKHkgKyBtYXBQb3NpdGlvbi55LCAwLCBncmlkU2l6ZS55KTtcclxuXHRcdFx0SW1hZ2UuR3JpZFBvc2l0aW9uID0gR3JpZFBvc2l0aW9uO1xyXG5cdFx0XHRJbWFnZS5NYXBQb3NpdGlvbiA9IG1hcFBvc2l0aW9uO1xyXG5cdFx0XHROZWVkUmVsb2FkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgdm9pZCBTZXRQaXhlbFBvc2l0aW9uKFZlYzJpIHBvc2l0aW9uLCBWZWMyaSByZW5kZXJTaXplKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoSW1hZ2UgPT0gbnVsbCkgcmV0dXJuO1xyXG5cdFx0XHRJbWFnZS5QaXhlbFBvc2l0aW9uID0gcG9zaXRpb247XHJcblx0XHRcdEltYWdlLlBpeGVsUmVuZGVyU2l6ZSA9IHJlbmRlclNpemU7XHJcblx0XHRcdEltYWdlLkRyYXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgSU1hcFRpbGVJbWFnZSBJbWFnZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHRcdHB1YmxpYyBWZWMyaSBHcmlkUG9zaXRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblx0XHRwdWJsaWMgYm9vbCBOZWVkUmVsb2FkIHsgZ2V0OyBzZXQ7IH1cclxuXHR9XHJcbn1cclxuIiwidXNpbmcgRmFudGFzeU1hcFByb2plY3Q7XHJcblxyXG5uYW1lc3BhY2UgTWFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNYXBWaWV3cG9ydFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBWZWMyZCBUb3BMZWZ0Tm9ybSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgVmVjMmkgR3JpZFNpemUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgWm9vbSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBQaXhlbFdpZHRoIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IFBpeGVsSGVpZ2h0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IEJhc2VUaWxlUGl4ZWxTaXplIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIE1hcFZpZXdwb3J0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRvcExlZnROb3JtID0gbmV3IFZlYzJkKCk7XHJcbiAgICAgICAgICAgIEdyaWRTaXplID0gbmV3IFZlYzJpKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBUcmFuc2xhdGVOb3JtKFZlYzJkIG5vcm1PZmZzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUb3BMZWZ0Tm9ybSA9IFRvcExlZnROb3JtICsgbm9ybU9mZnNldDtcclxuICAgICAgICAgICAgVG9wTGVmdE5vcm0ueCA9IFV0aWxpdHkuV3JhcChUb3BMZWZ0Tm9ybS54LCAwLjAsIDEuMCk7XHJcbiAgICAgICAgICAgIFRvcExlZnROb3JtLnkgPSBVdGlsaXR5LldyYXAoVG9wTGVmdE5vcm0ueSwgMC4wLCAxLjApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJhbnNsYXRlUGl4ZWwoVmVjMmkgcGl4ZWxPZmZzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUcmFuc2xhdGVOb3JtKG5ldyBWZWMyZChQaXhlbFRvTm9ybVgocGl4ZWxPZmZzZXQueCksIFBpeGVsVG9Ob3JtWShwaXhlbE9mZnNldC55KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJkIEdldENlbnRlck5vcm0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFRvcExlZnROb3JtID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgVmVjMmQgY2VudGVyID0gVG9wTGVmdE5vcm0gKyBuZXcgVmVjMmQoR2V0V2lkdGhOb3JtKCkgLyAyLCBHZXRIZWlnaHROb3JtKCkgLyAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChVdGlsaXR5LldyYXAoY2VudGVyLngsIDAuMCwgMS4wKSwgVXRpbGl0eS5XcmFwKGNlbnRlci55LCAwLjAsIDEuMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJpIEdldFRvcExlZnRHcmlkQ29vcmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmQgdGlsZVNpemUgPSBHZXRUaWxlU2l6ZU5vcm0oKTtcclxuICAgICAgICAgICAgaWYgKFRvcExlZnROb3JtID09IG51bGwgfHwgdGlsZVNpemUgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJpKFRvcExlZnROb3JtLnggLyB0aWxlU2l6ZS54LCBUb3BMZWZ0Tm9ybS55IC8gdGlsZVNpemUueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmkgR2V0VG9wTGVmdFBpeGVsT2Zmc2V0KGJvb2wgd3JhcCA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWMyZCB0aWxlU2l6ZU5vcm0gPSBHZXRUaWxlU2l6ZU5vcm0oKTtcclxuICAgICAgICAgICAgVmVjMmQgdG9wTGVmdEdyaWQgPSBHZXRUb3BMZWZ0R3JpZENvb3JkKCk7XHJcbiAgICAgICAgICAgIGludCB0aWxlUGl4ZWxTaXplID0gR2V0VGlsZVNpemVQaXhlbCgpO1xyXG4gICAgICAgICAgICBpZiAodGlsZVNpemVOb3JtID09IG51bGwgfHwgVG9wTGVmdE5vcm0gPT0gbnVsbCB8fCB0b3BMZWZ0R3JpZCA9PSBudWxsIHx8IEdyaWRTaXplID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBpbnQgeCA9IChpbnQpKCh0b3BMZWZ0R3JpZC54ICogdGlsZVNpemVOb3JtLnggLSBUb3BMZWZ0Tm9ybS54KSAqIHRpbGVQaXhlbFNpemUgKiBHcmlkU2l6ZS54KTtcclxuICAgICAgICAgICAgaW50IHkgPSAoaW50KSgodG9wTGVmdEdyaWQueSAqIHRpbGVTaXplTm9ybS55IC0gVG9wTGVmdE5vcm0ueSkgKiB0aWxlUGl4ZWxTaXplICogR3JpZFNpemUueSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmkgR2V0Tm9ybVRvUGl4ZWxDb29yZChWZWMyZCBub3JtQ29vcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdGlsZVNpemVQaXhlbCA9IEdldFRpbGVTaXplUGl4ZWwoKTtcclxuICAgICAgICAgICAgaWYgKFRvcExlZnROb3JtID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyaSgobm9ybUNvb3JkLnggLSBUb3BMZWZ0Tm9ybS54KSAqIHRpbGVTaXplUGl4ZWwgKiBHcmlkU2l6ZS54LCAobm9ybUNvb3JkLnkgLSBUb3BMZWZ0Tm9ybS55KSAqIHRpbGVTaXplUGl4ZWwgKiBHcmlkU2l6ZS55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyZCBHZXRUaWxlU2l6ZU5vcm0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEdyaWRTaXplID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZCgxLjAgLyBHcmlkU2l6ZS54LCAxLjAgLyBHcmlkU2l6ZS55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgR2V0V2lkdGhOb3JtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJkIHRpbGVTaXplTm9ybSA9IEdldFRpbGVTaXplTm9ybSgpO1xyXG4gICAgICAgICAgICBpZiAodGlsZVNpemVOb3JtID09IG51bGwpIHJldHVybiAwLjA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFBpeGVsV2lkdGggLyBHZXRUaWxlU2l6ZVBpeGVsKCkpICogdGlsZVNpemVOb3JtLng7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIEdldEhlaWdodE5vcm0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmQgdGlsZVNpemVOb3JtID0gR2V0VGlsZVNpemVOb3JtKCk7XHJcbiAgICAgICAgICAgIGlmICh0aWxlU2l6ZU5vcm0gPT0gbnVsbCkgcmV0dXJuIDAuMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoUGl4ZWxIZWlnaHQgLyBHZXRUaWxlU2l6ZVBpeGVsKCkpICogdGlsZVNpemVOb3JtLnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEdldFRpbGVTaXplUGl4ZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpU3lzdGVtLk1hdGguUm91bmQoQmFzZVRpbGVQaXhlbFNpemUgLyAyICsgKEJhc2VUaWxlUGl4ZWxTaXplIC8gMikgKiAoWm9vbSAtIChpbnQpWm9vbSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBQaXhlbFRvTm9ybVgoaW50IHBpeGVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmQgdGlsZVNpemVOb3JtID0gR2V0VGlsZVNpemVOb3JtKCk7XHJcbiAgICAgICAgICAgIGlmIChwaXhlbCA9PSAwIHx8IHRpbGVTaXplTm9ybSA9PSBudWxsKSByZXR1cm4gMC4wO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICgoZG91YmxlKXBpeGVsIC8gR2V0VGlsZVNpemVQaXhlbCgpKSAqIHRpbGVTaXplTm9ybS54O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBQaXhlbFRvTm9ybVkoaW50IHBpeGVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmQgdGlsZVNpemVOb3JtID0gR2V0VGlsZVNpemVOb3JtKCk7XHJcbiAgICAgICAgICAgIGlmIChwaXhlbCA9PSAwIHx8IHRpbGVTaXplTm9ybSA9PSBudWxsKSByZXR1cm4gMC4wO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICgoZG91YmxlKXBpeGVsIC8gR2V0VGlsZVNpemVQaXhlbCgpKSAqIHRpbGVTaXplTm9ybS55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgRmFudGFzeU1hcFByb2plY3Q7XHJcbnVzaW5nIE1hcDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBXZWJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgZG91YmxlIFpPT01fU1BFRUQgPSAwLjA1O1xyXG5cclxuICAgICAgICByZWFkb25seSBIVE1MQ2FudmFzRWxlbWVudCBjYW52YXNTY3JlZW47XHJcbiAgICAgICAgcmVhZG9ubHkgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGN0eDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBNYXBNYW5hZ2VyIE1hcCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjMmkgTGFzdE1vdXNlUG9zIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEFwcChIVE1MQ2FudmFzRWxlbWVudCBzY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc1NjcmVlbiA9IHNjcmVlbjtcclxuICAgICAgICAgICAgY3R4ID0gc2NyZWVuLkdldENvbnRleHQoQ2FudmFzVHlwZXMuQ2FudmFzQ29udGV4dDJEVHlwZS5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xyXG4gICAgICAgICAgICBjdHguSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgTGFzdE1vdXNlUG9zID0gbmV3IFZlYzJpKCk7XHJcblxyXG4gICAgICAgICAgICBXaW5kb3cuQWRkRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuUmVzaXplLCAoQWN0aW9uPEV2ZW50PilPblNpemVDaGFuZ2VkKTtcclxuICAgICAgICAgICAgc2NyZWVuLkFkZEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLldoZWVsLCAoQWN0aW9uPEV2ZW50PilPbk1vdXNlV2hlZWwpO1xyXG4gICAgICAgICAgICBzY3JlZW4uQWRkRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTW91c2VEb3duLCAoQWN0aW9uPEV2ZW50PilPbk1vdXNlRG93bik7XHJcbiAgICAgICAgICAgIHNjcmVlbi5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5Nb3VzZVVwLCAoQWN0aW9uPEV2ZW50PilPbk1vdXNlVXApO1xyXG4gICAgICAgICAgICBzY3JlZW4uQWRkRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTW91c2VNb3ZlLCAoQWN0aW9uPEV2ZW50PilPbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgICAgICAgICBSZWFkTGF5ZXJJbmZvcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlYWRMYXllckluZm9zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0IHhtbFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeG1sUmVxdWVzdC5PblJlYWR5U3RhdGVDaGFuZ2UgKz0gKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhtbFJlcXVlc3QuUmVhZHlTdGF0ZSA9PSBBamF4UmVhZHlTdGF0ZS5Eb25lICYmIHhtbFJlcXVlc3QuU3RhdHVzID09IDIwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMaXN0PExheWVySW5mbz4gbGF5ZXJJbmZvcyA9IG5ldyBMaXN0PExheWVySW5mbz4oKTtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQ29sbGVjdGlvbiByb290ID0geG1sUmVxdWVzdC5SZXNwb25zZVhNTC5HZXRFbGVtZW50c0J5VGFnTmFtZShcIkxheWVySW5mb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQ29sbGVjdGlvbiBlbGVtZW50cyA9IHhtbFJlcXVlc3QuUmVzcG9uc2VYTUwuR2V0RWxlbWVudHNCeVRhZ05hbWUoXCJMYXllclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnQgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNoaWxkIGluIGVsZW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBkaW1lbnNpb25YID0gaW50LlBhcnNlKGNoaWxkLkdldEF0dHJpYnV0ZShcIkRpbWVuc2lvblhcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgZGltZW5zaW9uWSA9IGludC5QYXJzZShjaGlsZC5HZXRBdHRyaWJ1dGUoXCJEaW1lbnNpb25ZXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJJbmZvcy5BZGQobmV3IExheWVySW5mbyhpLCBkaW1lbnNpb25YLCBkaW1lbnNpb25ZKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1hcE1hbmFnZXIuU2V0dGluZ3MgbWFwU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwU2V0dGluZ3MuSW1hZ2VQcmVmYWIgPSBuZXcgV2ViTWFwVGlsZUltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwU2V0dGluZ3MuTGF5ZXJJbmZvcyA9IGxheWVySW5mb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwU2V0dGluZ3MuVGlsZVNpemUgPSBpbnQuUGFyc2Uocm9vdFswXS5HZXRBdHRyaWJ1dGUoXCJUaWxlU2l6ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTWFwID0gbmV3IE1hcE1hbmFnZXIobWFwU2V0dGluZ3MsIEFkZFRvQ2FudmFzLCBSZW1vdmVGcm9tQ2FudmFzLCBEcmF3T25DYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzdHJpbmcgZG9jVXJsID0gRG9jdW1lbnQuVVJMO1xyXG4gICAgICAgICAgICBkb2NVcmwgPSBkb2NVcmwuU3Vic3RyaW5nKDAsIGRvY1VybC5MYXN0SW5kZXhPZignLycpKTtcclxuICAgICAgICAgICAgeG1sUmVxdWVzdC5PcGVuKFwiR0VUXCIsIGRvY1VybCArIFwiL2ltZy9MYXllckluZm8ueG1sXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgeG1sUmVxdWVzdC5PdmVycmlkZU1pbWVUeXBlKFwidGV4dC94bWxcIik7XHJcbiAgICAgICAgICAgIHhtbFJlcXVlc3QuU2VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEFkZFRvQ2FudmFzKG9iamVjdCBzZW5kZXIsIEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9pZiAoc2VuZGVyICE9IG51bGwgJiYgc2VuZGVyIGlzIFdlYk1hcFRpbGVJbWFnZSlcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIFxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZW1vdmVGcm9tQ2FudmFzKG9iamVjdCBzZW5kZXIsIEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNlbmRlciAhPSBudWxsICYmIHNlbmRlciBpcyBXZWJNYXBUaWxlSW1hZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFdlYk1hcFRpbGVJbWFnZSB0aWxlID0gc2VuZGVyIGFzIFdlYk1hcFRpbGVJbWFnZTtcclxuICAgICAgICAgICAgICAgIHRpbGUuSW1hZ2UuUmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBEcmF3T25DYW52YXMob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc2VuZGVyICE9IG51bGwgJiYgc2VuZGVyIGlzIFdlYk1hcFRpbGVJbWFnZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgV2ViTWFwVGlsZUltYWdlIHRpbGUgPSBzZW5kZXIgYXMgV2ViTWFwVGlsZUltYWdlO1xyXG4gICAgICAgICAgICAgICAgY3R4LlNhdmUoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5HbG9iYWxBbHBoYSA9IDFmO1xyXG4gICAgICAgICAgICAgICAgY3R4LkZpbGxTdHlsZSA9IFwiZ3JheVwiO1xyXG4gICAgICAgICAgICAgICAgY3R4LkZpbGxSZWN0KHRpbGUuUGl4ZWxQb3NpdGlvbi54LCB0aWxlLlBpeGVsUG9zaXRpb24ueSwgdGlsZS5QaXhlbFJlbmRlclNpemUueCwgdGlsZS5QaXhlbFJlbmRlclNpemUueSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5WaXNpYmxlICYmIHRpbGUuSW1hZ2UuQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LkRyYXdJbWFnZSh0aWxlLkltYWdlLCB0aWxlLlBpeGVsUG9zaXRpb24ueCwgdGlsZS5QaXhlbFBvc2l0aW9uLnksIHRpbGUuUGl4ZWxSZW5kZXJTaXplLngsIHRpbGUuUGl4ZWxSZW5kZXJTaXplLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3R4LlJlc3RvcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ2FsY3VsYXRlUmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRvdWJsZSBkZXZQeCA9IDA7XHJcbiAgICAgICAgICAgIFNjcmlwdC5Xcml0ZShcImRldlB4ID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XCIpO1xyXG4gICAgICAgICAgICBjYW52YXNTY3JlZW4uV2lkdGggPSAoaW50KU1hdGguUm91bmQoV2luZG93LklubmVyV2lkdGggKiBkZXZQeCk7XHJcbiAgICAgICAgICAgIGNhbnZhc1NjcmVlbi5IZWlnaHQgPSAoaW50KU1hdGguUm91bmQoV2luZG93LklubmVySGVpZ2h0ICogZGV2UHgpO1xyXG4gICAgICAgICAgICBpZiAoTWFwICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1hcC5DaGFuZ2VTaXplKG5ldyBWZWMyaShjYW52YXNTY3JlZW4uV2lkdGgsIGNhbnZhc1NjcmVlbi5IZWlnaHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uU2l6ZUNoYW5nZWQoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbGN1bGF0ZVJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uTW91c2VXaGVlbChFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE1hcCAhPSBudWxsICYmIGUuSXNNb3VzZUV2ZW50KCkgJiYgZSBpcyBXaGVlbEV2ZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2UgPSAoV2hlZWxFdmVudCllO1xyXG4gICAgICAgICAgICAgICAgTWFwLlpvb21NYXAoTGFzdE1vdXNlUG9zLngsIExhc3RNb3VzZVBvcy55LCB3ZS5EZWx0YVkgPiAwID8gLVpPT01fU1BFRUQgOiBaT09NX1NQRUVEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uTW91c2VEb3duKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoTWFwICE9IG51bGwgJiYgZS5Jc01vdXNlRXZlbnQoKSAmJiBlIGlzIE1vdXNlRXZlbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZSA9IChNb3VzZUV2ZW50KWU7XHJcbiAgICAgICAgICAgICAgICBNYXAuT25QcmVzcyhtZS5DbGllbnRYLCBtZS5DbGllbnRZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uTW91c2VVcChFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE1hcCAhPSBudWxsICYmIGUuSXNNb3VzZUV2ZW50KCkgJiYgZSBpcyBNb3VzZUV2ZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNYXAuT25SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBPbk1vdXNlTW92ZShFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE1hcCAhPSBudWxsICYmIGUuSXNNb3VzZUV2ZW50KCkgJiYgZSBpcyBNb3VzZUV2ZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWUgPSAoTW91c2VFdmVudCllO1xyXG4gICAgICAgICAgICAgICAgTGFzdE1vdXNlUG9zLlNldChtZS5DbGllbnRYLCBtZS5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIE1hcC5Pbk1vdmUobWUuQ2xpZW50WCwgbWUuQ2xpZW50WSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBGYW50YXN5TWFwUHJvamVjdDtcblxubmFtZXNwYWNlIFdlYlxue1xuICAgIHB1YmxpYyBjbGFzcyBXZWJNYXBUaWxlSW1hZ2UgOiBJTWFwVGlsZUltYWdlXG4gICAge1xuICAgICAgICBwdWJsaWMgVmVjMmkgR3JpZFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFZlYzJpIE1hcFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFZlYzJpIFBpeGVsUG9zaXRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgVmVjMmkgUGl4ZWxSZW5kZXJTaXplIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyIE9uSW5pdGlhbGl6ZTtcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlciBPblJlbW92ZTtcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlciBPbkRyYXc7XG5cbiAgICAgICAgcHVibGljIEhUTUxJbWFnZUVsZW1lbnQgSW1hZ2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBib29sIFZpc2libGUgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBXZWJNYXBUaWxlSW1hZ2UoKVxuICAgICAgICB7XG4gICAgICAgICAgICBJbWFnZSA9IG5ldyBIVE1MSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgICAgICBJbWFnZS5PbkxvYWQgKz0gKGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgT25EcmF3IT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5PbkRyYXcuSW52b2tlKHRoaXMsIG5ldyBFdmVudEFyZ3MoKSkpOm51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgSW5pdGlhbGl6ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIE9uSW5pdGlhbGl6ZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+T25Jbml0aWFsaXplLkludm9rZSh0aGlzLCBuZXcgRXZlbnRBcmdzKCkpKTpudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlKClcbiAgICAgICAge1xuICAgICAgICAgICAgT25SZW1vdmUhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pk9uUmVtb3ZlLkludm9rZSh0aGlzLCBuZXcgRXZlbnRBcmdzKCkpKTpudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRHJhdygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vT25EcmF3Py5JbnZva2UodGhpcywgbmV3IEV2ZW50QXJncygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIExvYWQoc3RyaW5nIGZpbGVuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICBJbWFnZS5TcmMgPSBmaWxlbmFtZTtcbiAgICAgICAgICAgIFZpc2libGUgPSAhc3RyaW5nLklzTnVsbE9yRW1wdHkoZmlsZW5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3IHB1YmxpYyBUeXBlIEdldFR5cGUoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gYmFzZS5HZXRUeXBlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXQp9Cg==
