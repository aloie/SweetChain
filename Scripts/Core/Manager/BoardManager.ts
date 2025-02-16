import { _decorator, Component, Node, Prefab, instantiate, Vec3, UITransform } from 'cc';
import { view } from 'cc';
import { DessertController } from '../../Gameplay/Mechanics/DessertController';
const { ccclass, property } = _decorator;

@ccclass('BoardManager')
export class BoardManager extends Component {
    @property(Prefab)
    private dessertPrefab: Prefab = null; // 甜点预制体

    @property(Node)
    private boardNode: Node = null; // 棋盘节点

    private readonly BOARD_SIZE = 7; // 棋盘大小（7x7）
    private readonly CELL_SIZE = 80; // 每个格子的大小
    private _grid: Node[][] = []; // 棋盘网格

    static instance: BoardManager = null;

    onLoad() {
        BoardManager.instance = this;
        this.initBoard();
    }

    private calculateCellSize(): number {
        const screenWidth = view.getVisibleSize().width;
        const maxBoardWidth = screenWidth * 0.8; // 棋盘占屏幕宽度的80%
        return Math.floor(maxBoardWidth / this.BOARD_SIZE);
    }

    // initBoard() {
    //     const cellSize = this.calculateCellSize();
    //     const boardSize = cellSize * this.BOARD_SIZE;
    //     this.boardNode.getComponent(UITransform).setContentSize(boardSize, boardSize);
    
    //     // 确保棋盘居中
    //     const screenSize = view.getVisibleSize();
    //     this.boardNode.setPosition(screenSize.width / 2, screenSize.height / 2, 0);
    
    //     for (let y = 0; y < this.BOARD_SIZE; y++) {
    //         this._grid[y] = [];
    //         for (let x = 0; x < this.BOARD_SIZE; x++) {
    //             const dessert = instantiate(this.dessertPrefab);
    //             dessert.parent = this.boardNode;
    //             dessert.setPosition(
    //                 x * cellSize - (this.BOARD_SIZE * cellSize) / 2,
    //                 y * cellSize - (this.BOARD_SIZE * cellSize) / 2,
    //                 0
    //             );
    //             this._grid[y][x] = dessert;
    //         }
    //     }
    // }

    // BoardManager.ts
initBoard() {
    const offsetX = -(this.BOARD_SIZE * this.CELL_SIZE) / 2;
    const offsetY = -(this.BOARD_SIZE * this.CELL_SIZE) / 2;

    for (let y = 0; y < this.BOARD_SIZE; y++) {
        this._grid[y] = [];
        for (let x = 0; x < this.BOARD_SIZE; x++) {
            const dessert = instantiate(this.dessertPrefab);
            dessert.parent = this.boardNode;
            dessert.setPosition(
                offsetX + x * this.CELL_SIZE, 
                offsetY + y * this.CELL_SIZE, 
                0
            );
            this._grid[y][x] = dessert;
        }
    }
}

    // 获取棋盘网格
    get grid(): Node[][] {
        return this._grid;
    }

    // 获取甜点节点
    getDessertNode(x: number, y: number): Node | null {
        if (x >= 0 && x < this.BOARD_SIZE && y >= 0 && y < this.BOARD_SIZE) {
            return this._grid[y][x];
        }
        return null;
    }
}