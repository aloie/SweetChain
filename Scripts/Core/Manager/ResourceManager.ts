import { _decorator, Component, AssetManager, resources, Asset } from 'cc';
const { ccclass } = _decorator;

@ccclass('ResourceManager') // 必须添加 @ccclass 装饰器
export class ResourceManager extends Component { // 必须继承 Component
    private static _instance: ResourceManager = null;

    static get instance(): ResourceManager {
        if (!this._instance) {
            this._instance = new ResourceManager();
        }
        return this._instance;
    }

    loadRes(path: string, type: typeof Asset, callback: (err: Error, res: Asset) => void) {
        resources.load(path, type, callback);
    }
}