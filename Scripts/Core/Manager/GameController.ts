import { _decorator, Component, director } from 'cc';
import { GameState } from '../System/GameState';
import { GlobalEvent } from '../System/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private static _instance: GameController = null;
    private _currentState: GameState = GameState.INIT;

    static get instance(): GameController {
        if (!this._instance) {
            this._instance = new GameController();
        }
        return this._instance;
    }

    // 初始化游戏
    initialize() {
        this.switchState(GameState.LOADING);
    }

    // 状态切换
    switchState(newState: GameState) {
        this._currentState = newState;
        GlobalEvent.emit(GlobalEvent.STATE_CHANGE, newState);
        
        switch(newState) {
            case GameState.LOADING:
                this.loadResources();
                break;
            case GameState.MAIN_MENU:
                director.loadScene('MainMenu');
                break;
        }
    }

    // 资源加载
    private loadResources() {
        // 模拟加载进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.1;
            GlobalEvent.emit(GlobalEvent.LOAD_PROGRESS, progress);
            if (progress >= 1) {
                clearInterval(interval);
                this.switchState(GameState.MAIN_MENU);
            }
        }, 200);
    }
}