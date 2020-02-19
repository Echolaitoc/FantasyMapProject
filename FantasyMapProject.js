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
                Distance: function (a, b) {
                    var difference = FantasyMapProject.Vec2d.op_Subtraction(a, b);
                    return Math.sqrt(difference.x * difference.x + difference.y * difference.y);
                },
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
                Distance: function (a, b) {
                    var difference = FantasyMapProject.Vec2i.op_Subtraction(a, b);
                    return Math.sqrt(((Bridge.Int.mul(difference.x, difference.x) + Bridge.Int.mul(difference.y, difference.y)) | 0));
                },
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
            LastMousePos: null,
            LastPinchGestureDistance: 0
        },
        ctors: {
            ctor: function (screen) {
                this.$initialize();
                this.canvasScreen = screen;
                this.ctx = screen.getContext("2d");
                this.ctx.imageSmoothingEnabled = true;
                this.LastMousePos = new FantasyMapProject.Vec2i.ctor();
                this.LastPinchGestureDistance = 0.0;

                window.addEventListener("resize", Bridge.fn.cacheBind(this, this.OnSizeChanged));
                screen.addEventListener("wheel", Bridge.fn.cacheBind(this, this.OnMouseWheel));
                screen.addEventListener("mousedown", Bridge.fn.cacheBind(this, this.OnMouseDown));
                screen.addEventListener("mouseup", Bridge.fn.cacheBind(this, this.OnMouseUp));
                screen.addEventListener("mousemove", Bridge.fn.cacheBind(this, this.OnMouseMove));
                screen.addEventListener("touchstart", Bridge.fn.cacheBind(this, this.OnTouchStart));
                screen.addEventListener("touchend", Bridge.fn.cacheBind(this, this.OnTouchEnd));
                screen.addEventListener("touchmove", Bridge.fn.cacheBind(this, this.OnTouchMove));

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
            },
            OnTouchEnd: function (e) {
                if (this.Map != null && Bridge.is(e, TouchEvent)) {
                    var te = Bridge.cast(e, TouchEvent);
                    if (te != null && (te.touches == null || te.touches.length === 0)) {
                        this.Map.OnRelease();
                    }
                }
            },
            OnTouchStart: function (e) {
                if (this.Map != null && Bridge.is(e, TouchEvent)) {
                    var te = Bridge.cast(e, TouchEvent);
                    if (te != null && te.touches != null) {
                        if (te.touches.length === 1) {
                            var t = te.touches[0];
                            this.LastMousePos.Set(t.clientX, t.clientY);
                            this.Map.OnPress(t.clientX, t.clientY);
                        } else if (te.touches.length === 2) {
                            var t1 = te.touches[0];
                            var t2 = te.touches[1];
                            var t1Pos = new FantasyMapProject.Vec2i.$ctor4(t1.clientX, t1.clientY);
                            var t2Pos = new FantasyMapProject.Vec2i.$ctor4(t2.clientX, t2.clientY);
                            var distance = FantasyMapProject.Vec2i.Distance(t1Pos, t2Pos);
                            this.LastPinchGestureDistance = distance;
                        }
                    }
                }
            },
            OnTouchMove: function (e) {
                if (this.Map != null && Bridge.is(e, TouchEvent)) {
                    var te = Bridge.cast(e, TouchEvent);
                    if (te != null && te.touches != null) {
                        if (te.touches.length === 1) {
                            var t = te.touches[0];
                            this.LastMousePos.Set(t.clientX, t.clientY);
                            this.Map.OnMove(t.clientX, t.clientY);
                        } else if (te.touches.length === 2) {
                            var t1 = te.touches[0];
                            var t2 = te.touches[1];
                            var t1Pos = new FantasyMapProject.Vec2i.$ctor4(t1.clientX, t1.clientY);
                            var t2Pos = new FantasyMapProject.Vec2i.$ctor4(t2.clientX, t2.clientY);
                            var mid = FantasyMapProject.Vec2i.op_Division((FantasyMapProject.Vec2i.op_Addition(t1Pos, t2Pos)), 2);
                            var distance = FantasyMapProject.Vec2i.Distance(t1Pos, t2Pos);
                            var delta = this.LastPinchGestureDistance - distance;
                            this.LastPinchGestureDistance = distance;
                            this.Map.ZoomMap(mid.x, mid.y, delta * -0.05);
                        }
                        if (te.touches.length > 1) {
                            e.preventDefault();
                        }
                    }
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJGYW50YXN5TWFwUHJvamVjdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiLi4vQ29tbW9uL01hcC9MYXllckluZm8uY3MiLCJzcmMvUHJvZ3JhbS5jcyIsIi4uL0NvbW1vbi9VdGlsaXR5L1V0aWxpdHkuY3MiLCIuLi9Db21tb24vVXRpbGl0eS9WZWMyZC5jcyIsIi4uL0NvbW1vbi9VdGlsaXR5L1ZlYzJpLmNzIiwiLi4vQ29tbW9uL01hcC9NYXBNYW5hZ2VyLmNzIiwiLi4vQ29tbW9uL01hcC9NYXBUaWxlLmNzIiwiLi4vQ29tbW9uL01hcC9NYXBWaWV3cG9ydC5jcyIsInNyYy9BcHAuY3MiLCJzcmMvV2ViTWFwVGlsZUltYWdlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQVF5QkEsTUFBVUEsWUFBZ0JBOztnQkFFdkNBLFlBQU9BO2dCQUNQQSxrQkFBYUE7Z0JBQ2JBLGtCQUFhQTs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQ2JBO29CQUNBQSxtQ0FBU0E7O29CQUVUQSwwQkFBMEJBOztvQkFFMUJBLFVBQVVBLElBQUlBLFFBQUlBO29CQUNsQkE7Ozs7b0JBT0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLCtCQUErQkE7Ozs7Ozs7Ozs7a0NDdEJsQkEsT0FBV0EsTUFBVUE7OztvQkFFM0NBLElBQUlBLFdBQVFBO3dCQUFJQSxPQUFPQTs7b0JBQ3ZCQSxJQUFJQSxTQUFPQTt3QkFFVkEsaUNBQVNBLE1BQVVBOztvQkFHcEJBLElBQUlBLFFBQVFBO3dCQUVYQSxPQUFPQSxTQUFLQSxDQUFDQSxXQUFPQSxlQUFTQSxDQUFDQSxTQUFLQTs7d0JBSW5DQSxPQUFPQSxXQUFPQSxDQUFDQSxVQUFRQSxnQkFBUUEsQ0FBQ0EsU0FBS0E7OztnQ0FJYkEsT0FBY0EsTUFBYUE7OztvQkFFcERBLElBQUlBLFdBQVFBO3dCQUFJQSxPQUFPQTs7b0JBRXZCQSxJQUFJQSxTQUFPQTt3QkFF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c3BhY2UgRmFudGFzeU1hcFByb2plY3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIExheWVySW5mb1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBpbnQgWm9vbSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IERpbWVuc2lvblggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBEaW1lbnNpb25ZIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTGF5ZXJJbmZvKGludCB6b29tLCBpbnQgZGltZW5zaW9uWCwgaW50IGRpbWVuc2lvblkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBab29tID0gem9vbTtcclxuICAgICAgICAgICAgRGltZW5zaW9uWCA9IGRpbWVuc2lvblg7XHJcbiAgICAgICAgICAgIERpbWVuc2lvblkgPSBkaW1lbnNpb25ZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBXZWI7XG5cbm5hbWVzcGFjZSBGYW50YXN5TWFwUHJvamVjdFxue1xuICAgIGNsYXNzIFByb2dyYW1cbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcztcblxuICAgICAgICBbUmVhZHldXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcbiAgICAgICAge1xuICAgICAgICAgICAgUmVzZXRCcm93c2VyRnJhbWUoKTtcbiAgICAgICAgICAgIGNhbnZhcyA9IG5ldyBIVE1MQ2FudmFzRWxlbWVudCgpO1xuXG4gICAgICAgICAgICBEb2N1bWVudC5Cb2R5LkFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICAgICAgICAgIHZhciBhcHAgPSBuZXcgQXBwKGNhbnZhcyk7XG4gICAgICAgICAgICBhcHAuQ2FsY3VsYXRlUmVzaXplKCk7XG5cbiAgICAgICAgICAgIC8vU2NyaXB0LkNhbGwoXCJpbml0X3NlcnZpY2V3b3JrZXJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlc2V0QnJvd3NlckZyYW1lKClcbiAgICAgICAge1xuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5NYXJnaW4gPSBcIjBcIjtcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuUGFkZGluZyA9IFwiMFwiO1xuICAgICAgICAgICAgRG9jdW1lbnQuQm9keS5TdHlsZS5IZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgICAgIERvY3VtZW50LkJvZHkuU3R5bGUuT3ZlcmZsb3cgPSBPdmVyZmxvdy5IaWRkZW47XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgRmFudGFzeU1hcFByb2plY3Rcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBVdGlsaXR5XHJcblx0e1xyXG5cdFx0cHVibGljIHN0YXRpYyBpbnQgV3JhcChpbnQgdmFsdWUsIGludCBmcm9tLCBpbnQgdG8pXHJcblx0XHR7XHJcblx0XHRcdGlmIChmcm9tID09IHRvKSByZXR1cm4gZnJvbTtcclxuXHRcdFx0aWYgKGZyb20gPiB0bylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFN3YXAocmVmIGZyb20sIHJlZiB0byk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gYWxnb3JpdGhtIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE0NDE2MTMzXHJcblx0XHRcdGlmICh2YWx1ZSA8IGZyb20pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gdG8gLSAoZnJvbSAtIHZhbHVlKSAlICh0byAtIGZyb20pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiBmcm9tICsgKHZhbHVlIC0gZnJvbSkgJSAodG8gLSBmcm9tKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgZG91YmxlIFdyYXAoZG91YmxlIHZhbHVlLCBkb3VibGUgZnJvbSwgZG91YmxlIHRvKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoZnJvbSA9PSB0bykgcmV0dXJuIGZyb207XHJcblx0XHRcdC8vIGFsZ29yaXRobSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU4NTI2MjgvNTk5ODg0XHJcblx0XHRcdGlmIChmcm9tID4gdG8pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRTd2FwKHJlZiBmcm9tLCByZWYgdG8pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRvdWJsZSBjeWNsZSA9IHRvIC0gZnJvbTtcclxuXHRcdFx0aWYgKGN5Y2xlID09IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gdG87XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHZhbHVlIC0gY3ljbGUgKiBTeXN0ZW0uTWF0aC5GbG9vcigodmFsdWUgLSBmcm9tKSAvIGN5Y2xlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHN0YXRpYyB2b2lkIFN3YXAocmVmIGludCBhLCByZWYgaW50IGIpXHJcblx0XHR7XHJcblx0XHRcdGRvdWJsZSB0bXAgPSBhO1xyXG5cdFx0XHRhID0gYjtcclxuXHRcdFx0YiA9IGE7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgdm9pZCBTd2FwKHJlZiBkb3VibGUgYSwgcmVmIGRvdWJsZSBiKVxyXG5cdFx0e1xyXG5cdFx0XHRkb3VibGUgdG1wID0gYTtcclxuXHRcdFx0YSA9IGI7XHJcblx0XHRcdGIgPSBhO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgaW50IENsYW1wKGludCB2YWx1ZSwgaW50IG1pbiwgaW50IG1heClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuICgodmFsdWUpIDwgKG1pbikgPyAobWluKSA6ICgodmFsdWUgPiBtYXgpID8gKG1heCkgOiAodmFsdWUpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyBkb3VibGUgQ2xhbXAoZG91YmxlIHZhbHVlLCBkb3VibGUgbWluLCBkb3VibGUgbWF4KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKCh2YWx1ZSkgPCAobWluKSA/IChtaW4pIDogKCh2YWx1ZSA+IG1heCkgPyAobWF4KSA6ICh2YWx1ZSkpKTtcclxuXHRcdH1cclxucHVibGljIHN0YXRpYyBJRW51bWVyYWJsZTxUPiBSb3RhdGVMZWZ0PFQ+KHRoaXMgSUVudW1lcmFibGU8VD4gZSwgaW50IG4pXHJcbntcclxuICAgIHJldHVybiBuID49IDAgPyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8VD4oZSxuKS5Db25jYXQoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5UYWtlPFQ+KGUsbikpIDogRmFudGFzeU1hcFByb2plY3QuVXRpbGl0eS5Sb3RhdGVSaWdodDxUPihlLC1uKTtcclxufXB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8VD4gUm90YXRlUmlnaHQ8VD4odGhpcyBJRW51bWVyYWJsZTxUPiBlLCBpbnQgbilcclxue1xyXG4gICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuUmV2ZXJzZTxUPihGYW50YXN5TWFwUHJvamVjdC5VdGlsaXR5LlJvdGF0ZUxlZnQ8VD4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5SZXZlcnNlPFQ+KGUpLG4pKTtcclxufVx0fVxyXG59XHJcbiIsIm5hbWVzcGFjZSBGYW50YXN5TWFwUHJvamVjdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVmVjMmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZG91YmxlIHg7XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSB5O1xyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0KDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJkKGRvdWJsZSBzY2FsYXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXQoc2NhbGFyLCBzY2FsYXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJkKGRvdWJsZSB4LCBkb3VibGUgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldCh4LCB5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyZChWZWMyaSB2ZWMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmVjID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldCgwLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTZXQodmVjLngsIHZlYy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldChkb3VibGUgeCwgZG91YmxlIHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJkIFNjYWxlKFZlYzJkIHZlYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2ZWMgPT0gbnVsbCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmQoeCAqIHZlYy54LCB5ICogdmVjLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkb3VibGUgRGlzdGFuY2UoVmVjMmQgYSwgVmVjMmQgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJkIGRpZmZlcmVuY2UgPSBhIC0gYjtcclxuICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5NYXRoLlNxcnQoZGlmZmVyZW5jZS54ICogZGlmZmVyZW5jZS54ICsgZGlmZmVyZW5jZS55ICogZGlmZmVyZW5jZS55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmQgb3BlcmF0b3IgKyhWZWMyZCBhLCBWZWMyZCBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuIChiID09IG51bGwpID8gbnVsbCA6IG5ldyBWZWMyZChiKTtcclxuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgcmV0dXJuIG5ldyBWZWMyZChhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChhLnggKyBiLngsIGEueSArIGIueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlYzJkIG9wZXJhdG9yIC0oVmVjMmQgYSkgeyByZXR1cm4gYSAqIC0xOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyZCBvcGVyYXRvciAtKFZlYzJkIGEsIFZlYzJkIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm4gKGIgPT0gbnVsbCkgPyBudWxsIDogbmV3IFZlYzJkKGIpO1xyXG4gICAgICAgICAgICBpZiAoYiA9PSBudWxsKSByZXR1cm4gbmV3IFZlYzJkKGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJkKGEueCAtIGIueCwgYS55IC0gYi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmQgb3BlcmF0b3IgKihkb3VibGUgZmFjdG9yLCBWZWMyZCBhKSB7IHJldHVybiBhICogZmFjdG9yOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyZCBvcGVyYXRvciAqKFZlYzJkIGEsIGRvdWJsZSBmYWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChhLnggKiBmYWN0b3IsIGEueSAqIGZhY3Rvcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyZCBvcGVyYXRvciAvKFZlYzJkIGEsIGRvdWJsZSBkaXZpc29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyZChhLnggLyBkaXZpc29yLCBhLnkgLyBkaXZpc29yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3IgVmVjMmkoVmVjMmQgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoKGludClhLngsIChpbnQpYS55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwieDogXCIgKyB4LlRvU3RyaW5nKFwiTjNcIikgKyBcIiAvIHk6IFwiICsgeS5Ub1N0cmluZyhcIk4zXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgRmFudGFzeU1hcFByb2plY3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFZlYzJpXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCB4O1xyXG4gICAgICAgIHB1YmxpYyBpbnQgeTtcclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJpKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldCgwLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaShpbnQgc2NhbGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0KHNjYWxhciwgc2NhbGFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaShpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXQoeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmkoZG91YmxlIHgsIGRvdWJsZSB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0KChpbnQpeCwgKGludCl5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaShWZWMyZCB2ZWMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmVjID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldCgwLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTZXQoKGludCl2ZWMueCwgKGludCl2ZWMueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaSBTY2FsZShWZWMyaSB2ZWMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmVjID09IG51bGwpIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJpKHggKiB2ZWMueCwgeSAqIHZlYy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZG91YmxlIERpc3RhbmNlKFZlYzJpIGEsIFZlYzJpIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWMyaSBkaWZmZXJlbmNlID0gYSAtIGI7XHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTWF0aC5TcXJ0KGRpZmZlcmVuY2UueCAqIGRpZmZlcmVuY2UueCArIGRpZmZlcmVuY2UueSAqIGRpZmZlcmVuY2UueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlYzJpIG9wZXJhdG9yICsoVmVjMmkgYSwgVmVjMmkgYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhID09IG51bGwpIHJldHVybiAoYiA9PSBudWxsKSA/IG51bGwgOiBuZXcgVmVjMmkoYik7XHJcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIHJldHVybiBuZXcgVmVjMmkoYSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoYS54ICsgYi54LCBhLnkgKyBiLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWMyaSBvcGVyYXRvciAtKFZlYzJpIGEpIHsgcmV0dXJuIGEgKiAtMTsgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmkgb3BlcmF0b3IgLShWZWMyaSBhLCBWZWMyaSBiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuIChiID09IG51bGwpID8gbnVsbCA6IG5ldyBWZWMyaShiKTtcclxuICAgICAgICAgICAgaWYgKGIgPT0gbnVsbCkgcmV0dXJuIG5ldyBWZWMyaShhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyaShhLnggLSBiLngsIGEueSAtIGIueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlYzJpIG9wZXJhdG9yICooZG91YmxlIGZhY3RvciwgVmVjMmkgYSkgeyByZXR1cm4gYSAqIGZhY3RvcjsgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmkgb3BlcmF0b3IgKihWZWMyaSBhLCBkb3VibGUgZmFjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoYS54ICogZmFjdG9yLCBhLnkgKiBmYWN0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjMmkgb3BlcmF0b3IgLyhWZWMyaSBhLCBkb3VibGUgZGl2aXNvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoYS54IC8gZGl2aXNvciwgYS55IC8gZGl2aXNvcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHQgICAgcHVibGljIHN0YXRpYyBpbXBsaWNpdCBvcGVyYXRvciBWZWMyZChWZWMyaSBhKVxyXG5cdCAgICB7XHJcblx0XHQgICAgcmV0dXJuIG5ldyBWZWMyZChhLngsIGEueSk7XHJcblx0ICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ4OiBcIiArIHggKyBcIiAvIHk6IFwiICsgeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgRmFudGFzeU1hcFByb2plY3Q7XHJcblxyXG5uYW1lc3BhY2UgTWFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNYXBNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cnVjdCBTZXR0aW5nc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIElNYXBUaWxlSW1hZ2UgSW1hZ2VQcmVmYWI7XHJcbiAgICAgICAgICAgIHB1YmxpYyBMaXN0PExheWVySW5mbz4gTGF5ZXJJbmZvcztcclxuICAgICAgICAgICAgcHVibGljIGludCBUaWxlU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXIgT25UaWxlQ3JlYXRlZDtcclxuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyIE9uVGlsZVJlbW92ZWQ7XHJcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlciBPblRpbGVEcmF3O1xyXG5cclxuICAgICAgICBwdWJsaWMgU2V0dGluZ3MgQ3VycmVudFNldHRpbmdzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IE1pblpvb21cclxuICAgICAgICB7IFxyXG4gICAgICAgICAgICBnZXQgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvcyA9PSBudWxsID8gLTEgOiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgTWF4Wm9vbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvcyA9PSBudWxsID8gLTEgOiBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvcy5Db3VudCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNYXBWaWV3cG9ydCBWaWV3cG9ydCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PExpc3Q8TWFwVGlsZT4+IHRpbGVHcmlkOyAvLyBsaXN0IG9mIHJvd3MsIHJvdyA9IGxpc3Qgb2YgdGlsZXNcclxuICAgICAgICBwcml2YXRlIFZlYzJkIGxhc3RNb3VzZVBvc2l0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgYm9vbCBpc01vdXNlUHJlc3NlZDtcclxuXHJcbiAgICAgICAgcHVibGljIE1hcE1hbmFnZXIoU2V0dGluZ3Mgc2V0dGluZ3MsIEV2ZW50SGFuZGxlciBvblRpbGVDcmVhdGVkLCBFdmVudEhhbmRsZXIgb25UaWxlUmVtb3ZlZCwgRXZlbnRIYW5kbGVyIG9uVGlsZURyYXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDdXJyZW50U2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgVmlld3BvcnQgPSBuZXcgTWFwVmlld3BvcnQoKTtcclxuICAgICAgICAgICAgVmlld3BvcnQuQmFzZVRpbGVQaXhlbFNpemUgPSBzZXR0aW5ncy5UaWxlU2l6ZTtcclxuICAgICAgICAgICAgdGlsZUdyaWQgPSBuZXcgTGlzdDxMaXN0PE1hcFRpbGU+PigpO1xyXG4gICAgICAgICAgICBPblRpbGVDcmVhdGVkID0gb25UaWxlQ3JlYXRlZDtcclxuICAgICAgICAgICAgT25UaWxlUmVtb3ZlZCA9IG9uVGlsZVJlbW92ZWQ7XHJcbiAgICAgICAgICAgIE9uVGlsZURyYXcgPSBvblRpbGVEcmF3O1xyXG4gICAgICAgICAgICBWaWV3cG9ydC5ab29tID0gKE1heFpvb20gKyAxKSAvIDI7XHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5MYXllckluZm9zICE9IG51bGwgJiYgc2V0dGluZ3MuTGF5ZXJJbmZvcy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCB6b29tID0gKGludClWaWV3cG9ydC5ab29tO1xyXG4gICAgICAgICAgICAgICAgaW50IHRpbGVDb3VudEZhY3RvciA9IChpbnQpTWF0aC5Qb3coMiwgem9vbSk7XHJcbiAgICAgICAgICAgICAgICBWaWV3cG9ydC5HcmlkU2l6ZS5TZXQoc2V0dGluZ3MuTGF5ZXJJbmZvc1swXS5EaW1lbnNpb25YICogdGlsZUNvdW50RmFjdG9yLCBzZXR0aW5ncy5MYXllckluZm9zWzBdLkRpbWVuc2lvblkgKiB0aWxlQ291bnRGYWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhc3RNb3VzZVBvc2l0aW9uID0gbmV3IFZlYzJpKCk7XHJcbiAgICAgICAgICAgIGlzTW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDaGFuZ2VTaXplKFZlYzJpIHNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWaWV3cG9ydC5QaXhlbFdpZHRoID0gc2l6ZS54O1xyXG4gICAgICAgICAgICBWaWV3cG9ydC5QaXhlbEhlaWdodCA9IHNpemUueTtcclxuXHJcbiAgICAgICAgICAgIFJlY2FsY3VsYXRlVmlld3BvcnRUaWxlQ291bnQoKTtcclxuICAgICAgICAgICAgVXBkYXRlVGlsZVBvc2l0aW9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlY2FsY3VsYXRlVmlld3BvcnRUaWxlQ291bnQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aWxlR3JpZCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aWxlR3JpZCA9IG5ldyBMaXN0PExpc3Q8TWFwVGlsZT4+KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludCB4Q291bnQgPSAoaW50KU1hdGguQ2VpbGluZygoZG91YmxlKVZpZXdwb3J0LlBpeGVsV2lkdGggLyBWaWV3cG9ydC5CYXNlVGlsZVBpeGVsU2l6ZSkgKiAyICsgMTtcclxuICAgICAgICAgICAgaW50IHlDb3VudCA9IChpbnQpTWF0aC5DZWlsaW5nKChkb3VibGUpVmlld3BvcnQuUGl4ZWxIZWlnaHQgLyBWaWV3cG9ydC5CYXNlVGlsZVBpeGVsU2l6ZSkgKiAyICsgMTtcclxuICAgICAgICAgICAgYm9vbCB1cGRhdGVBbGxSb3dzID0gKHRpbGVHcmlkLkNvdW50IDw9IDAgfHwgdGlsZUdyaWRbMF0uQ291bnQgIT0geENvdW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aWxlR3JpZC5Db3VudCA8IHlDb3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gbmV3IHJvd3Mgd2lsbCBiZSBhZGRlZFxyXG4gICAgICAgICAgICAgICAgaW50IGJlZ2luUm93ID0gdXBkYXRlQWxsUm93cyA/IDAgOiB0aWxlR3JpZC5Db3VudDtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSBiZWdpblJvdzsgeSA8IHlDb3VudDsgKyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aWxlR3JpZC5Db3VudCA8PSB5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWQuQWRkKG5ldyBMaXN0PE1hcFRpbGU+KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XSA9IFJlY2FsY3VsYXRlQ29sdW1ucyh5LCB4Q291bnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gcm93cyBhdCB0aGUgZW5kIHdpbGwgYmUgcmVtb3ZlZFxyXG4gICAgICAgICAgICAgICAgaW50IGVuZFJvdyA9IHVwZGF0ZUFsbFJvd3MgPyAwIDogeUNvdW50O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IHRpbGVHcmlkLkNvdW50IC0gMTsgeSA+PSBlbmRSb3c7IC0teSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGlsZUdyaWQuQ291bnQgPiB5Q291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHRpbGVHcmlkW3ldLkNvdW50OyArK3gpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVHcmlkW3ldW3hdLkltYWdlLlJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVHcmlkLlJlbW92ZUF0KHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV0gPSBSZWNhbGN1bGF0ZUNvbHVtbnMoeSwgeENvdW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PE1hcFRpbGU+IFJlY2FsY3VsYXRlQ29sdW1ucyhpbnQgeSwgaW50IHRhcmdldExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aWxlR3JpZFt5XS5Db3VudCA8IHRhcmdldExlbmd0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZWxlbWVudHMgd2lsbCBiZSBhZGRlZFxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IHRpbGVHcmlkW3ldLkNvdW50OyB4IDwgdGFyZ2V0TGVuZ3RoOyArK3gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV0uQWRkKENyZWF0ZU5ld1RpbGUoeCwgeSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZWxlbWVudHMgYXQgdGhlIGVuZCB3aWxsIGJlIHJlbW92ZWRcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSB0aWxlR3JpZFt5XS5Db3VudCAtIDE7IHggPj0gdGFyZ2V0TGVuZ3RoOyAtLXgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV1beF0uSW1hZ2UuUmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV0uUmVtb3ZlQXQoeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRpbGVHcmlkW3ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT25QcmVzcyhkb3VibGUgeCwgZG91YmxlIHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYXN0TW91c2VQb3NpdGlvbi5TZXQoeCwgeSk7XHJcbiAgICAgICAgICAgIGlzTW91c2VQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE9uUmVsZWFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT25Nb3ZlKGRvdWJsZSB4LCBkb3VibGUgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghaXNNb3VzZVByZXNzZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWMyaSBvbGRHcmlkUG9zaXRpb24gPSBWaWV3cG9ydC5HZXRUb3BMZWZ0R3JpZENvb3JkKCk7XHJcbiAgICAgICAgICAgIFZlYzJkIGRlbHRhID0gbmV3IFZlYzJkKGxhc3RNb3VzZVBvc2l0aW9uLnggLSB4LCBsYXN0TW91c2VQb3NpdGlvbi55IC0geSk7XHJcbiAgICAgICAgICAgIGxhc3RNb3VzZVBvc2l0aW9uLlNldCh4LCB5KTtcclxuICAgICAgICAgICAgVmlld3BvcnQuVHJhbnNsYXRlUGl4ZWwoZGVsdGEpO1xyXG4gICAgICAgICAgICBSb3RhdGVHcmlkQW5kVXBkYXRlVGlsZXMoVmlld3BvcnQuR2V0VG9wTGVmdEdyaWRDb29yZCgpIC0gb2xkR3JpZFBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFwVGlsZSBDcmVhdGVOZXdUaWxlKGludCB4LCBpbnQgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDdXJyZW50U2V0dGluZ3MuSW1hZ2VQcmVmYWIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTWFwVGlsZSB0ID0gbmV3IE1hcFRpbGUoQWN0aXZhdG9yLkNyZWF0ZUluc3RhbmNlKEN1cnJlbnRTZXR0aW5ncy5JbWFnZVByZWZhYi5HZXRUeXBlKCksIFZpZXdwb3J0LkJhc2VUaWxlUGl4ZWxTaXplKSBhcyBJTWFwVGlsZUltYWdlKTtcclxuICAgICAgICAgICAgdC5JbWFnZS5PbkluaXRpYWxpemUgKz0gT25UaWxlQ3JlYXRlZDtcclxuICAgICAgICAgICAgdC5JbWFnZS5PblJlbW92ZSArPSBPblRpbGVSZW1vdmVkO1xyXG4gICAgICAgICAgICB0LkltYWdlLk9uRHJhdyArPSBPblRpbGVEcmF3O1xyXG4gICAgICAgICAgICB0LkltYWdlLkluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgVmVjMmkgdmlld3BvcnRUb3BMZWZ0R3JpZCA9IFZpZXdwb3J0LkdldFRvcExlZnRHcmlkQ29vcmQoKTtcclxuICAgICAgICAgICAgdC5HcmlkUG9zaXRpb24uU2V0KHZpZXdwb3J0VG9wTGVmdEdyaWQueCArIHgsIHZpZXdwb3J0VG9wTGVmdEdyaWQueSArIHkpO1xyXG4gICAgICAgICAgICBpbnQgdGlsZVBpeGVsU2l6ZSA9IFZpZXdwb3J0LkdldFRpbGVTaXplUGl4ZWwoKTtcclxuICAgICAgICAgICAgVmVjMmkgcG9zaXRpb24gPSBuZXcgVmVjMmQoeCAqIHRpbGVQaXhlbFNpemUsIHkgKiB0aWxlUGl4ZWxTaXplKTtcclxuICAgICAgICAgICAgcG9zaXRpb24gKz0gVmlld3BvcnQuR2V0VG9wTGVmdFBpeGVsT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIHQuU2V0UGl4ZWxQb3NpdGlvbihwb3NpdGlvbiwgbmV3IFZlYzJpKHRpbGVQaXhlbFNpemUpKTtcclxuICAgICAgICAgICAgdC5Mb2FkSW1hZ2UoR2V0SW1hZ2VQYXRoKHgsIHkpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBab29tTWFwKGRvdWJsZSB4LCBkb3VibGUgeSwgZG91YmxlIGFtb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJpIG9sZEdyaWRQb3NpdGlvbiA9IFZpZXdwb3J0LkdldFRvcExlZnRHcmlkQ29vcmQoKTtcclxuICAgICAgICAgICAgVmVjMmQgbW91c2VQb3NPbGROb3JtID0gbmV3IFZlYzJkKFZpZXdwb3J0LlBpeGVsVG9Ob3JtWCgoaW50KXgpLCBWaWV3cG9ydC5QaXhlbFRvTm9ybVkoKGludCl5KSk7XHJcbiAgICAgICAgICAgIGRvdWJsZSBvbGRab29tID0gVmlld3BvcnQuWm9vbTtcclxuICAgICAgICAgICAgVmlld3BvcnQuWm9vbSArPSBhbW91bnQ7XHJcbiAgICAgICAgICAgIFZpZXdwb3J0Llpvb20gPSBVdGlsaXR5LkNsYW1wKFZpZXdwb3J0Llpvb20gKyBhbW91bnQsIE1pblpvb20sIE1heFpvb20gKyAwLjk5OTk5KTtcclxuICAgICAgICAgICAgaW50IG5ld1pvb20gPSAoaW50KVZpZXdwb3J0Llpvb207XHJcbiAgICAgICAgICAgIGlmICgoaW50KW9sZFpvb20gIT0gbmV3Wm9vbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IHRpbGVDb3VudEZhY3RvciA9IChpbnQpTWF0aC5Qb3coMiwgbmV3Wm9vbSk7XHJcbiAgICAgICAgICAgICAgICBWaWV3cG9ydC5HcmlkU2l6ZS5TZXQoQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3NbMF0uRGltZW5zaW9uWCAqIHRpbGVDb3VudEZhY3RvciwgQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3NbMF0uRGltZW5zaW9uWSAqIHRpbGVDb3VudEZhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICBWZWMyZCBtb3VzZVBvc05ld05vcm0gPSBuZXcgVmVjMmQoVmlld3BvcnQuUGl4ZWxUb05vcm1YKChpbnQpeCksIFZpZXdwb3J0LlBpeGVsVG9Ob3JtWSgoaW50KXkpKTtcclxuICAgICAgICAgICAgICAgIFZpZXdwb3J0LlRyYW5zbGF0ZU5vcm0obW91c2VQb3NPbGROb3JtIC0gbW91c2VQb3NOZXdOb3JtKTtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZUFsbFRpbGVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWMyZCBtb3VzZVBvc05ld05vcm0gPSBuZXcgVmVjMmQoVmlld3BvcnQuUGl4ZWxUb05vcm1YKChpbnQpeCksIFZpZXdwb3J0LlBpeGVsVG9Ob3JtWSgoaW50KXkpKTtcclxuICAgICAgICAgICAgICAgIFZpZXdwb3J0LlRyYW5zbGF0ZU5vcm0obW91c2VQb3NPbGROb3JtIC0gbW91c2VQb3NOZXdOb3JtKTtcclxuICAgICAgICAgICAgICAgIFJvdGF0ZUdyaWRBbmRVcGRhdGVUaWxlcyhWaWV3cG9ydC5HZXRUb3BMZWZ0R3JpZENvb3JkKCkgLSBvbGRHcmlkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgR2V0VGlsZUNvdW50WCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGlsZUdyaWQgIT0gbnVsbCAmJiB0aWxlR3JpZC5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aWxlR3JpZFswXS5Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBHZXRUaWxlQ291bnRZKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aWxlR3JpZCAhPSBudWxsID8gdGlsZUdyaWQuQ291bnQgOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBSb3RhdGVHcmlkQW5kVXBkYXRlVGlsZXMoVmVjMmkgcm90YXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5BYnMocm90YXRpb24ueCkgPj0gR2V0VGlsZUNvdW50WCgpIHx8IE1hdGguQWJzKHJvdGF0aW9uLnkpID49IEdldFRpbGVDb3VudFkoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlQWxsVGlsZXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJvdGF0aW9uLnggPT0gMCAmJiByb3RhdGlvbi55ID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVwZGF0ZVRpbGVQb3NpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVmVjMmkgZ3JpZFNpemUgPSBWaWV3cG9ydC5HcmlkU2l6ZTtcclxuICAgICAgICAgICAgVmVjMmkgbWFwUG9zaXRpb24gPSBWaWV3cG9ydC5HZXRUb3BMZWZ0R3JpZENvb3JkKCk7XHJcbiAgICAgICAgICAgIGludCB4Q291bnQgPSBHZXRUaWxlQ291bnRYKCk7XHJcbiAgICAgICAgICAgIGludCB5Q291bnQgPSBHZXRUaWxlQ291bnRZKCk7XHJcblxyXG4gICAgICAgICAgICByb3RhdGlvbi54ID0gVXRpbGl0eS5XcmFwKHJvdGF0aW9uLngsIC14Q291bnQsIHhDb3VudCk7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uLnkgPSBVdGlsaXR5LldyYXAocm90YXRpb24ueSwgLXlDb3VudCwgeUNvdW50KTtcclxuRmFudGFzeU1hcFByb2plY3QuVXRpbGl0eS5Sb3RhdGVMZWZ0PExpc3Q8TWFwVGlsZT4+KFxyXG4gICAgICAgICAgICB0aWxlR3JpZCxyb3RhdGlvbi55KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyb3RhdGlvbi54ICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgdGlsZUdyaWQuQ291bnQ7ICsreSlcclxuICAgICAgICAgICAgICAgIHtcclxuRmFudGFzeU1hcFByb2plY3QuVXRpbGl0eS5Sb3RhdGVMZWZ0PE1hcFRpbGU+KCAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV0scm90YXRpb24ueCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyb3RhdGlvbi55ICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJvb2wgcm90YXRpb25XYXNEb3duID0gcm90YXRpb24ueSA+IDA7XHJcbiAgICAgICAgICAgICAgICBpbnQgYmVnaW5Sb3cgPSByb3RhdGlvbldhc0Rvd24gPyAoeUNvdW50IC0gcm90YXRpb24ueSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgaW50IGVuZFJvdyA9IHJvdGF0aW9uV2FzRG93biA/IHlDb3VudCA6IC1yb3RhdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJlZ2luUm93OyB5IDwgZW5kUm93OyArK3kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCB4Q291bnQ7ICsreClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVHcmlkW3ldW3hdLlVwZGF0ZVRpbGUobWFwUG9zaXRpb24sIHgsIHksIGdyaWRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJvdGF0aW9uLnggIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9vbCByb3RhdGlvbldhc1JpZ2h0ID0gcm90YXRpb24ueCA+IDA7XHJcbiAgICAgICAgICAgICAgICBpbnQgYmVnaW5Db2wgPSByb3RhdGlvbldhc1JpZ2h0ID8gKHhDb3VudCAtIHJvdGF0aW9uLngpIDogMDtcclxuICAgICAgICAgICAgICAgIGludCBlbmRDb2wgPSByb3RhdGlvbldhc1JpZ2h0ID8geENvdW50IDogLXJvdGF0aW9uLng7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IHlDb3VudDsgKyt5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSBiZWdpbkNvbDsgeCA8IGVuZENvbDsgKyt4KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUdyaWRbeV1beF0uVXBkYXRlVGlsZShtYXBQb3NpdGlvbiwgeCwgeSwgZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBVcGRhdGVUaWxlUG9zaXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlQWxsVGlsZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmkgZ3JpZFNpemUgPSBWaWV3cG9ydC5HcmlkU2l6ZTtcclxuICAgICAgICAgICAgVmVjMmkgbWFwUG9zaXRpb24gPSBWaWV3cG9ydC5HZXRUb3BMZWZ0R3JpZENvb3JkKCk7XHJcbiAgICAgICAgICAgIFZlYzJpIG9mZnNldCA9IFZpZXdwb3J0LkdldFRvcExlZnRQaXhlbE9mZnNldCgpO1xyXG4gICAgICAgICAgICBpbnQgdGlsZVBpeGVsU2l6ZSA9IFZpZXdwb3J0LkdldFRpbGVTaXplUGl4ZWwoKTtcclxuICAgICAgICAgICAgaW50IHhDb3VudCA9IEdldFRpbGVDb3VudFgoKTtcclxuICAgICAgICAgICAgaW50IHlDb3VudCA9IEdldFRpbGVDb3VudFkoKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCB5Q291bnQ7ICsreSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCB4Q291bnQ7ICsreClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XVt4XS5VcGRhdGVUaWxlKG1hcFBvc2l0aW9uLCB4LCB5LCBncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlVGlsZVBvc2l0aW9uKG1hcFBvc2l0aW9uLCBncmlkU2l6ZSwgeCwgeSwgdGlsZVBpeGVsU2l6ZSwgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZVRpbGVQb3NpdGlvbnMoYm9vbCByZWxvYWRBbGwgPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJpIGdyaWRTaXplID0gVmlld3BvcnQuR3JpZFNpemU7XHJcbiAgICAgICAgICAgIFZlYzJpIG1hcFBvc2l0aW9uID0gVmlld3BvcnQuR2V0VG9wTGVmdEdyaWRDb29yZCgpO1xyXG4gICAgICAgICAgICBWZWMyaSBvZmZzZXQgPSBWaWV3cG9ydC5HZXRUb3BMZWZ0UGl4ZWxPZmZzZXQoKTtcclxuICAgICAgICAgICAgaW50IHRpbGVQaXhlbFNpemUgPSBWaWV3cG9ydC5HZXRUaWxlU2l6ZVBpeGVsKCk7XHJcbiAgICAgICAgICAgIGludCB4Q291bnQgPSBHZXRUaWxlQ291bnRYKCk7XHJcbiAgICAgICAgICAgIGludCB5Q291bnQgPSBHZXRUaWxlQ291bnRZKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IHlDb3VudDsgKyt5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IHhDb3VudDsgKyt4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxvYWRBbGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlR3JpZFt5XVt4XS5OZWVkUmVsb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlVGlsZVBvc2l0aW9uKG1hcFBvc2l0aW9uLCBncmlkU2l6ZSwgeCwgeSwgdGlsZVBpeGVsU2l6ZSwgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZVRpbGVQb3NpdGlvbihWZWMyaSBtYXBQb3NpdGlvbiwgVmVjMmkgZ3JpZFNpemUsIGludCB4LCBpbnQgeSwgaW50IHRpbGVQaXhlbFNpemUsIFZlYzJpIG9mZnNldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh5IDwgMCB8fCB5ID49IHRpbGVHcmlkLkNvdW50IHx8IHggPCAwIHx8IHggPiB0aWxlR3JpZFt5XS5Db3VudCB8fCBvZmZzZXQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBNYXBUaWxlIHQgPSB0aWxlR3JpZFt5XVt4XTtcclxuICAgICAgICAgICAgaWYgKHQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aWxlR3JpZFt5XVt4XS5VcGRhdGVUaWxlKG1hcFBvc2l0aW9uLCB4LCB5LCBncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIFZlYzJpIHBvc2l0aW9uID0gbmV3IFZlYzJkKHggKiB0aWxlUGl4ZWxTaXplLCB5ICogdGlsZVBpeGVsU2l6ZSk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uICs9IG9mZnNldDtcclxuICAgICAgICAgICAgdC5TZXRQaXhlbFBvc2l0aW9uKHBvc2l0aW9uLCBuZXcgVmVjMmkodGlsZVBpeGVsU2l6ZSkpO1xyXG4gICAgICAgICAgICBpZiAodC5OZWVkUmVsb2FkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0LkxvYWRJbWFnZShHZXRJbWFnZVBhdGgodC5HcmlkUG9zaXRpb24ueCwgdC5HcmlkUG9zaXRpb24ueSkpO1xyXG4gICAgICAgICAgICAgICAgdC5OZWVkUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEdldEltYWdlUGF0aChpbnQgeCwgaW50IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgem9vbSA9IChpbnQpVmlld3BvcnQuWm9vbTtcclxuICAgICAgICAgICAgaWYgKEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zID09IG51bGwgfHwgQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3MuQ291bnQgPD0gem9vbSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGludCB0aWxlQ291bnRGYWN0b3IgPSAoaW50KU1hdGguUG93KDIsIHpvb20pO1xyXG4gICAgICAgICAgICBpbnQgd3JhcHBlZFggPSBVdGlsaXR5LldyYXAoeCwgMCwgQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3NbMF0uRGltZW5zaW9uWCAqIHRpbGVDb3VudEZhY3Rvcik7XHJcbiAgICAgICAgICAgIGludCB3cmFwcGVkWSA9IFV0aWxpdHkuV3JhcCh5LCAwLCBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvc1swXS5EaW1lbnNpb25ZICogdGlsZUNvdW50RmFjdG9yKTtcclxuICAgICAgICAgICAgaWYgKHdyYXBwZWRYID49IEN1cnJlbnRTZXR0aW5ncy5MYXllckluZm9zW3pvb21dLkRpbWVuc2lvblggfHwgd3JhcHBlZFkgPj0gQ3VycmVudFNldHRpbmdzLkxheWVySW5mb3Nbem9vbV0uRGltZW5zaW9uWSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5FbXB0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnQgaWQgPSAod3JhcHBlZFkgKiBDdXJyZW50U2V0dGluZ3MuTGF5ZXJJbmZvc1t6b29tXS5EaW1lbnNpb25YICsgd3JhcHBlZFggKyAxKTtcclxuICAgICAgICAgICAgc3RyaW5nIHBhdGggPSBAXCJpbWcvTGF5ZXJcIiArIHpvb20gKyBAXCIvdGlsZV9cIjtcclxuICAgICAgICAgICAgcGF0aCArPSBpZCA8IDEwID8gXCIwXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBwYXRoICs9IGlkO1xyXG4gICAgICAgICAgICBwYXRoICs9IFwiLmpwZ1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgRmFudGFzeU1hcFByb2plY3Q7XHJcblxyXG5uYW1lc3BhY2UgTWFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNYXBUaWxlXHJcblx0e1xyXG5cdFx0cHVibGljIE1hcFRpbGUoSU1hcFRpbGVJbWFnZSBpbWFnZSlcclxuXHRcdHtcclxuXHRcdFx0SW1hZ2UgPSBpbWFnZTtcclxuXHRcdFx0R3JpZFBvc2l0aW9uID0gbmV3IFZlYzJpKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHZvaWQgTG9hZEltYWdlKHN0cmluZyBmaWxlbmFtZSlcclxuXHRcdHtcclxuXHRcdFx0aWYgKEltYWdlID09IG51bGwpIHJldHVybjtcclxuXHRcdFx0SW1hZ2UuTG9hZChmaWxlbmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHZvaWQgVXBkYXRlVGlsZShWZWMyaSBtYXBQb3NpdGlvbiwgaW50IHgsIGludCB5LCBWZWMyaSBncmlkU2l6ZSlcclxuXHRcdHtcclxuXHRcdFx0aWYgKEdyaWRQb3NpdGlvbiA9PSBudWxsKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0R3JpZFBvc2l0aW9uID0gbmV3IFZlYzJpKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0R3JpZFBvc2l0aW9uLnggPSBVdGlsaXR5LldyYXAoeCArIG1hcFBvc2l0aW9uLngsIDAsIGdyaWRTaXplLngpO1xyXG5cdFx0XHRHcmlkUG9zaXRpb24ueSA9IFV0aWxpdHkuV3JhcCh5ICsgbWFwUG9zaXRpb24ueSwgMCwgZ3JpZFNpemUueSk7XHJcblx0XHRcdEltYWdlLkdyaWRQb3NpdGlvbiA9IEdyaWRQb3NpdGlvbjtcclxuXHRcdFx0SW1hZ2UuTWFwUG9zaXRpb24gPSBtYXBQb3NpdGlvbjtcclxuXHRcdFx0TmVlZFJlbG9hZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHZvaWQgU2V0UGl4ZWxQb3NpdGlvbihWZWMyaSBwb3NpdGlvbiwgVmVjMmkgcmVuZGVyU2l6ZSlcclxuXHRcdHtcclxuXHRcdFx0aWYgKEltYWdlID09IG51bGwpIHJldHVybjtcclxuXHRcdFx0SW1hZ2UuUGl4ZWxQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cdFx0XHRJbWFnZS5QaXhlbFJlbmRlclNpemUgPSByZW5kZXJTaXplO1xyXG5cdFx0XHRJbWFnZS5EcmF3KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElNYXBUaWxlSW1hZ2UgSW1hZ2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblx0XHRwdWJsaWMgVmVjMmkgR3JpZFBvc2l0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cdFx0cHVibGljIGJvb2wgTmVlZFJlbG9hZCB7IGdldDsgc2V0OyB9XHJcblx0fVxyXG59XHJcbiIsInVzaW5nIEZhbnRhc3lNYXBQcm9qZWN0O1xyXG5cclxubmFtZXNwYWNlIE1hcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTWFwVmlld3BvcnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjMmQgVG9wTGVmdE5vcm0geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIFZlYzJpIEdyaWRTaXplIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFpvb20geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBpbnQgUGl4ZWxXaWR0aCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBQaXhlbEhlaWdodCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBCYXNlVGlsZVBpeGVsU2l6ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNYXBWaWV3cG9ydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUb3BMZWZ0Tm9ybSA9IG5ldyBWZWMyZCgpO1xyXG4gICAgICAgICAgICBHcmlkU2l6ZSA9IG5ldyBWZWMyaSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVHJhbnNsYXRlTm9ybShWZWMyZCBub3JtT2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9wTGVmdE5vcm0gPSBUb3BMZWZ0Tm9ybSArIG5vcm1PZmZzZXQ7XHJcbiAgICAgICAgICAgIFRvcExlZnROb3JtLnggPSBVdGlsaXR5LldyYXAoVG9wTGVmdE5vcm0ueCwgMC4wLCAxLjApO1xyXG4gICAgICAgICAgICBUb3BMZWZ0Tm9ybS55ID0gVXRpbGl0eS5XcmFwKFRvcExlZnROb3JtLnksIDAuMCwgMS4wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRyYW5zbGF0ZVBpeGVsKFZlYzJpIHBpeGVsT2Zmc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHJhbnNsYXRlTm9ybShuZXcgVmVjMmQoUGl4ZWxUb05vcm1YKHBpeGVsT2Zmc2V0LngpLCBQaXhlbFRvTm9ybVkocGl4ZWxPZmZzZXQueSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyZCBHZXRDZW50ZXJOb3JtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChUb3BMZWZ0Tm9ybSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIFZlYzJkIGNlbnRlciA9IFRvcExlZnROb3JtICsgbmV3IFZlYzJkKEdldFdpZHRoTm9ybSgpIC8gMiwgR2V0SGVpZ2h0Tm9ybSgpIC8gMik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmQoVXRpbGl0eS5XcmFwKGNlbnRlci54LCAwLjAsIDEuMCksIFV0aWxpdHkuV3JhcChjZW50ZXIueSwgMC4wLCAxLjApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZWMyaSBHZXRUb3BMZWZ0R3JpZENvb3JkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJkIHRpbGVTaXplID0gR2V0VGlsZVNpemVOb3JtKCk7XHJcbiAgICAgICAgICAgIGlmIChUb3BMZWZ0Tm9ybSA9PSBudWxsIHx8IHRpbGVTaXplID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyaShUb3BMZWZ0Tm9ybS54IC8gdGlsZVNpemUueCwgVG9wTGVmdE5vcm0ueSAvIHRpbGVTaXplLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJpIEdldFRvcExlZnRQaXhlbE9mZnNldChib29sIHdyYXAgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjMmQgdGlsZVNpemVOb3JtID0gR2V0VGlsZVNpemVOb3JtKCk7XHJcbiAgICAgICAgICAgIFZlYzJkIHRvcExlZnRHcmlkID0gR2V0VG9wTGVmdEdyaWRDb29yZCgpO1xyXG4gICAgICAgICAgICBpbnQgdGlsZVBpeGVsU2l6ZSA9IEdldFRpbGVTaXplUGl4ZWwoKTtcclxuICAgICAgICAgICAgaWYgKHRpbGVTaXplTm9ybSA9PSBudWxsIHx8IFRvcExlZnROb3JtID09IG51bGwgfHwgdG9wTGVmdEdyaWQgPT0gbnVsbCB8fCBHcmlkU2l6ZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgaW50IHggPSAoaW50KSgodG9wTGVmdEdyaWQueCAqIHRpbGVTaXplTm9ybS54IC0gVG9wTGVmdE5vcm0ueCkgKiB0aWxlUGl4ZWxTaXplICogR3JpZFNpemUueCk7XHJcbiAgICAgICAgICAgIGludCB5ID0gKGludCkoKHRvcExlZnRHcmlkLnkgKiB0aWxlU2l6ZU5vcm0ueSAtIFRvcExlZnROb3JtLnkpICogdGlsZVBpeGVsU2l6ZSAqIEdyaWRTaXplLnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzJpKHgsIHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlYzJpIEdldE5vcm1Ub1BpeGVsQ29vcmQoVmVjMmQgbm9ybUNvb3JkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHRpbGVTaXplUGl4ZWwgPSBHZXRUaWxlU2l6ZVBpeGVsKCk7XHJcbiAgICAgICAgICAgIGlmIChUb3BMZWZ0Tm9ybSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmkoKG5vcm1Db29yZC54IC0gVG9wTGVmdE5vcm0ueCkgKiB0aWxlU2l6ZVBpeGVsICogR3JpZFNpemUueCwgKG5vcm1Db29yZC55IC0gVG9wTGVmdE5vcm0ueSkgKiB0aWxlU2l6ZVBpeGVsICogR3JpZFNpemUueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVmVjMmQgR2V0VGlsZVNpemVOb3JtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChHcmlkU2l6ZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMmQoMS4wIC8gR3JpZFNpemUueCwgMS4wIC8gR3JpZFNpemUueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIEdldFdpZHRoTm9ybSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWMyZCB0aWxlU2l6ZU5vcm0gPSBHZXRUaWxlU2l6ZU5vcm0oKTtcclxuICAgICAgICAgICAgaWYgKHRpbGVTaXplTm9ybSA9PSBudWxsKSByZXR1cm4gMC4wO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChQaXhlbFdpZHRoIC8gR2V0VGlsZVNpemVQaXhlbCgpKSAqIHRpbGVTaXplTm9ybS54O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBHZXRIZWlnaHROb3JtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJkIHRpbGVTaXplTm9ybSA9IEdldFRpbGVTaXplTm9ybSgpO1xyXG4gICAgICAgICAgICBpZiAodGlsZVNpemVOb3JtID09IG51bGwpIHJldHVybiAwLjA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFBpeGVsSGVpZ2h0IC8gR2V0VGlsZVNpemVQaXhlbCgpKSAqIHRpbGVTaXplTm9ybS55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBHZXRUaWxlU2l6ZVBpeGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaW50KVN5c3RlbS5NYXRoLlJvdW5kKEJhc2VUaWxlUGl4ZWxTaXplIC8gMiArIChCYXNlVGlsZVBpeGVsU2l6ZSAvIDIpICogKFpvb20gLSAoaW50KVpvb20pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgUGl4ZWxUb05vcm1YKGludCBwaXhlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJkIHRpbGVTaXplTm9ybSA9IEdldFRpbGVTaXplTm9ybSgpO1xyXG4gICAgICAgICAgICBpZiAocGl4ZWwgPT0gMCB8fCB0aWxlU2l6ZU5vcm0gPT0gbnVsbCkgcmV0dXJuIDAuMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKGRvdWJsZSlwaXhlbCAvIEdldFRpbGVTaXplUGl4ZWwoKSkgKiB0aWxlU2l6ZU5vcm0ueDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgUGl4ZWxUb05vcm1ZKGludCBwaXhlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlYzJkIHRpbGVTaXplTm9ybSA9IEdldFRpbGVTaXplTm9ybSgpO1xyXG4gICAgICAgICAgICBpZiAocGl4ZWwgPT0gMCB8fCB0aWxlU2l6ZU5vcm0gPT0gbnVsbCkgcmV0dXJuIDAuMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKGRvdWJsZSlwaXhlbCAvIEdldFRpbGVTaXplUGl4ZWwoKSkgKiB0aWxlU2l6ZU5vcm0ueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEZhbnRhc3lNYXBQcm9qZWN0O1xyXG51c2luZyBNYXA7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgV2ViXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGRvdWJsZSBaT09NX1NQRUVEID0gMC4wNTtcclxuXHJcbiAgICAgICAgcmVhZG9ubHkgSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzU2NyZWVuO1xyXG4gICAgICAgIHJlYWRvbmx5IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBjdHg7XHJcblxyXG4gICAgICAgIHByaXZhdGUgTWFwTWFuYWdlciBNYXAgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFZlYzJpIExhc3RNb3VzZVBvcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgTGFzdFBpbmNoR2VzdHVyZURpc3RhbmNlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEFwcChIVE1MQ2FudmFzRWxlbWVudCBzY3JlZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhc1NjcmVlbiA9IHNjcmVlbjtcclxuICAgICAgICAgICAgY3R4ID0gc2NyZWVuLkdldENvbnRleHQoQ2FudmFzVHlwZXMuQ2FudmFzQ29udGV4dDJEVHlwZS5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xyXG4gICAgICAgICAgICBjdHguSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgTGFzdE1vdXNlUG9zID0gbmV3IFZlYzJpKCk7XHJcbiAgICAgICAgICAgIExhc3RQaW5jaEdlc3R1cmVEaXN0YW5jZSA9IDAuMDtcclxuXHJcbiAgICAgICAgICAgIFdpbmRvdy5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5SZXNpemUsIChBY3Rpb248RXZlbnQ+KU9uU2l6ZUNoYW5nZWQpO1xyXG4gICAgICAgICAgICBzY3JlZW4uQWRkRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuV2hlZWwsIChBY3Rpb248RXZlbnQ+KU9uTW91c2VXaGVlbCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5Nb3VzZURvd24sIChBY3Rpb248RXZlbnQ+KU9uTW91c2VEb3duKTtcclxuICAgICAgICAgICAgc2NyZWVuLkFkZEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLk1vdXNlVXAsIChBY3Rpb248RXZlbnQ+KU9uTW91c2VVcCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5Nb3VzZU1vdmUsIChBY3Rpb248RXZlbnQ+KU9uTW91c2VNb3ZlKTtcclxuICAgICAgICAgICAgc2NyZWVuLkFkZEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlRvdWNoU3RhcnQsIChBY3Rpb248RXZlbnQ+KU9uVG91Y2hTdGFydCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5Ub3VjaEVuZCwgKEFjdGlvbjxFdmVudD4pT25Ub3VjaEVuZCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5Ub3VjaE1vdmUsIChBY3Rpb248RXZlbnQ+KU9uVG91Y2hNb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIFJlYWRMYXllckluZm9zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVhZExheWVySW5mb3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWE1MSHR0cFJlcXVlc3QgeG1sUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4bWxSZXF1ZXN0Lk9uUmVhZHlTdGF0ZUNoYW5nZSArPSAoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeG1sUmVxdWVzdC5SZWFkeVN0YXRlID09IEFqYXhSZWFkeVN0YXRlLkRvbmUgJiYgeG1sUmVxdWVzdC5TdGF0dXMgPT0gMjAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExpc3Q8TGF5ZXJJbmZvPiBsYXllckluZm9zID0gbmV3IExpc3Q8TGF5ZXJJbmZvPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhUTUxDb2xsZWN0aW9uIHJvb3QgPSB4bWxSZXF1ZXN0LlJlc3BvbnNlWE1MLkdldEVsZW1lbnRzQnlUYWdOYW1lKFwiTGF5ZXJJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhUTUxDb2xsZWN0aW9uIGVsZW1lbnRzID0geG1sUmVxdWVzdC5SZXNwb25zZVhNTC5HZXRFbGVtZW50c0J5VGFnTmFtZShcIkxheWVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludCBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgY2hpbGQgaW4gZWxlbWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGRpbWVuc2lvblggPSBpbnQuUGFyc2UoY2hpbGQuR2V0QXR0cmlidXRlKFwiRGltZW5zaW9uWFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBkaW1lbnNpb25ZID0gaW50LlBhcnNlKGNoaWxkLkdldEF0dHJpYnV0ZShcIkRpbWVuc2lvbllcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllckluZm9zLkFkZChuZXcgTGF5ZXJJbmZvKGksIGRpbWVuc2lvblgsIGRpbWVuc2lvblkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTWFwTWFuYWdlci5TZXR0aW5ncyBtYXBTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgICAgICBtYXBTZXR0aW5ncy5JbWFnZVByZWZhYiA9IG5ldyBXZWJNYXBUaWxlSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBTZXR0aW5ncy5MYXllckluZm9zID0gbGF5ZXJJbmZvcztcclxuICAgICAgICAgICAgICAgICAgICBtYXBTZXR0aW5ncy5UaWxlU2l6ZSA9IGludC5QYXJzZShyb290WzBdLkdldEF0dHJpYnV0ZShcIlRpbGVTaXplXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBNYXAgPSBuZXcgTWFwTWFuYWdlcihtYXBTZXR0aW5ncywgQWRkVG9DYW52YXMsIFJlbW92ZUZyb21DYW52YXMsIERyYXdPbkNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN0cmluZyBkb2NVcmwgPSBEb2N1bWVudC5VUkw7XHJcbiAgICAgICAgICAgIGRvY1VybCA9IGRvY1VybC5TdWJzdHJpbmcoMCwgZG9jVXJsLkxhc3RJbmRleE9mKCcvJykpO1xyXG4gICAgICAgICAgICB4bWxSZXF1ZXN0Lk9wZW4oXCJHRVRcIiwgZG9jVXJsICsgXCIvaW1nL0xheWVySW5mby54bWxcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB4bWxSZXF1ZXN0Lk92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3htbFwiKTtcclxuICAgICAgICAgICAgeG1sUmVxdWVzdC5TZW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQWRkVG9DYW52YXMob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2lmIChzZW5kZXIgIT0gbnVsbCAmJiBzZW5kZXIgaXMgV2ViTWFwVGlsZUltYWdlKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlbW92ZUZyb21DYW52YXMob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc2VuZGVyICE9IG51bGwgJiYgc2VuZGVyIGlzIFdlYk1hcFRpbGVJbWFnZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgV2ViTWFwVGlsZUltYWdlIHRpbGUgPSBzZW5kZXIgYXMgV2ViTWFwVGlsZUltYWdlO1xyXG4gICAgICAgICAgICAgICAgdGlsZS5JbWFnZS5SZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIERyYXdPbkNhbnZhcyhvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChzZW5kZXIgIT0gbnVsbCAmJiBzZW5kZXIgaXMgV2ViTWFwVGlsZUltYWdlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBXZWJNYXBUaWxlSW1hZ2UgdGlsZSA9IHNlbmRlciBhcyBXZWJNYXBUaWxlSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBjdHguU2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgY3R4Lkdsb2JhbEFscGhhID0gMWY7XHJcbiAgICAgICAgICAgICAgICBjdHguRmlsbFN0eWxlID0gXCJncmF5XCI7XHJcbiAgICAgICAgICAgICAgICBjdHguRmlsbFJlY3QodGlsZS5QaXhlbFBvc2l0aW9uLngsIHRpbGUuUGl4ZWxQb3NpdGlvbi55LCB0aWxlLlBpeGVsUmVuZGVyU2l6ZS54LCB0aWxlLlBpeGVsUmVuZGVyU2l6ZS55KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLlZpc2libGUgJiYgdGlsZS5JbWFnZS5Db21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHguRHJhd0ltYWdlKHRpbGUuSW1hZ2UsIHRpbGUuUGl4ZWxQb3NpdGlvbi54LCB0aWxlLlBpeGVsUG9zaXRpb24ueSwgdGlsZS5QaXhlbFJlbmRlclNpemUueCwgdGlsZS5QaXhlbFJlbmRlclNpemUueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdHguUmVzdG9yZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDYWxjdWxhdGVSZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG91YmxlIGRldlB4ID0gMDtcclxuICAgICAgICAgICAgU2NyaXB0LldyaXRlKFwiZGV2UHggPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcIik7XHJcbiAgICAgICAgICAgIGNhbnZhc1NjcmVlbi5XaWR0aCA9IChpbnQpTWF0aC5Sb3VuZChXaW5kb3cuSW5uZXJXaWR0aCAqIGRldlB4KTtcclxuICAgICAgICAgICAgY2FudmFzU2NyZWVuLkhlaWdodCA9IChpbnQpTWF0aC5Sb3VuZChXaW5kb3cuSW5uZXJIZWlnaHQgKiBkZXZQeCk7XHJcbiAgICAgICAgICAgIGlmIChNYXAgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWFwLkNoYW5nZVNpemUobmV3IFZlYzJpKGNhbnZhc1NjcmVlbi5XaWR0aCwgY2FudmFzU2NyZWVuLkhlaWdodCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25TaXplQ2hhbmdlZChFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FsY3VsYXRlUmVzaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25Nb3VzZVdoZWVsKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoTWFwICE9IG51bGwgJiYgZS5Jc01vdXNlRXZlbnQoKSAmJiBlIGlzIFdoZWVsRXZlbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB3ZSA9IChXaGVlbEV2ZW50KWU7XHJcbiAgICAgICAgICAgICAgICBNYXAuWm9vbU1hcChMYXN0TW91c2VQb3MueCwgTGFzdE1vdXNlUG9zLnksIHdlLkRlbHRhWSA+IDAgPyAtWk9PTV9TUEVFRCA6IFpPT01fU1BFRUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25Nb3VzZURvd24oRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChNYXAgIT0gbnVsbCAmJiBlLklzTW91c2VFdmVudCgpICYmIGUgaXMgTW91c2VFdmVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lID0gKE1vdXNlRXZlbnQpZTtcclxuICAgICAgICAgICAgICAgIE1hcC5PblByZXNzKG1lLkNsaWVudFgsIG1lLkNsaWVudFkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25Nb3VzZVVwKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoTWFwICE9IG51bGwgJiYgZS5Jc01vdXNlRXZlbnQoKSAmJiBlIGlzIE1vdXNlRXZlbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1hcC5PblJlbGVhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uTW91c2VNb3ZlKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoTWFwICE9IG51bGwgJiYgZS5Jc01vdXNlRXZlbnQoKSAmJiBlIGlzIE1vdXNlRXZlbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZSA9IChNb3VzZUV2ZW50KWU7XHJcbiAgICAgICAgICAgICAgICBMYXN0TW91c2VQb3MuU2V0KG1lLkNsaWVudFgsIG1lLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgTWFwLk9uTW92ZShtZS5DbGllbnRYLCBtZS5DbGllbnRZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uVG91Y2hFbmQoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChNYXAgIT0gbnVsbCAmJiBlIGlzIFRvdWNoRXZlbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZSA9IChUb3VjaEV2ZW50KWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGUgIT0gbnVsbCAmJiAodGUuVG91Y2hlcyA9PSBudWxsIHx8IHRlLlRvdWNoZXMuTGVuZ3RoID09IDApKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1hcC5PblJlbGVhc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uVG91Y2hTdGFydChFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE1hcCAhPSBudWxsICYmIGUgaXMgVG91Y2hFdmVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlID0gKFRvdWNoRXZlbnQpZTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZSAhPSBudWxsICYmIHRlLlRvdWNoZXMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGUuVG91Y2hlcy5MZW5ndGggPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvdWNoIHQgPSB0ZS5Ub3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXN0TW91c2VQb3MuU2V0KHQuQ2xpZW50WCwgdC5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFwLk9uUHJlc3ModC5DbGllbnRYLCB0LkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZS5Ub3VjaGVzLkxlbmd0aCA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG91Y2ggdDEgPSB0ZS5Ub3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3VjaCB0MiA9IHRlLlRvdWNoZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlYzJpIHQxUG9zID0gbmV3IFZlYzJpKHQxLkNsaWVudFgsIHQxLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWMyaSB0MlBvcyA9IG5ldyBWZWMyaSh0Mi5DbGllbnRYLCB0Mi5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG91YmxlIGRpc3RhbmNlID0gVmVjMmkuRGlzdGFuY2UodDFQb3MsIHQyUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGFzdFBpbmNoR2VzdHVyZURpc3RhbmNlID0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgT25Ub3VjaE1vdmUoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChNYXAgIT0gbnVsbCAmJiBlIGlzIFRvdWNoRXZlbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZSA9IChUb3VjaEV2ZW50KWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGUgIT0gbnVsbCAmJiB0ZS5Ub3VjaGVzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlLlRvdWNoZXMuTGVuZ3RoID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3VjaCB0ID0gdGUuVG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGFzdE1vdXNlUG9zLlNldCh0LkNsaWVudFgsIHQuQ2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hcC5Pbk1vdmUodC5DbGllbnRYLCB0LkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZS5Ub3VjaGVzLkxlbmd0aCA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG91Y2ggdDEgPSB0ZS5Ub3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3VjaCB0MiA9IHRlLlRvdWNoZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlYzJpIHQxUG9zID0gbmV3IFZlYzJpKHQxLkNsaWVudFgsIHQxLkNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWMyaSB0MlBvcyA9IG5ldyBWZWMyaSh0Mi5DbGllbnRYLCB0Mi5DbGllbnRZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmVjMmkgbWlkID0gKHQxUG9zICsgdDJQb3MpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG91YmxlIGRpc3RhbmNlID0gVmVjMmkuRGlzdGFuY2UodDFQb3MsIHQyUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG91YmxlIGRlbHRhID0gTGFzdFBpbmNoR2VzdHVyZURpc3RhbmNlIC0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExhc3RQaW5jaEdlc3R1cmVEaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXAuWm9vbU1hcChtaWQueCwgbWlkLnksIGRlbHRhICogLVpPT01fU1BFRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGUuVG91Y2hlcy5MZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5QcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEZhbnRhc3lNYXBQcm9qZWN0O1xuXG5uYW1lc3BhY2UgV2ViXG57XG4gICAgcHVibGljIGNsYXNzIFdlYk1hcFRpbGVJbWFnZSA6IElNYXBUaWxlSW1hZ2VcbiAgICB7XG4gICAgICAgIHB1YmxpYyBWZWMyaSBHcmlkUG9zaXRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgVmVjMmkgTWFwUG9zaXRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgVmVjMmkgUGl4ZWxQb3NpdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBWZWMyaSBQaXhlbFJlbmRlclNpemUgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXIgT25Jbml0aWFsaXplO1xuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyIE9uUmVtb3ZlO1xuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyIE9uRHJhdztcblxuICAgICAgICBwdWJsaWMgSFRNTEltYWdlRWxlbWVudCBJbWFnZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgVmlzaWJsZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFdlYk1hcFRpbGVJbWFnZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEltYWdlID0gbmV3IEhUTUxJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIEltYWdlLk9uTG9hZCArPSAoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBPbkRyYXchPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pk9uRHJhdy5JbnZva2UodGhpcywgbmV3IEV2ZW50QXJncygpKSk6bnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplKClcbiAgICAgICAge1xuICAgICAgICAgICAgT25Jbml0aWFsaXplIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tTGFtYmRhKCgpPT5PbkluaXRpYWxpemUuSW52b2tlKHRoaXMsIG5ldyBFdmVudEFyZ3MoKSkpOm51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBPblJlbW92ZSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+T25SZW1vdmUuSW52b2tlKHRoaXMsIG5ldyBFdmVudEFyZ3MoKSkpOm51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KClcbiAgICAgICAge1xuICAgICAgICAgICAgLy9PbkRyYXc/Lkludm9rZSh0aGlzLCBuZXcgRXZlbnRBcmdzKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgTG9hZChzdHJpbmcgZmlsZW5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEltYWdlLlNyYyA9IGZpbGVuYW1lO1xuICAgICAgICAgICAgVmlzaWJsZSA9ICFzdHJpbmcuSXNOdWxsT3JFbXB0eShmaWxlbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbmV3IFR5cGUgR2V0VHlwZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5HZXRUeXBlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXQp9Cg==
