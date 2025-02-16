import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DessertController')
export class DessertController extends Component {
    @property(Animation)
    public animation: Animation = null; // 绑定动画组件

    // 甜点类型（0=布丁, 1=马卡龙, 2=巧克力）
    type: number = 0;

    // 初始化甜点
    init(type: number) {
        this.type = type;
        // 根据类型设置甜点图片
        // 这里需要绑定甜点图片资源
    }

    // 播放指定动画
    playAnimation(animName: string) {
        this.animation.play(animName);
    }

    // test code, 示例：被消除时触发
    onEliminate() {
        this.playAnimation('PuddingCry');
        this.scheduleOnce(() => this.node.destroy(), 0.8); // 动画播完后销毁
    }
}