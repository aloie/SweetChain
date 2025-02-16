import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('EventSystem')
export class EventSystem extends Component {
    private static _instance: EventSystem = null;
    private _eventMap: Map<string, { callback: Function, target?: any }[]> = new Map();

    static get instance(): EventSystem {
        if (!this._instance) {
            this._instance = new EventSystem();
        }
        return this._instance;
    }

    /**
     * 注册事件监听
     * @param event 事件名称
     * @param callback 回调函数
     * @param target 绑定上下文对象（可选）
     */
    on(event: string, callback: Function, target?: any) {
        if (!this._eventMap.has(event)) {
            this._eventMap.set(event, []);
        }
        this._eventMap.get(event).push({ callback, target });
    }

    /**
     * 取消事件监听
     * @param event 事件名称
     * @param callback 回调函数
     * @param target 绑定上下文对象（可选）
     */
    off(event: string, callback: Function, target?: any) {
        if (this._eventMap.has(event)) {
            const listeners = this._eventMap.get(event);
            const index = listeners.findIndex(
                listener => listener.callback === callback && listener.target === target
            );
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    /**
     * 触发事件
     * @param event 事件名称
     * @param args 事件参数
     */
    emit(event: string, ...args: any[]) {
        if (this._eventMap.has(event)) {
            const listeners = this._eventMap.get(event);
            listeners.forEach(listener => {
                if (listener.target) {
                    listener.callback.call(listener.target, ...args); // 绑定上下文
                } else {
                    listener.callback(...args); // 无上下文
                }
            });
        }
    }
}