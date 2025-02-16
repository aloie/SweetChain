/**
 * 游戏核心状态机定义
 * - 确保状态切换逻辑与事件系统解耦
 */
export enum GameState {
    INIT,       // 初始化（未进行任何操作）
    LOADING,    // 资源加载中（显示进度条）
    MAIN_MENU,  // 主菜单界面（包含开始/设置按钮）
    IN_GAME,    // 游戏进行中（核心玩法阶段）
    SETTLEMENT  // 结算界面（显示分数/重玩按钮）
}