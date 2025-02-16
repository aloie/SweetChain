import { _decorator, Color, Component, Graphics, Node, Rect, UITransform, Vec2, Vec3 } from 'cc';
import { GlobalEvent } from '../../Core/System/GlobalEvent';
const { ccclass, property } = _decorator;

@ccclass('DragSystem')
export class DragSystem extends Component {
    @property(Node)
    public targetNode: Node = null; // 必须绑定预制体根节点

    private _isDragging: boolean = false;
    private _startPos: Vec3 = Vec3.ZERO;

    onLoad() {
        GlobalEvent.on('TOUCH_START', this.onTouchStart, this);
        GlobalEvent.on('TOUCH_MOVE', this.onTouchMove, this);
        GlobalEvent.on('TOUCH_END', this.onTouchEnd, this);
    
        // 调试绘制碰撞框（仅添加一次）
        // if (DEBUG_MODE) { // 自定义调试开关
        //     const graphics = this.node.addComponent(Graphics);
        //     const uiTransform = this.targetNode.getComponent(UITransform);
        //     graphics.rect(-uiTransform.width / 2, -uiTransform.height / 2, uiTransform.width, uiTransform.height);
        //     graphics.strokeColor = Color.RED;
        //     graphics.stroke();
        // }
    }
    
    private onTouchStart(pos: Vec2) {
        const isTouchValid = this.isTouchOnTarget(pos);
        if (isTouchValid) {
            console.log('[DragSystem] 点击检测', isTouchValid, '目标节点:', this.targetNode?.name);
            this._isDragging = true;
            this._startPos = this.targetNode.position;
        }
    }

    onDestroy() {
        GlobalEvent.off('TOUCH_START', this.onTouchStart, this);
        GlobalEvent.off('TOUCH_MOVE', this.onTouchMove, this);
        GlobalEvent.off('TOUCH_END', this.onTouchEnd, this);
    }

// DragSystem.ts
private onTouchMove(pos: Vec2) {
    if (!this._isDragging) return;

    // 将屏幕坐标转换为棋盘节点的本地坐标
    const boardNode = this.targetNode.parent;
    const screenPos = new Vec3(pos.x, pos.y, 0);
    const localPos = boardNode.getComponent(UITransform).convertToNodeSpaceAR(screenPos);

    // 更新甜点位置
    this.targetNode.position = localPos;
}

    private onTouchEnd(pos: Vec2) {
        if (this._isDragging) {
            this._isDragging = false;
            GlobalEvent.emit('DRAG_END', this.targetNode);
        }
    }

// DragSystem.ts
private isTouchOnTarget(pos: Vec2): boolean {
    const screenPos = new Vec3(pos.x, pos.y, 0);
    const localPos = this.targetNode.getComponent(UITransform).convertToNodeSpaceAR(screenPos);

    // 计算实际渲染尺寸（考虑缩放）
    const uiTransform = this.targetNode.getComponent(UITransform);
    const width = uiTransform.width * this.targetNode.scale.x;
    const height = uiTransform.height * this.targetNode.scale.y;
    const targetRect = new Rect(-width / 2, -height / 2, width, height);

    return targetRect.contains(new Vec2(localPos.x, localPos.y));
}

}