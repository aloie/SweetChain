import { _decorator, Component } from 'cc';
import { GlobalEvent } from '../../Core/System/GlobalEvent';
import { GameState } from '../../Core/System/GameState';
const { ccclass } = _decorator;

@ccclass('StateMachineTest')
export class StateMachineTest extends Component {
    onLoad() {
        // 监听状态变更事件
        GlobalEvent.on(GlobalEvent.STATE_CHANGE, this.onStateChange, this);
        
        // 模拟游戏启动流程
        this.scheduleOnce(() => {
            GlobalEvent.emit(GlobalEvent.STATE_CHANGE, GameState.LOADING);
        }, 1);
    }

    private onStateChange(newState: GameState) {
        console.log(`[StateMachine] 状态变更 -> ${GameState[newState]}`);
        
        // 模拟加载完成后进入主菜单
        if (newState === GameState.LOADING) {
            this.scheduleOnce(() => {
                GlobalEvent.emit(GlobalEvent.STATE_CHANGE, GameState.MAIN_MENU);
            }, 3);
        }
    }

    onDestroy() {
        GlobalEvent.off(GlobalEvent.STATE_CHANGE, this.onStateChange, this);
    }
}