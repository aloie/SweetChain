import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

/**
 * 场景管理单例
 * - 封装场景加载逻辑
 * - 处理场景切换过渡动画
 */
@ccclass('SceneManager') // 必须添加 @ccclass 装饰器
export class SceneManager extends Component { // 必须继承 Component
    private static _instance: SceneManager = null;

    static get instance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }

    /**
     * 安全加载场景
     * @param sceneName 场景资源名称（需在构建配置中包含）
     * @param onProgress 加载进度回调（可选）
     */
    loadScene(sceneName: string, onProgress?: (progress: number) => void) {
        director.preloadScene(sceneName, (completedCount, totalCount) => {
            const progress = completedCount / totalCount;
            onProgress?.(progress);
        }, () => {
            director.loadScene(sceneName);
        });
    }
}