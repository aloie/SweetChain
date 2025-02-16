import { EventSystem } from './EventSystem';

/**
 * 全局事件定义中心
 * - 集中管理所有自定义事件名称
 * - 提供类型安全的事件触发/监听接口
 */
export class GlobalEvent {
    // 状态变更事件（参数：新状态）
    static readonly STATE_CHANGE = 'GAME_STATE_CHANGE';
    // 加载进度事件（参数：0-1的进度值）
    static readonly LOAD_PROGRESS = 'LOAD_PROGRESS';
    // 游戏分数变更（参数：最新分数）
    static readonly SCORE_UPDATE = 'SCORE_UPDATE';

    /**
     * 派发全局事件
     * @param event 事件名称（必须使用本类中定义的常量）
     * @param args 事件参数（建议使用简单数据类型）
     */
    static emit(event: string, ...args: any[]) {
        EventSystem.instance.emit(event, ...args);
    }

    /**
     * 监听全局事件
     * @param event 事件名称
     * @param callback 回调函数（注意及时取消注册）
     * @param target 绑定上下文对象
     */
    static on(event: string, callback: Function, target?: any) {
        EventSystem.instance.on(event, callback, target);
    }

    /**
     * 取消事件监听
     * @param event 事件名称
     * @param callback 注册时的回调引用
     * @param target 注册时的上下文对象
     */
    static off(event: string, callback: Function, target?: any) {
        EventSystem.instance.off(event, callback, target);
    }
}