# AircaftBattle
练习：使用layabox做飞机大战

1.UI管理器  UI管理器使用MVC架构，外部调用通过UICenter进行open或者close
当前的UI控制器并没有事件派发的机制

2.Master存储所有玩家数据，存在localStorage中

3.资源命名规则：
    $对象标识符_$种类ID_$类型ID_$状态ID
    对应到gameobject所加载资源对象命名为：
        （1）$对象标识符 = gameobejct
        （2）$种类ID 为全局枚举中 GAMEOBJ_TYPE中的值 每张图集根据id对应的分类
        （3）$类型ID 例如各个类型的战机
        （4）$状态ID 例如为一种战机不同形态
4.BulletCreatorManager控制子弹实例化，并控制子弹实例化间隙

5.游戏物体工厂 GameObjectFactory使用二级缓存，第一次释放直接放置在一级缓存，从缓存中取先取二级缓存中游戏物体，没有再从一级缓存中取