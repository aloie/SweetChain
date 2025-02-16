import { _decorator, Component, Node, EventTouch, Vec2 } from 'cc';
import { GlobalEvent } from '../System/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {
    private _touchStartPos: Vec2 = Vec2.ZERO; // 触摸起点
    private _touchEndPos: Vec2 = Vec2.ZERO;  // 触摸终点

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch) {
        this._touchStartPos = event.getUILocation();
        console.log('[InputManager] Touch Start:', this._touchStartPos); // 添加日志
        GlobalEvent.emit('TOUCH_START', this._touchStartPos);
    }

    private onTouchMove(event: EventTouch) {
        const currentPos = event.getUILocation();
       // console.log('[InputManager] Touch Move:', currentPos); // 添加日志
        GlobalEvent.emit('TOUCH_MOVE', currentPos);
    }

    private onTouchEnd(event: EventTouch) {
        this._touchEndPos = event.getUILocation();
        console.log('[InputManager] Touch End:', this._touchEndPos); // 添加日志
        GlobalEvent.emit('TOUCH_END', this._touchEndPos);
    }
}