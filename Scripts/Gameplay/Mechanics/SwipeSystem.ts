import { _decorator, Component, Vec2 } from 'cc';
import { GlobalEvent } from '../../Core/System/GlobalEvent';
const { ccclass } = _decorator;

@ccclass('SwipeSystem')
export class SwipeSystem extends Component {
    private readonly SWIPE_THRESHOLD = 500; // 甩动速度阈值
    private _touchStartPos: Vec2 = Vec2.ZERO;
    private _touchEndPos: Vec2 = Vec2.ZERO;

    onLoad() {
        GlobalEvent.on('TOUCH_START', this.onTouchStart, this);
        GlobalEvent.on('TOUCH_END', this.onTouchEnd, this);
    }

    onDestroy() {
        GlobalEvent.off('TOUCH_START', this.onTouchStart, this);
        GlobalEvent.off('TOUCH_END', this.onTouchEnd, this);
    }

    private onTouchStart(pos: Vec2) {
        this._touchStartPos = pos;
    }

    private onTouchEnd(pos: Vec2) {
        this._touchEndPos = pos;
        const delta = this._touchEndPos.subtract(this._touchStartPos);
        const speed = delta.length() / 1000; // 计算速度（像素/秒）

        if (speed > this.SWIPE_THRESHOLD) {
            GlobalEvent.emit('SWIPE_DETECTED', delta.normalize());
        }
    }
}